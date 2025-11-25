'use client'
import Image from 'next/image'
import Link from 'next/link'
import Button from '@/components/common/Button'

interface CartItem {
    id: string;
    name: string;
    price: number;
    main_img_url: string;
    slug: string;
    quantity: number;
    sku: string;
}

interface OrderSummaryProps {
    cartItems: CartItem[];
    subtotal: number;
    shippingCost: number;
    tax: number;
    total: number;
    shippingMethod: string;
    isLoading: boolean;
    onPlaceOrder: () => void;
}

export default function OrderSummary({
    cartItems,
    subtotal,
    shippingCost,
    tax,
    total,
    shippingMethod,
    isLoading,
    onPlaceOrder
}: OrderSummaryProps) {
    return (
        <div className="lg:col-span-1">
            <div className="bg-gray-50 rounded-2xl p-6 border border-black/10 sticky top-6">
                <h2 className="text-lg font-bold mb-4">ORDER SUMMARY</h2>

                <div className="space-y-3 mb-4 max-h-80 overflow-y-auto">
                    {cartItems.map((item) => (
                        <div key={item.id} className="flex gap-3 py-2">
                            <div className="w-12 h-12 bg-gray-100 overflow-hidden rounded-lg flex items-center justify-center border relative">
                                <Image
                                    src={item.main_img_url}
                                    alt={item.name}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="flex-1 min-w-0">
                                <Link href={`/shop/${item.slug}`}>
                                    <h3 className="font-semibold text-gray-800 text-sm leading-tight hover:text-[#1ABA1A] transition-colors cursor-pointer">
                                        {item.name}
                                    </h3>
                                </Link>
                                <div className="text-xs text-gray-500">
                                    Qty: {item.quantity} • ${item.price}
                                </div>
                                <div className="text-xs text-gray-500">SKU: {item.sku}</div>
                            </div>
                            <div className="text-sm font-semibold">
                                ${(item.price * item.quantity).toFixed(2)}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="space-y-3 text-sm border-t border-gray-200 pt-4">
                    <div className="flex justify-between">
                        <span className="text-gray-600">Subtotal ({cartItems.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
                        <span className="font-semibold">${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-600">Shipping</span>
                        <span className="font-semibold">
                            {shippingCost === 0 ? (
                                <span className="text-[#1ABA1A]">FREE</span>
                            ) : (
                                `$${shippingCost.toFixed(2)}`
                            )}
                        </span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-600">Tax</span>
                        <span className="font-semibold">${tax.toFixed(2)}</span>
                    </div>
                    <div className="border-t border-gray-200 pt-3 mt-3">
                        <div className="flex justify-between text-base font-bold">
                            <span>Total</span>
                            <span className="text-[#1ABA1A]">${total.toFixed(2)}</span>
                        </div>
                    </div>
                </div>

                {subtotal < 199 && shippingMethod === 'standard' && (
                    <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
                        <div className="text-xs text-green-800 font-semibold mb-1">
                            Add ${(199 - subtotal).toFixed(2)} more for FREE shipping!
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                                className="bg-[#1ABA1A] h-2 rounded-full"
                                style={{ width: `${Math.min((subtotal / 199) * 100, 100)}%` }}
                            ></div>
                        </div>
                    </div>
                )}

                <Button
                    variant="success"
                    size="lg"
                    className="w-full mt-6 py-3 font-semibold"
                    onClick={onPlaceOrder}
                    disabled={isLoading}
                >
                    {isLoading ? 'PLACING ORDER...' : 'PLACE ORDER'}
                </Button>

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
        </div>
    )
}