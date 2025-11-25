'use client'
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Banner from "@/components/common/Banner";
import SearchSection from "@/components/common/SearchSection";
import Button from "@/components/common/Button";
import { FaShoppingCart, FaTrash, FaPlus, FaMinus } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

interface CartItem {
    id: string;
    name: string;
    price: number;
    main_img_url: string;
    slug: string;
    quantity: number;
    sku: string;
}

interface CartContentProps {
    user: any;
}

export default function CartContent({ user }: CartContentProps) {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [pageState, setPageState] = useState<'loading' | 'ready'>('loading');
    const router = useRouter();

    const loadCartData = () => {
        const cart = JSON.parse(localStorage.getItem('cart') || '[]');
        setCartItems(cart);
        return cart;
    };

    const saveCartData = (items: CartItem[]) => {
        localStorage.setItem('cart', JSON.stringify(items));
    };

    useEffect(() => {
        loadCartData();
        setPageState('ready');
    }, []);

    const updateQuantity = (id: string, newQuantity: number) => {
        if (newQuantity < 1) return;

        const updatedCart = cartItems.map(item =>
            item.id === id ? { ...item, quantity: newQuantity } : item
        );
        setCartItems(updatedCart);
        saveCartData(updatedCart);

        const item = cartItems.find(item => item.id === id);
        if (item) {
            toast.success(`Updated ${item.name} quantity to ${newQuantity}`);
        }
    };

    const removeItem = (id: string) => {
        const itemToRemove = cartItems.find(item => item.id === id);
        const updatedCart = cartItems.filter(item => item.id !== id);
        setCartItems(updatedCart);
        saveCartData(updatedCart);

        if (itemToRemove) {
            toast.error(`Removed ${itemToRemove.name} from cart`);
        }
    };

    const clearCart = () => {
        if (cartItems.length === 0) return;

        setCartItems([]);
        saveCartData([]);
        toast.error('Cart cleared');
    };

    const getTotalPrice = () => {
        return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    const getTotalItems = () => {
        return cartItems.reduce((total, item) => total + item.quantity, 0);
    };

    const goToCheckout = () => {
        if (cartItems.length === 0) {
            toast.error('Your cart is empty');
            return;
        }

        router.push('/checkout');
    };

    const continueShopping = () => {
        router.push('/shop');
    };

    if (pageState === 'loading') {
        return (
            <div className="h-full w-full bg-transparent text-black">
                <SearchSection />
                <Banner hasProduct={false} />
                <div className="bg-white rounded-2xl w-full mt-6 px-8 py-8 flex justify-center items-center min-h-[400px]">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1ABA1A] mx-auto mb-4"></div>
                        <div className="text-lg">Loading cart...</div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="h-full w-full bg-transparent text-black">
            <SearchSection />
            <Banner hasProduct={false} />

            <div className="bg-white rounded-2xl w-full mt-6 px-8 py-8">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-2xl font-semibold">Shopping Cart</h1>
                    {cartItems.length > 0 && (
                        <Button
                            variant="outline"
                            onClick={clearCart}
                            className="border-red-500 text-red-500 hover:bg-red-50 flex items-center gap-2"
                        >
                            <FaTrash className="text-sm" />
                            Clear Cart
                        </Button>
                    )}
                </div>

                {cartItems.length === 0 ? (
                    <div className="text-center py-12">
                        <div className="text-gray-400 text-6xl mb-4 flex justify-center">
                            <FaShoppingCart />
                        </div>
                        <h2 className="text-xl font-semibold text-gray-600 mb-2">Your cart is empty</h2>
                        <p className="text-gray-500 mb-6">Add some products to your cart to see them here.</p>
                        <div className="flex gap-4 justify-center">
                            <Button
                                variant="outline"
                                onClick={continueShopping}
                            >
                                Continue Shopping
                            </Button>
                            <Button routeTo='/shop' variant="success">Browse Products</Button>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2">
                            <div className="space-y-4">
                                {cartItems.map((item) => (
                                    <div key={item.id} className="flex items-center gap-4 p-4 border border-gray-200 rounded-2xl">
                                        <div className="relative w-20 h-20 bg-gray-50 rounded-xl flex items-center justify-center">
                                            <Image
                                                src={item.main_img_url}
                                                alt={item.name}
                                                width={60}
                                                height={60}
                                                className="object-contain"
                                            />
                                        </div>

                                        <div className="flex-1">
                                            <Link href={`/product/${item.slug}`}>
                                                <h3 className="font-semibold text-lg hover:text-[#1ABA1A] transition cursor-pointer">
                                                    {item.name}
                                                </h3>
                                            </Link>
                                            <p className="text-gray-600 text-sm">SKU: {item.sku}</p>
                                            <p className="text-[#1ABA1A] font-bold text-lg">${item.price}</p>
                                        </div>

                                        <div className="flex items-center gap-3">
                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                    className="w-8 h-8 rounded-full bg-white border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition font-semibold"
                                                >
                                                    <FaMinus className="text-xs" />
                                                </button>
                                                <span className="w-8 text-center font-semibold">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                    className="w-8 h-8 rounded-full bg-white border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition font-semibold"
                                                >
                                                    <FaPlus className="text-xs" />
                                                </button>
                                            </div>

                                            <button
                                                onClick={() => removeItem(item.id)}
                                                className="text-red-500 hover:text-red-700 transition ml-4 p-2 rounded-full hover:bg-red-50"
                                                title="Remove item"
                                            >
                                                <FaTrash />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-6">
                                <Button
                                    variant="outline"
                                    onClick={continueShopping}
                                    className="w-full"
                                >
                                    Continue Shopping
                                </Button>
                            </div>
                        </div>

                        <div className="lg:col-span-1">
                            <div className="bg-gray-50 rounded-2xl p-6 border border-black/10">
                                <h3 className="text-xl font-semibold mb-4">Order Summary</h3>

                                <div className="space-y-3 mb-6">
                                    <div className="flex justify-between">
                                        <span>Items ({getTotalItems()}):</span>
                                        <span>${getTotalPrice().toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Shipping:</span>
                                        <span className="text-[#1ABA1A]">
                                            {getTotalPrice() > 199 ? 'FREE' : '$15.00'}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Estimated Tax:</span>
                                        <span>${(getTotalPrice() * 0.08).toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-lg font-semibold border-t pt-3">
                                        <span>Total:</span>
                                        <span className="text-[#1ABA1A]">
                                            ${(getTotalPrice() > 199 ?
                                                getTotalPrice() + (getTotalPrice() * 0.08) :
                                                getTotalPrice() + 15 + (getTotalPrice() * 0.08)
                                            ).toFixed(2)}
                                        </span>
                                    </div>
                                </div>

                                {getTotalPrice() < 199 && (
                                    <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
                                        <div className="text-xs text-green-800 font-semibold mb-1">
                                            Add ${(199 - getTotalPrice()).toFixed(2)} more for FREE shipping!
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                            <div
                                                className="bg-[#1ABA1A] h-2 rounded-full"
                                                style={{ width: `${Math.min((getTotalPrice() / 199) * 100, 100)}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                )}

                                <Button
                                    variant="success"
                                    size="lg"
                                    className="w-full py-3 mb-3"
                                    onClick={goToCheckout}
                                >
                                    PROCEED TO CHECKOUT
                                </Button>

                                <div className="text-center">
                                    <p className="text-sm text-gray-600 mb-2">
                                        <span className="text-green-600 font-semibold">
                                            ✓ Ordering as: {user.email}
                                        </span>
                                    </p>
                                </div>

                                <div className="mt-6 text-center">
                                    <div className="text-xs text-gray-500 font-semibold mb-3">
                                        Guaranteed Safe Checkout
                                    </div>
                                    <div className="flex justify-center gap-2">
                                        {[1, 2, 3, 4].map((item) => (
                                            <div key={item} className="w-10 h-6 bg-gray-200 rounded flex items-center justify-center">
                                                <span className="text-xs font-semibold text-gray-500">Pay</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="bg-gray-50 rounded-2xl p-6 mt-6 border border-black/10 text-center">
                                <div className="font-semibold text-gray-800 mb-2">Need Help?</div>
                                <div className="text-xl font-bold text-[#1ABA1A]">(025) 3886 25 16</div>
                                <div className="text-sm text-gray-500 mt-2">
                                    24/7 Customer Support
                                </div>
                            </div>

                            <div className="bg-gray-50 rounded-2xl p-6 mt-6 border border-black/10">
                                <div className="space-y-3 text-sm">
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 bg-[#1ABA1A] rounded-full"></div>
                                        <span className="font-semibold">30 Days Money Back Guarantee</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 bg-[#1ABA1A] rounded-full"></div>
                                        <span className="font-semibold">Free Shipping Over $199</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 bg-[#1ABA1A] rounded-full"></div>
                                        <span className="font-semibold">Secure Payment</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 bg-[#1ABA1A] rounded-full"></div>
                                        <span className="font-semibold">24/7 Customer Support</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}