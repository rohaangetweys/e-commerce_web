'use client'
import { useState, useEffect, useRef } from 'react';
import { FaSearch } from 'react-icons/fa';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { useApp } from '@/contexts/AppContext';
import { Product, productsService } from '@/utils/supabase/products';
import { useRouter } from 'next/navigation';

interface SearchProductItemProps {
    product: Product;
    onClick: (product: Product) => void;
}

function SearchProductItem({ product, onClick }: SearchProductItemProps) {
    return (
        <div
            className="flex items-center gap-3 p-2 hover:bg-gray-50 cursor-pointer transition-colors"
            onClick={() => onClick(product)}
        >
            <img
                src={product.main_img_url || '/placeholder-image.jpg'}
                alt={product.name}
                className="w-10 h-10 object-cover rounded"
                onError={(e) => {
                    (e.target as HTMLImageElement).src = '/placeholder-image.jpg';
                }}
            />
            <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                    {product.name}
                </p>
                <p className="text-sm text-gray-500 truncate">
                    ${product.price}
                    {product.compare_price && (
                        <span className="ml-2 text-xs text-gray-400 line-through">
                            ${product.compare_price}
                        </span>
                    )}
                </p>
            </div>
        </div>
    );
}

interface ProductSearchDropdownProps {
    products: Product[];
    isVisible: boolean;
    onProductSelect: (product: Product) => void;
    searchQuery: string;
    isLoading?: boolean;
}

function ProductSearchDropdown({
    products,
    isVisible,
    onProductSelect,
    searchQuery,
    isLoading = false
}: ProductSearchDropdownProps) {
    if (!isVisible) return null;

    return (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-48 overflow-y-auto">
            {isLoading ? (
                <div className="p-4 text-center text-gray-500 text-sm">
                    Searching...
                </div>
            ) : products.length === 0 ? (
                <div className="p-4 text-center text-gray-500 text-sm">
                    No products found for "{searchQuery}"
                </div>
            ) : (
                <>
                    {products.slice(0, 3).map((product) => (
                        <SearchProductItem
                            key={product.id}
                            product={product}
                            onClick={onProductSelect}
                        />
                    ))}
                    {products.length > 3 && (
                        <div className="p-2 text-center text-xs text-gray-500 border-t">
                            +{products.length - 3} more products
                        </div>
                    )}
                </>
            )}
        </div>
    );
}

export default function SearchSection() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('All Categories');
    const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState<Product[]>([]);
    const [showProductDropdown, setShowProductDropdown] = useState(false);
    const [isSearching, setIsSearching] = useState(false);
    const [allProducts, setAllProducts] = useState<Product[]>([]);

    const router = useRouter();

    const { categories } = useApp();
    const searchTimeoutRef = useRef<NodeJS.Timeout>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const searchInputRef = useRef<HTMLInputElement>(null);

    const allCategories = [
        { name: 'All Categories', id: null },
        ...categories.map(category => ({ name: category.name, id: category.id }))
    ];

    useEffect(() => {
        const loadProducts = async () => {
            try {
                const products = await productsService.getProducts();
                setAllProducts(products);
                console.log('Loaded products:', products.length);
            } catch (error) {
                console.error('Error loading products:', error);
            }
        };

        loadProducts();
    }, []);

    useEffect(() => {
        if (searchQuery.trim().length === 0) {
            setSearchResults([]);
            setShowProductDropdown(false);
            return;
        }

        setIsSearching(true);

        if (searchTimeoutRef.current) {
            clearTimeout(searchTimeoutRef.current);
        }

        searchTimeoutRef.current = setTimeout(() => {
            try {
                console.log('Searching for:', searchQuery, 'in category:', selectedCategory, 'ID:', selectedCategoryId);
                console.log('Total products available:', allProducts.length);

                const filteredProducts = allProducts.filter(product => {
                    const matchesSearch = product.name?.toLowerCase().includes(searchQuery.toLowerCase());

                    const matchesCategory = selectedCategoryId === null ||
                        product.category_id === selectedCategoryId;

                    const isActive = product.is_active !== false;

                    console.log(`Product: ${product.name}, category: ${product.category_id}, matches search: ${matchesSearch}, matches category: ${matchesCategory}, active: ${isActive}`);
                    return matchesSearch && matchesCategory && isActive;
                });

                console.log('Filtered products:', filteredProducts.length);
                setSearchResults(filteredProducts);
                setShowProductDropdown(true);
            } catch (error) {
                console.error('Error searching products:', error);
                setSearchResults([]);
                setShowProductDropdown(true);
            } finally {
                setIsSearching(false);
            }
        }, 300);

        return () => {
            if (searchTimeoutRef.current) {
                clearTimeout(searchTimeoutRef.current);
            }
        };
    }, [searchQuery, selectedCategoryId, allProducts]);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
                setShowProductDropdown(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleCategorySelect = (categoryName: string, categoryId: string | null) => {
        setSelectedCategory(categoryName);
        setSelectedCategoryId(categoryId);
        setIsDropdownOpen(false);

        if (searchQuery.trim().length > 0) {
            setShowProductDropdown(true);
        }
    };

    const handleProductSelect = (product: Product) => {
        setShowProductDropdown(false);
        setSearchQuery('');
        router.push(`/shop/${product.slug}`)
    };

    const handleSearchInputFocus = () => {
        if (searchQuery.trim().length > 0 && allProducts.length > 0) {
            setShowProductDropdown(true);
        }
    };

    const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchQuery(value);

        if (value.trim().length > 0) {
            setShowProductDropdown(true);
        } else {
            setShowProductDropdown(false);
        }
    };

    return (
        <div className="w-full flex flex-col md:flex-row items-center px-4 md:px-8 h-auto md:h-[75px] gap-3 md:gap-0 bg-[#1ABA1A] rounded-xl justify-between py-4 md:py-0 relative">

            <div
                ref={dropdownRef}
                className="bg-white h-11 flex items-center rounded-full w-full md:w-1/3 px-4 relative"
            >
                <div className="relative shrink-0">
                    <div
                        className="w-40 flex items-center cursor-pointer truncate pr-4 border-r border-gray-300 h-full"
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    >
                        <span className="truncate text-sm">{selectedCategory}</span>
                        <MdKeyboardArrowDown
                            className={`ml-auto transition-transform shrink-0 ${isDropdownOpen ? 'rotate-180' : ''}`}
                        />
                    </div>

                    {isDropdownOpen && (
                        <ul className="absolute top-12 left-0 w-60 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
                            {allCategories.map((category) => (
                                <li
                                    key={category.name}
                                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer transition-colors text-sm"
                                    onClick={() => handleCategorySelect(category.name, category.id)}
                                >
                                    {category.name}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                <div className="flex-1 relative">
                    <div className="relative h-full">
                        <input
                            ref={searchInputRef}
                            type="text"
                            className="h-full w-full px-4 outline-none bg-transparent text-sm placeholder-gray-500"
                            placeholder="Search any product..."
                            value={searchQuery}
                            onChange={handleSearchInputChange}
                            onFocus={handleSearchInputFocus}
                        />

                        <ProductSearchDropdown
                            products={searchResults}
                            isVisible={showProductDropdown}
                            onProductSelect={handleProductSelect}
                            searchQuery={searchQuery}
                            isLoading={isSearching}
                        />
                    </div>
                </div>

                <div className="flex-shrink-0 pl-2 border-l border-gray-300 h-6 flex items-center">
                    <FaSearch className="text-gray-500 text-lg" />
                </div>
            </div>

            <p className="text-white text-sm max-md:hidden">FREE SHIPPING OVER $199</p>
            <p className="text-white text-sm max-md:hidden">30 DAYS MONEY BACK</p>
            <p className="text-white text-sm max-md:hidden">100% SECURE PAYMENT</p>
        </div>
    );
}