'use client'
import { useState } from 'react';
import Button from "@/components/common/Button";
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

interface ProductPurchaseSectionProps {
    product: any;
}

export default function ProductPurchaseSection({ product }: ProductPurchaseSectionProps) {
    const [qty, setQty] = useState(1);
    const router = useRouter();
    const total = product.price * qty;

    const addToCart = () => {
        const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
        
        const existingItemIndex = existingCart.findIndex((item: any) => item.id === product.id);
        
        if (existingItemIndex > -1) {
            existingCart[existingItemIndex].quantity += qty;
            toast.success(`Updated quantity of ${product.name} in cart!`);
        } else {
            const cartItem = {
                id: product.id,
                name: product.name,
                price: product.price,
                main_img_url: product.main_img_url,
                slug: product.slug,
                quantity: qty,
                sku: product.sku
            };
            existingCart.push(cartItem);
            toast.success(`${product.name} added to cart!`);
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

                <div className="flex items-center gap-5 mt-6">
                    <button
                        onClick={() => qty > 1 && setQty(qty - 1)}
                        className="w-10 h-10 rounded-full bg-white border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition font-semibold"
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