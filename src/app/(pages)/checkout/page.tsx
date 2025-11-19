'use client'
import SearchSection from '@/components/common/SearchSection'
import Banner from '@/components/common/Banner'
import Button from '@/components/common/Button'
import Image from 'next/image'
import Link from 'next/link'
import { IoIosArrowForward } from 'react-icons/io'
import { useState } from 'react'
import Input from '@/components/common/Input'

const cartItems = [
    {
        id: 1,
        image: "/category1.png",
        title: "SROK Smart Phone 128GB, Oled Retina",
        price: 579.00,
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
    }
]

export default function CheckoutPage() {
    const [paymentMethod, setPaymentMethod] = useState('credit-card')
    const [saveInfo, setSaveInfo] = useState(true)

    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    const shipping = subtotal > 199 ? 0 : 15.00
    const tax = subtotal * 0.08
    const total = subtotal + shipping + tax

    return (
        <div className="h-full w-full bg-transparent text-black">
            <SearchSection />
            <Banner />

            <div className="bg-white rounded-2xl w-full mt-6 px-8 py-8">
                {/* Breadcrumb */}
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
                    <Link href="/cart" className="hover:text-[#1ABA1A] transition-colors">
                        Cart
                    </Link>
                    <IoIosArrowForward size={14} />
                    <span className="text-[#1ABA1A] font-semibold">Checkout</span>
                </div>

                <h1 className="text-2xl font-bold mb-6">CHECKOUT</h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Checkout Form */}
                    <div className="lg:col-span-2">
                        <div className="space-y-8">
                            {/* Contact Information */}
                            <section>
                                <h2 className="text-lg font-semibold mb-4">Contact Information</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <Input
                                        label="Email Address"
                                        type="email"
                                        placeholder="your@email.com"
                                        required
                                    />
                                    <Input
                                        label="Phone Number"
                                        type="tel"
                                        placeholder="+1 (555) 000-0000"
                                        required
                                    />
                                </div>
                            </section>

                            {/* Shipping Address */}
                            <section>
                                <h2 className="text-lg font-semibold mb-4">Shipping Address</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <Input
                                        label="First Name"
                                        type="text"
                                        placeholder="John"
                                        required
                                    />
                                    <Input
                                        label="Last Name"
                                        type="text"
                                        placeholder="Doe"
                                        required
                                    />
                                    <Input
                                        label="Address"
                                        type="text"
                                        placeholder="123 Main Street"
                                        required
                                        className="md:col-span-2"
                                    />
                                    <Input
                                        label="City"
                                        type="text"
                                        placeholder="New York"
                                        required
                                    />
                                    <Input
                                        label="State/Province"
                                        type="text"
                                        placeholder="NY"
                                        required
                                    />
                                    <Input
                                        label="ZIP/Postal Code"
                                        type="text"
                                        placeholder="10001"
                                        required
                                    />
                                    <Input
                                        label="Country"
                                        type="text"
                                        placeholder="United States"
                                        required
                                        className="md:col-span-2"
                                    />
                                </div>

                                <div className="flex items-center gap-2 mt-4">
                                    <input
                                        type="checkbox"
                                        id="save-address"
                                        checked={saveInfo}
                                        onChange={(e) => setSaveInfo(e.target.checked)}
                                        className="w-4 h-4 text-[#1ABA1A] bg-gray-100 border-gray-300 rounded focus:ring-[#1ABA1A] focus:ring-2"
                                    />
                                    <label htmlFor="save-address" className="text-sm text-gray-600">
                                        Save this information for next time
                                    </label>
                                </div>
                            </section>

                            {/* Shipping Method */}
                            <section>
                                <h2 className="text-lg font-semibold mb-4">Shipping Method</h2>
                                <div className="space-y-3">
                                    <label className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg cursor-pointer hover:border-[#1ABA1A] transition-colors">
                                        <input
                                            type="radio"
                                            name="shipping"
                                            defaultChecked
                                            className="w-4 h-4 text-[#1ABA1A] bg-gray-100 border-gray-300 focus:ring-[#1ABA1A] focus:ring-2"
                                        />
                                        <div className="flex-1">
                                            <div className="font-semibold">Standard Shipping</div>
                                            <div className="text-sm text-gray-500">5-7 business days • ${shipping === 0 ? 'FREE' : shipping.toFixed(2)}</div>
                                        </div>
                                    </label>
                                    <label className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg cursor-pointer hover:border-[#1ABA1A] transition-colors">
                                        <input
                                            type="radio"
                                            name="shipping"
                                            className="w-4 h-4 text-[#1ABA1A] bg-gray-100 border-gray-300 focus:ring-[#1ABA1A] focus:ring-2"
                                        />
                                        <div className="flex-1">
                                            <div className="font-semibold">Express Shipping</div>
                                            <div className="text-sm text-gray-500">2-3 business days • $24.99</div>
                                        </div>
                                    </label>
                                    <label className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg cursor-pointer hover:border-[#1ABA1A] transition-colors">
                                        <input
                                            type="radio"
                                            name="shipping"
                                            className="w-4 h-4 text-[#1ABA1A] bg-gray-100 border-gray-300 focus:ring-[#1ABA1A] focus:ring-2"
                                        />
                                        <div className="flex-1">
                                            <div className="font-semibold">Next Day Delivery</div>
                                            <div className="text-sm text-gray-500">Next business day • $39.99</div>
                                        </div>
                                    </label>
                                </div>
                            </section>

                            {/* Payment Method */}
                            <section>
                                <h2 className="text-lg font-semibold mb-4">Payment Method</h2>
                                <div className="space-y-4">
                                    {/* Credit Card */}
                                    <label className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg cursor-pointer hover:border-[#1ABA1A] transition-colors">
                                        <input
                                            type="radio"
                                            name="payment"
                                            value="credit-card"
                                            checked={paymentMethod === 'credit-card'}
                                            onChange={(e) => setPaymentMethod(e.target.value)}
                                            className="w-4 h-4 text-[#1ABA1A] bg-gray-100 border-gray-300 focus:ring-[#1ABA1A] focus:ring-2"
                                        />
                                        <div className="flex-1">
                                            <div className="font-semibold">Credit Card</div>
                                        </div>
                                        <div className="flex gap-2">
                                            {['visa', 'mastercard', 'amex'].map((card) => (
                                                <div key={card} className="w-8 h-6 bg-gray-100 rounded flex items-center justify-center">
                                                    <span className="text-xs font-semibold text-gray-500">{card.slice(0, 2).toUpperCase()}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </label>

                                    {paymentMethod === 'credit-card' && (
                                        <div className="ml-7 space-y-4 animate-fadeIn">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <Input
                                                    label="Card Number"
                                                    type="text"
                                                    placeholder="1234 5678 9012 3456"
                                                    required
                                                    className="md:col-span-2"
                                                />
                                                <Input
                                                    label="Name on Card"
                                                    type="text"
                                                    placeholder="John Doe"
                                                    required
                                                />
                                                <Input
                                                    label="Expiration Date"
                                                    type="text"
                                                    placeholder="MM/YY"
                                                    required
                                                />
                                                <Input
                                                    label="CVV"
                                                    type="text"
                                                    placeholder="123"
                                                    required
                                                />
                                            </div>
                                        </div>
                                    )}

                                    {/* PayPal */}
                                    <label className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg cursor-pointer hover:border-[#1ABA1A] transition-colors">
                                        <input
                                            type="radio"
                                            name="payment"
                                            value="paypal"
                                            checked={paymentMethod === 'paypal'}
                                            onChange={(e) => setPaymentMethod(e.target.value)}
                                            className="w-4 h-4 text-[#1ABA1A] bg-gray-100 border-gray-300 focus:ring-[#1ABA1A] focus:ring-2"
                                        />
                                        <div className="flex-1">
                                            <div className="font-semibold">PayPal</div>
                                        </div>
                                        <div className="w-12 h-8 bg-yellow-400 rounded flex items-center justify-center">
                                            <span className="text-xs font-semibold">Pay</span>
                                        </div>
                                    </label>

                                    {/* Apple Pay */}
                                    <label className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg cursor-pointer hover:border-[#1ABA1A] transition-colors">
                                        <input
                                            type="radio"
                                            name="payment"
                                            value="apple-pay"
                                            checked={paymentMethod === 'apple-pay'}
                                            onChange={(e) => setPaymentMethod(e.target.value)}
                                            className="w-4 h-4 text-[#1ABA1A] bg-gray-100 border-gray-300 focus:ring-[#1ABA1A] focus:ring-2"
                                        />
                                        <div className="flex-1">
                                            <div className="font-semibold">Apple Pay</div>
                                        </div>
                                        <div className="w-12 h-8 bg-black rounded flex items-center justify-center">
                                            <span className="text-xs font-semibold text-white">Pay</span>
                                        </div>
                                    </label>
                                </div>
                            </section>
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-gray-50 rounded-2xl p-6 border border-black/10 sticky top-6">
                            <h2 className="text-lg font-bold mb-4">ORDER SUMMARY</h2>

                            {/* Cart Items Preview */}
                            <div className="space-y-3 mb-4">
                                {cartItems.map((item) => (
                                    <div key={item.id} className="flex gap-3 py-2">
                                        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center border">
                                            <Image
                                                src={item.image}
                                                alt={item.title}
                                                width={40}
                                                height={40}
                                                className="object-contain"
                                            />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-semibold text-gray-800 text-sm leading-tight truncate">
                                                {item.title}
                                            </h3>
                                            <div className="text-xs text-gray-500">
                                                Qty: {item.quantity}
                                            </div>
                                        </div>
                                        <div className="text-sm font-semibold">
                                            ${(item.price * item.quantity).toFixed(2)}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="space-y-3 text-sm border-t border-gray-200 pt-4">
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

                            {/* Place Order Button */}
                            <Button variant="success" size="lg" className="w-full mt-6 py-3 font-semibold">
                                PLACE ORDER
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