'use client'
import SearchSection from '@/components/common/SearchSection'
import Banner from '@/components/common/Banner'
import Button from '@/components/common/Button'
import Image from 'next/image'
import Link from 'next/link'
import { IoIosArrowForward } from 'react-icons/io'
import { useState, useEffect } from 'react'
import Input from '@/components/common/Input'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { ordersService, CreateOrderData } from '@/utils/supabase/orders'
import { createClient } from '@/utils/supabase/client'

interface CartItem {
    id: string;
    name: string;
    price: number;
    main_img_url: string;
    slug: string;
    quantity: number;
    sku: string;
}

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

export default function CheckoutPage() {
    const [paymentMethod, setPaymentMethod] = useState('credit-card')
    const [shippingMethod, setShippingMethod] = useState('standard')
    const [saveInfo, setSaveInfo] = useState(true)
    const [cartItems, setCartItems] = useState<CartItem[]>([])
    const [isClient, setIsClient] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [user, setUser] = useState<any>(null)
    const [checkingAuth, setCheckingAuth] = useState(true)
    const router = useRouter()
    const supabase = createClient()

    const [formData, setFormData] = useState<CheckoutFormData>({
        email: '',
        phone: '',
        shipping_first_name: '',
        shipping_last_name: '',
        shipping_address: '',
        shipping_city: '',
        shipping_state: '',
        shipping_zip: '',
        shipping_country: 'United States'
    })

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const { data: { session } } = await supabase.auth.getSession()

                if (!session) {
                    toast.error('Please login to place an order')
                    router.push('/auth')
                    return
                }

                setUser(session.user)

                // Load cart and form data only if user is authenticated
                const cart = JSON.parse(localStorage.getItem('cart') || '[]')
                setCartItems(cart)

                const savedFormData = localStorage.getItem('checkout-form-data')
                if (savedFormData) {
                    setFormData(JSON.parse(savedFormData))
                }

                setIsClient(true)
            } catch (error) {
                console.error('Auth check error:', error)
                toast.error('Authentication error')
                router.push('/auth')
            } finally {
                setCheckingAuth(false)
            }
        }

        checkAuth()
    }, [router, supabase.auth])

    const handleInputChange = (field: keyof CheckoutFormData, value: string) => {
        const updatedFormData = { ...formData, [field]: value }
        setFormData(updatedFormData)

        if (saveInfo) {
            localStorage.setItem('checkout-form-data', JSON.stringify(updatedFormData))
        }
    }

    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    const shippingCost = shippingMethod === 'standard' ? (subtotal > 199 ? 0 : 15.00) :
        shippingMethod === 'express' ? 24.99 : 39.99
    const tax = subtotal * 0.08
    const total = subtotal + shippingCost + tax

    const handlePlaceOrder = async () => {
        if (!user) {
            toast.error('Please login to place an order')
            router.push('/auth')
            return
        }

        console.log('Starting order placement...');

        if (!validateForm()) {
            console.log('Form validation failed');
            return;
        }

        setIsLoading(true);
        console.log('User ID:', user.id);
        console.log('Form data:', formData);
        console.log('Cart items:', cartItems);

        try {
            const orderData: CreateOrderData = {
                email: formData.email,
                phone: formData.phone || '',
                shipping_first_name: formData.shipping_first_name,
                shipping_last_name: formData.shipping_last_name,
                shipping_address: formData.shipping_address,
                shipping_city: formData.shipping_city,
                shipping_state: formData.shipping_state,
                shipping_zip: formData.shipping_zip,
                shipping_country: formData.shipping_country,
                shipping_method: shippingMethod,
                shipping_cost: shippingCost,
                payment_method: paymentMethod,
                subtotal: Number(subtotal.toFixed(2)),
                tax: Number(tax.toFixed(2)),
                total: Number(total.toFixed(2)),
                items: cartItems,
                user_id: user.id
            };

            console.log('Sending order data to Supabase:', orderData);

            // Save order to Supabase
            const order = await ordersService.createOrder(orderData);
            console.log('Order created successfully:', order);

            // Clear cart and show success message
            localStorage.setItem('cart', '[]');
            localStorage.removeItem('checkout-form-data');

            toast.success(`Order #${order.id.slice(0, 8).toUpperCase()} placed successfully!`);

            // Redirect to order confirmation page
            setTimeout(() => {
                router.push(`/order-confirmation?orderId=${order.id}`);
            }, 2000);

        } catch (error: any) {
            console.error('Error creating order:', error);
            toast.error(`Failed to place order: ${error.message || 'Please try again.'}`);
        } finally {
            setIsLoading(false);
        }
    }

    const validateForm = () => {
        const requiredFields: (keyof CheckoutFormData)[] = [
            'email', 'shipping_first_name', 'shipping_last_name',
            'shipping_address', 'shipping_city', 'shipping_state', 'shipping_zip'
        ];

        for (const field of requiredFields) {
            if (!formData[field]?.trim()) {
                const fieldName = field.replace(/_/g, ' ');
                toast.error(`Please fill in ${fieldName}`);
                return false;
            }
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            toast.error('Please enter a valid email address');
            return false;
        }

        return true;
    }

    if (checkingAuth) {
        return (
            <div className="h-full w-full bg-transparent text-black">
                <SearchSection />
                <Banner />
                <div className="bg-white rounded-2xl w-full mt-6 px-8 py-8 flex justify-center">
                    <div className="text-lg">Checking authentication...</div>
                </div>
            </div>
        );
    }

    if (!isClient || !user) {
        return (
            <div className="h-full w-full bg-transparent text-black">
                <SearchSection />
                <Banner />
                <div className="bg-white rounded-2xl w-full mt-6 px-8 py-8 flex justify-center">
                    <div className="text-lg">Redirecting to login...</div>
                </div>
            </div>
        );
    }

    if (cartItems.length === 0) {
        return (
            <div className="h-full w-full bg-transparent text-black">
                <SearchSection />
                <Banner />
                <div className="bg-white rounded-2xl w-full mt-6 px-8 py-8">
                    <div className="text-center py-12">
                        <div className="text-gray-400 text-6xl mb-4">🛒</div>
                        <h2 className="text-xl font-semibold text-gray-600 mb-2">Your cart is empty</h2>
                        <p className="text-gray-500 mb-6">Add some products to your cart to checkout.</p>
                        <Link href="/">
                            <Button variant="success">Continue Shopping</Button>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="h-full w-full bg-transparent text-black">
            <SearchSection />
            <Banner />

            <div className="bg-white rounded-2xl w-full mt-6 px-8 py-8">
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
                    <Link href="/cart" className="hover:text-[#1ABA1A] transition-colors">
                        Cart
                    </Link>
                    <IoIosArrowForward size={14} />
                    <span className="text-[#1ABA1A] font-semibold">Checkout</span>
                </div>

                <h1 className="text-2xl font-bold mb-6">CHECKOUT</h1>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="text-blue-600 text-sm font-semibold">👤</span>
                        </div>
                        <div>
                            <p className="text-blue-800 font-semibold">Ordering as: {user.email}</p>
                            <p className="text-blue-600 text-sm">Your order will be linked to your account</p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
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
                                        onChange={(e) => handleInputChange('email', e.target.value)}
                                    />
                                    <Input
                                        label="Phone Number"
                                        type="tel"
                                        placeholder="+1 (555) 000-0000"
                                        value={formData.phone}
                                        onChange={(e) => handleInputChange('phone', e.target.value)}
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
                                        onChange={(e) => handleInputChange('shipping_first_name', e.target.value)}
                                    />
                                    <Input
                                        label="Last Name"
                                        type="text"
                                        placeholder="Doe"
                                        required
                                        value={formData.shipping_last_name}
                                        onChange={(e) => handleInputChange('shipping_last_name', e.target.value)}
                                    />
                                    <Input
                                        label="Address"
                                        type="text"
                                        placeholder="123 Main Street"
                                        required
                                        className="md:col-span-2"
                                        value={formData.shipping_address}
                                        onChange={(e) => handleInputChange('shipping_address', e.target.value)}
                                    />
                                    <Input
                                        label="City"
                                        type="text"
                                        placeholder="New York"
                                        required
                                        value={formData.shipping_city}
                                        onChange={(e) => handleInputChange('shipping_city', e.target.value)}
                                    />
                                    <Input
                                        label="State/Province"
                                        type="text"
                                        placeholder="NY"
                                        required
                                        value={formData.shipping_state}
                                        onChange={(e) => handleInputChange('shipping_state', e.target.value)}
                                    />
                                    <Input
                                        label="ZIP/Postal Code"
                                        type="text"
                                        placeholder="10001"
                                        required
                                        value={formData.shipping_zip}
                                        onChange={(e) => handleInputChange('shipping_zip', e.target.value)}
                                    />
                                    <Input
                                        label="Country"
                                        type="text"
                                        placeholder="United States"
                                        required
                                        className="md:col-span-2"
                                        value={formData.shipping_country}
                                        onChange={(e) => handleInputChange('shipping_country', e.target.value)}
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

                            <section>
                                <h2 className="text-lg font-semibold mb-4">Shipping Method</h2>
                                <div className="space-y-3">
                                    <label className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg cursor-pointer hover:border-[#1ABA1A] transition-colors">
                                        <input
                                            type="radio"
                                            name="shipping"
                                            value="standard"
                                            checked={shippingMethod === 'standard'}
                                            onChange={(e) => setShippingMethod(e.target.value)}
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
                                            onChange={(e) => setShippingMethod(e.target.value)}
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
                                            onChange={(e) => setShippingMethod(e.target.value)}
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

                    <div className="lg:col-span-1">
                        <div className="bg-gray-50 rounded-2xl p-6 border border-black/10 sticky top-6">
                            <h2 className="text-lg font-bold mb-4">ORDER SUMMARY</h2>

                            <div className="space-y-3 mb-4 max-h-80 overflow-y-auto">
                                {cartItems.map((item) => (
                                    <div key={item.id} className="flex gap-3 py-2">
                                        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center border">
                                            <Image
                                                src={item.main_img_url}
                                                alt={item.name}
                                                width={40}
                                                height={40}
                                                className="object-contain"
                                            />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <Link href={`/product/${item.slug}`}>
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
                                onClick={handlePlaceOrder}
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
                </div>
            </div>
        </div>
    )
}