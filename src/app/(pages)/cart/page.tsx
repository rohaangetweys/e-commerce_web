import SearchSection from '@/components/common/SearchSection'
import Banner from '@/components/common/Banner'
import Button from '@/components/common/Button'
import Image from 'next/image'
import Link from 'next/link'
import { IoIosArrowForward } from 'react-icons/io'
import { RiDeleteBin6Line } from 'react-icons/ri'

const cartItems = [
    {
        id: 1,
        image: "/category1.png",
        title: "SROK Smart Phone 128GB, Oled Retina",
        price: 579.00,
        originalPrice: 778.00,
        color: "Midnight Blue",
        memory: "128GB",
        quantity: 1,
        inStock: true
    },
    {
        id: 2,
        image: "/category2.png",
        title: "Wireless Bluetooth Headphones",
        price: 79.99,
        color: "Black",
        quantity: 2,
        inStock: true
    },
    {
        id: 3,
        image: "/category3.png",
        title: "Smart Fitness Watch",
        price: 129.99,
        color: "Silver",
        quantity: 1,
        inStock: true
    }
]

export default function CartPage() {
    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    const shipping = subtotal > 199 ? 0 : 15.00
    const tax = subtotal * 0.08
    const total = subtotal + shipping + tax

    return (
        <div className="h-full w-full bg-transparent text-black">
            <SearchSection />
            <Banner />

            <div className="bg-white rounded-2xl w-full mt-6 px-8 py-8">
                <h1 className="text-2xl font-bold mb-6">SHOPPING CART</h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Cart Items */}
                    <div className="lg:col-span-2">
                        {/* Header */}
                        <div className="hidden md:grid grid-cols-12 gap-4 py-3 border-b border-gray-200 text-sm font-semibold text-gray-600 mb-4">
                            <div className="col-span-5">PRODUCT</div>
                            <div className="col-span-2 text-center">PRICE</div>
                            <div className="col-span-3 text-center">QUANTITY</div>
                            <div className="col-span-2 text-center">TOTAL</div>
                        </div>

                        {/* Cart Items List */}
                        <div className="space-y-4">
                            {cartItems.map((item) => (
                                <div key={item.id} className="grid grid-cols-12 gap-4 py-4 border-b border-gray-100 items-center">
                                    {/* Product Info */}
                                    <div className="col-span-12 md:col-span-5 flex gap-4">
                                        <div className="w-20 h-20 bg-gray-50 rounded-lg flex items-center justify-center border">
                                            <Image
                                                src={item.image}
                                                alt={item.title}
                                                width={60}
                                                height={60}
                                                className="object-contain"
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-semibold text-gray-800 text-sm leading-tight mb-1">
                                                {item.title}
                                            </h3>
                                            <div className="text-xs text-gray-500 space-y-1">
                                                {item.color && <div>Color: {item.color}</div>}
                                                {item.memory && <div>Memory: {item.memory}</div>}
                                            </div>
                                            <div className="flex items-center gap-2 mt-2">
                                                {item.inStock ? (
                                                    <div className="flex items-center gap-1 text-xs text-[#1ABA1A]">
                                                        <div className="w-2 h-2 bg-[#1ABA1A] rounded-full"></div>
                                                        In Stock
                                                    </div>
                                                ) : (
                                                    <div className="text-xs text-red-500">Out of Stock</div>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Price */}
                                    <div className="col-span-4 md:col-span-2 flex md:justify-center">
                                        <div className="text-sm font-semibold">
                                            ${item.price.toFixed(2)}
                                            {item.originalPrice && (
                                                <div className="text-xs text-gray-500 line-through">
                                                    ${item.originalPrice.toFixed(2)}
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Quantity */}
                                    <div className="col-span-4 md:col-span-3 flex md:justify-center">
                                        <div className="flex items-center gap-2">
                                            <button className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition text-sm font-semibold">
                                                -
                                            </button>
                                            <span className="w-8 text-center text-sm font-semibold">{item.quantity}</span>
                                            <button className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition text-sm font-semibold">
                                                +
                                            </button>
                                        </div>
                                    </div>

                                    {/* Total & Actions */}
                                    <div className="col-span-4 md:col-span-2 flex items-center justify-between md:justify-center">
                                        <div className="text-sm font-bold">
                                            ${(item.price * item.quantity).toFixed(2)}
                                        </div>
                                        <button className="text-gray-400 hover:text-red-500 transition md:ml-4">
                                            <RiDeleteBin6Line size={18} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Continue Shopping */}
                        <div className="mt-6">
                            <Link href="/shop" className="flex items-center gap-2 text-[#1ABA1A] font-semibold text-sm hover:underline">
                                <IoIosArrowForward className="rotate-180" />
                                Continue Shopping
                            </Link>
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-gray-50 rounded-2xl p-6 border border-black/10">
                            <h2 className="text-lg font-bold mb-4">ORDER SUMMARY</h2>

                            <div className="space-y-3 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Subtotal</span>
                                    <span className="font-semibold">${subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Shipping</span>
                                    <span className="font-semibold">
                                        {shipping === 0 ? (
                                            <span className="text-[#1ABA1A]">FREE</span>
                                        ) : (
                                            `$${shipping.toFixed(2)}`
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

                            {/* Free Shipping Progress */}
                            {subtotal < 199 && (
                                <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
                                    <div className="text-xs text-green-800 font-semibold mb-1">
                                        Add ${(199 - subtotal).toFixed(2)} more for FREE shipping!
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div 
                                            className="bg-[#1ABA1A] h-2 rounded-full" 
                                            style={{ width: `${(subtotal / 199) * 100}%` }}
                                        ></div>
                                    </div>
                                </div>
                            )}

                            {/* Checkout Button */}
                            <Button variant="success" size="lg" className="w-full mt-6 py-3 font-semibold">
                                PROCEED TO CHECKOUT
                            </Button>

                            {/* PayPal Button */}
                            <Button variant="outline" className="w-full mt-3 py-3 font-semibold border-yellow-400 bg-yellow-400 hover:bg-yellow-500 text-black">
                                CHECKOUT WITH PAYPAL
                            </Button>

                            {/* Security Badges */}
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

                        {/* Support Section */}
                        <div className="bg-gray-50 rounded-2xl p-6 mt-6 border border-black/10 text-center">
                            <div className="font-semibold text-gray-800 mb-2">Need Help?</div>
                            <div className="text-xl font-bold text-[#1ABA1A]">(025) 3886 25 16</div>
                            <div className="text-sm text-gray-500 mt-2">
                                24/7 Customer Support
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}