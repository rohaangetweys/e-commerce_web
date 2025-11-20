'use client';
import React, { createContext, useContext, useEffect, useReducer } from 'react';
import { Product } from '@/utils/supabase/products';
import { Category } from '@/utils/supabase/categories';

interface CartItem {
    productId: string;
    quantity: number;
    selectedVariants: {
        [key: string]: string;
    };
}

interface AppState {
    products: Product[];
    categories: Category[];
    cart: CartItem[];
    loading: boolean;
    error: string | null;
}

type AppAction =
    | { type: 'SET_LOADING'; payload: boolean }
    | { type: 'SET_ERROR'; payload: string | null }
    | { type: 'SET_PRODUCTS'; payload: Product[] }
    | { type: 'SET_CATEGORIES'; payload: Category[] }
    | { type: 'ADD_TO_CART'; payload: CartItem }
    | { type: 'REMOVE_FROM_CART'; payload: string }
    | { type: 'UPDATE_CART_QUANTITY'; payload: { productId: string; quantity: number } }
    | { type: 'CLEAR_CART' };

interface AppContextType extends AppState {
    addToCart: (item: CartItem) => void;
    removeFromCart: (productId: string) => void;
    updateCartQuantity: (productId: string, quantity: number) => void;
    clearCart: () => void;
    getProductById: (id: string) => Product | undefined;
    getCartTotal: () => number;
    getCartItemCount: () => number;
    refetchProducts: () => Promise<void>;
    refetchCategories: () => Promise<void>;
}

interface AppProviderProps {
    children: React.ReactNode;
    initialProducts: Product[];
    initialCategories: Category[];
}

const initialState: AppState = {
    products: [],
    categories: [],
    cart: [],
    loading: false,
    error: null,
};

function appReducer(state: AppState, action: AppAction): AppState {
    switch (action.type) {
        case 'SET_LOADING':
            return { ...state, loading: action.payload };
        case 'SET_ERROR':
            return { ...state, error: action.payload };
        case 'SET_PRODUCTS':
            return { ...state, products: action.payload };
        case 'SET_CATEGORIES':
            return { ...state, categories: action.payload };
        case 'ADD_TO_CART':
            const existingItem = state.cart.find(
                item => item.productId === action.payload.productId &&
                    JSON.stringify(item.selectedVariants) === JSON.stringify(action.payload.selectedVariants)
            );

            if (existingItem) {
                return {
                    ...state,
                    cart: state.cart.map(item =>
                        item.productId === action.payload.productId &&
                            JSON.stringify(item.selectedVariants) === JSON.stringify(action.payload.selectedVariants)
                            ? { ...item, quantity: item.quantity + action.payload.quantity }
                            : item
                    ),
                };
            }

            return { ...state, cart: [...state.cart, action.payload] };

        case 'REMOVE_FROM_CART':
            return { ...state, cart: state.cart.filter(item => item.productId !== action.payload) };

        case 'UPDATE_CART_QUANTITY':
            return {
                ...state,
                cart: state.cart.map(item =>
                    item.productId === action.payload.productId
                        ? { ...item, quantity: action.payload.quantity }
                        : item
                ),
            };

        case 'CLEAR_CART':
            return { ...state, cart: [] };

        default:
            return state;
    }
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children, initialProducts, initialCategories }: AppProviderProps) {
    const [state, dispatch] = useReducer(appReducer, {
        ...initialState,
        products: initialProducts,
        categories: initialCategories,
    });

    const addToCart = (item: CartItem) => {
        dispatch({ type: 'ADD_TO_CART', payload: item });
    };

    const removeFromCart = (productId: string) => {
        dispatch({ type: 'REMOVE_FROM_CART', payload: productId });
    };

    const updateCartQuantity = (productId: string, quantity: number) => {
        dispatch({ type: 'UPDATE_CART_QUANTITY', payload: { productId, quantity } });
    };

    const clearCart = () => {
        dispatch({ type: 'CLEAR_CART' });
    };

    const getProductById = (id: string) => {
        return state.products.find(product => product.id === id);
    };

    const getCartTotal = () => {
        return state.cart.reduce((total, item) => {
            const product = getProductById(item.productId);
            if (!product) return total;

            let price = product.price;
            Object.values(item.selectedVariants).forEach(variant => {
                const variantPrice = product.variant_prices?.[variant];
                if (variantPrice) {
                    price = variantPrice;
                }
            });

            return total + (price * item.quantity);
        }, 0);
    };

    const getCartItemCount = () => {
        return state.cart.reduce((total, item) => total + item.quantity, 0);
    };

    const refetchProducts = async () => {
        try {
            dispatch({ type: 'SET_LOADING', payload: true });
        } catch (error) {
            dispatch({ type: 'SET_ERROR', payload: 'Failed to fetch products' });
        } finally {
            dispatch({ type: 'SET_LOADING', payload: false });
        }
    };

    const refetchCategories = async () => {
        try {
            dispatch({ type: 'SET_LOADING', payload: true });
        } catch (error) {
            dispatch({ type: 'SET_ERROR', payload: 'Failed to fetch categories' });
        } finally {
            dispatch({ type: 'SET_LOADING', payload: false });
        }
    };

    useEffect(() => {
        const savedCart = localStorage.getItem('ecommerce-cart');
        if (savedCart) {
            try {
                const cart = JSON.parse(savedCart);
                cart.forEach((item: CartItem) => {
                    dispatch({ type: 'ADD_TO_CART', payload: item });
                });
            } catch (error) {
                console.error('Failed to load cart from localStorage');
            }
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('ecommerce-cart', JSON.stringify(state.cart));
    }, [state.cart]);

    const value: AppContextType = {
        ...state,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        getProductById,
        getCartTotal,
        getCartItemCount,
        refetchProducts,
        refetchCategories,
    };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error('useApp must be used within an AppProvider');
    }
    return context;
}