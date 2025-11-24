'use client'
import Input from '@/components/common/Input'

interface CheckoutFormData {
    email: string;
    phone: string;
    shipping_first_name: string;
    shipping_last_name: string;
    shipping_address: string;
    shipping_city: string;
    shipping_state: string;
    shipping_zip: string;
    shipping_country: string;
}

interface CheckoutFormProps {
    formData: CheckoutFormData;
    shippingMethod: string;
    paymentMethod: string;
    shippingCost: number;
    saveInfo: boolean;
    onInputChange: (field: keyof CheckoutFormData, value: string) => void;
    onShippingMethodChange: (method: string) => void;
    onPaymentMethodChange: (method: string) => void;
    onSaveInfoChange: (checked: boolean) => void;
}

export default function CheckoutForm({
    formData,
    shippingMethod,
    paymentMethod,
    shippingCost,
    saveInfo,
    onInputChange,
    onShippingMethodChange,
    onPaymentMethodChange,
    onSaveInfoChange
}: CheckoutFormProps) {
    return (
        <div className="space-y-8">
            <section>
                <h2 className="text-lg font-semibold mb-4">Contact Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                        label="Email Address"
                        type="email"
                        placeholder="your@email.com"
                        required
                        value={formData.email}
                        onChange={(e) => onInputChange('email', e.target.value)}
                    />
                    <Input
                        label="Phone Number"
                        type="tel"
                        placeholder="+1 (555) 000-0000"
                        value={formData.phone}
                        onChange={(e) => onInputChange('phone', e.target.value)}
                    />
                </div>
            </section>

            <section>
                <h2 className="text-lg font-semibold mb-4">Shipping Address</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                        label="First Name"
                        type="text"
                        placeholder="John"
                        required
                        value={formData.shipping_first_name}
                        onChange={(e) => onInputChange('shipping_first_name', e.target.value)}
                    />
                    <Input
                        label="Last Name"
                        type="text"
                        placeholder="Doe"
                        required
                        value={formData.shipping_last_name}
                        onChange={(e) => onInputChange('shipping_last_name', e.target.value)}
                    />
                    <Input
                        label="Address"
                        type="text"
                        placeholder="123 Main Street"
                        required
                        className="md:col-span-2"
                        value={formData.shipping_address}
                        onChange={(e) => onInputChange('shipping_address', e.target.value)}
                    />
                    <Input
                        label="City"
                        type="text"
                        placeholder="New York"
                        required
                        value={formData.shipping_city}
                        onChange={(e) => onInputChange('shipping_city', e.target.value)}
                    />
                    <Input
                        label="State/Province"
                        type="text"
                        placeholder="NY"
                        required
                        value={formData.shipping_state}
                        onChange={(e) => onInputChange('shipping_state', e.target.value)}
                    />
                    <Input
                        label="ZIP/Postal Code"
                        type="text"
                        placeholder="10001"
                        required
                        value={formData.shipping_zip}
                        onChange={(e) => onInputChange('shipping_zip', e.target.value)}
                    />
                    <Input
                        label="Country"
                        type="text"
                        placeholder="United States"
                        required
                        className="md:col-span-2"
                        value={formData.shipping_country}
                        onChange={(e) => onInputChange('shipping_country', e.target.value)}
                    />
                </div>

                <div className="flex items-center gap-2 mt-4">
                    <input
                        type="checkbox"
                        id="save-address"
                        checked={saveInfo}
                        onChange={(e) => onSaveInfoChange(e.target.checked)}
                        className="w-4 h-4 text-[#1ABA1A] bg-gray-100 border-gray-300 rounded focus:ring-[#1ABA1A] focus:ring-2"
                    />
                    <label htmlFor="save-address" className="text-sm text-gray-600">
                        Save this information for next time
                    </label>
                </div>
            </section>

            <section>
                <h2 className="text-lg font-semibold mb-4">Shipping Method</h2>
                <div className="space-y-3">
                    <label className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg cursor-pointer hover:border-[#1ABA1A] transition-colors">
                        <input
                            type="radio"
                            name="shipping"
                            value="standard"
                            checked={shippingMethod === 'standard'}
                            onChange={(e) => onShippingMethodChange(e.target.value)}
                            className="w-4 h-4 text-[#1ABA1A] bg-gray-100 border-gray-300 focus:ring-[#1ABA1A] focus:ring-2"
                        />
                        <div className="flex-1">
                            <div className="font-semibold">Standard Shipping</div>
                            <div className="text-sm text-gray-500">5-7 business days • {shippingCost === 0 ? 'FREE' : `$${shippingCost.toFixed(2)}`}</div>
                        </div>
                    </label>
                    <label className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg cursor-pointer hover:border-[#1ABA1A] transition-colors">
                        <input
                            type="radio"
                            name="shipping"
                            value="express"
                            checked={shippingMethod === 'express'}
                            onChange={(e) => onShippingMethodChange(e.target.value)}
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
                            value="next-day"
                            checked={shippingMethod === 'next-day'}
                            onChange={(e) => onShippingMethodChange(e.target.value)}
                            className="w-4 h-4 text-[#1ABA1A] bg-gray-100 border-gray-300 focus:ring-[#1ABA1A] focus:ring-2"
                        />
                        <div className="flex-1">
                            <div className="font-semibold">Next Day Delivery</div>
                            <div className="text-sm text-gray-500">Next business day • $39.99</div>
                        </div>
                    </label>
                </div>
            </section>

            <section>
                <h2 className="text-lg font-semibold mb-4">Payment Method</h2>
                <div className="space-y-4">
                    <label className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg cursor-pointer hover:border-[#1ABA1A] transition-colors">
                        <input
                            type="radio"
                            name="payment"
                            value="credit-card"
                            checked={paymentMethod === 'credit-card'}
                            onChange={(e) => onPaymentMethodChange(e.target.value)}
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

                    <label className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg cursor-pointer hover:border-[#1ABA1A] transition-colors">
                        <input
                            type="radio"
                            name="payment"
                            value="paypal"
                            checked={paymentMethod === 'paypal'}
                            onChange={(e) => onPaymentMethodChange(e.target.value)}
                            className="w-4 h-4 text-[#1ABA1A] bg-gray-100 border-gray-300 focus:ring-[#1ABA1A] focus:ring-2"
                        />
                        <div className="flex-1">
                            <div className="font-semibold">PayPal</div>
                        </div>
                        <div className="w-12 h-8 bg-yellow-400 rounded flex items-center justify-center">
                            <span className="text-xs font-semibold">Pay</span>
                        </div>
                    </label>

                    <label className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg cursor-pointer hover:border-[#1ABA1A] transition-colors">
                        <input
                            type="radio"
                            name="payment"
                            value="apple-pay"
                            checked={paymentMethod === 'apple-pay'}
                            onChange={(e) => onPaymentMethodChange(e.target.value)}
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
    )
}