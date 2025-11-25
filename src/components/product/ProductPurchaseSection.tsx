'use client'
import { useState } from 'react';
import Button from "@/components/common/Button";
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

interface ProductPurchaseSectionProps {
    product: any;
    selectedVariant1: string;
    selectedVariant2: string;
    onVariant1Change: (variant: string) => void;
    onVariant2Change: (variant: string) => void;
}

export default function ProductPurchaseSection({ 
    product, 
    selectedVariant1, 
    selectedVariant2, 
    onVariant1Change, 
    onVariant2Change 
}: ProductPurchaseSectionProps) {
    const [qty, setQty] = useState(1);
    const router = useRouter();

    const getCurrentPrice = () => {
        if (selectedVariant1 && product.variant_prices?.[selectedVariant1]) {
            return product.variant_prices[selectedVariant1];
        }
        return product.price;
    };

    const currentPrice = getCurrentPrice();
    const total = currentPrice * qty;

    const addToCart = () => {
        const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
        
        const variantString = `${selectedVariant1}${selectedVariant2 ? `-${selectedVariant2}` : ''}`;
        const cartItemId = `${product.id}-${variantString}`;
        
        const existingItemIndex = existingCart.findIndex((item: any) => item.id === cartItemId);
        
        if (existingItemIndex > -1) {
            existingCart[existingItemIndex].quantity += qty;
            toast.success(`Updated quantity in cart!`);
        } else {
            const cartItem = {
                id: cartItemId,
                productId: product.id,
                name: product.name,
                price: currentPrice,
                main_img_url: product.main_img_url,
                slug: product.slug,
                quantity: qty,
                sku: product.sku,
                variant1: selectedVariant1,
                variant2: selectedVariant2,
                variant1Name: product.variant_type1_name,
                variant2Name: product.variant_type2_name
            };
            existingCart.push(cartItem);
            toast.success(`Added to cart!`);
        }
        
        localStorage.setItem('cart', JSON.stringify(existingCart));
    };

    const goToCart = () => {
        router.push('/cart');
    };

    return (
        <div className="lg:col-span-1">
            <div className="bg-gray-50 rounded-2xl p-6 w-full border border-black/10">
                <div className="text-[#999999] text-sm mb-2 font-semibold">TOTAL PRICE:</div>
                <div className="text-3xl font-bold text-[#1ABA1A]">${total.toFixed(2)}</div>

                {product.variant_type1_name && product.variant_type1_options?.length > 0 && (
                    <div className="mt-4">
                        <div className="font-semibold mb-2 text-sm text-gray-800">
                            {product.variant_type1_name}:
                        </div>
                        <div className="flex gap-2 flex-wrap">
                            {product.variant_type1_options.map((option: string) => (
                                <button
                                    key={option}
                                    onClick={() => onVariant1Change(option)}
                                    className={`px-3 py-1 text-xs border rounded-lg transition ${
                                        selectedVariant1 === option
                                            ? "border-[#1ABA1A] bg-green-50 text-[#1ABA1A] font-semibold"
                                            : "border-gray-300 hover:border-gray-400"
                                    }`}
                                >
                                    {option}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {product.variant_type2_name && product.variant_type2_options?.length > 0 && (
                    <div className="mt-3">
                        <div className="font-semibold mb-2 text-sm text-gray-800">
                            {product.variant_type2_name}:
                        </div>
                        <div className="flex gap-2 flex-wrap">
                            {product.variant_type2_options.map((option: string) => (
                                <button
                                    key={option}
                                    onClick={() => onVariant2Change(option)}
                                    className={`px-3 py-1 text-xs border rounded-lg transition ${
                                        selectedVariant2 === option
                                            ? "border-[#1ABA1A] bg-green-50 text-[#1ABA1A] font-semibold"
                                            : "border-gray-300 hover:border-gray-400"
                                    }`}
                                >
                                    {option}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                <div className="flex items-center gap-5 mt-6">
                    <button
                        onClick={() => qty > 1 && setQty(qty - 1)}
                        className="w-10 h-10 rounded-full bg-white border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition font-semibold"
                        disabled={qty <= 1}
                    >
                        -
                    </button>
                    <div className="text-lg font-semibold w-8 text-center">{qty}</div>
                    <button
                        onClick={() => setQty(qty + 1)}
                        className="w-10 h-10 rounded-full bg-white border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition font-semibold"
                    >
                        +
                    </button>
                </div>

                <div className="space-y-3 mt-6">
                    <Button 
                        variant="success" 
                        size="lg" 
                        className="w-full py-3 text-base font-semibold"
                        onClick={addToCart}
                    >
                        ADD TO CART
                    </Button>

                    <Button 
                        variant="outline" 
                        size="lg" 
                        className="w-full py-3 text-base font-semibold border-yellow-400 bg-yellow-400 hover:bg-yellow-500 text-black"
                        onClick={goToCart}
                    >
                        VIEW CART
                    </Button>
                </div>

                <div className="text-xs text-[#999999] mt-4 text-center font-semibold">Guaranteed Safe Checkout</div>

                <div className="flex justify-center gap-3 mt-3">
                    {[1, 2, 3, 4].map((item) => (
                        <div key={item} className="w-10 h-6 bg-gray-200 rounded flex items-center justify-center">
                            <span className="text-xs font-semibold text-gray-500">Pay</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="bg-gray-50 rounded-2xl p-6 mt-6 border border-black/10 text-center">
                <div className="font-semibold text-gray-800 mb-2">Quick Order 24/7</div>
                <div className="text-xl font-bold text-[#1ABA1A]">(025) 3886 25 16</div>
                <div className="text-sm text-[#999999] mt-3">
                    Ships from <span className="font-semibold text-gray-800">United States</span>
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
                </div>
            </div>
        </div>
    );
}