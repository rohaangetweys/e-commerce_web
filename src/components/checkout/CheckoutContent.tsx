'use client'
import SearchSection from '@/components/common/SearchSection'
import Banner from '@/components/common/Banner'
import Link from 'next/link'
import { IoIosArrowForward } from 'react-icons/io'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { ordersService, CreateOrderData } from '@/utils/supabase/orders'
import CheckoutForm from './CheckoutForm'
import OrderSummary from './OrderSummary'

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

interface CheckoutContentProps {
    user: any;
}

export default function CheckoutContent({ user }: CheckoutContentProps) {
    const [paymentMethod, setPaymentMethod] = useState('credit-card')
    const [shippingMethod, setShippingMethod] = useState('standard')
    const [saveInfo, setSaveInfo] = useState(true)
    const [cartItems, setCartItems] = useState<CartItem[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [pageState, setPageState] = useState<'loading' | 'ready' | 'redirecting'>('loading')
    const router = useRouter()

    const [formData, setFormData] = useState<CheckoutFormData>({
        email: user.email || '',
        phone: '',
        shipping_first_name: '',
        shipping_last_name: '',
        shipping_address: '',
        shipping_city: '',
        shipping_state: '',
        shipping_zip: '',
        shipping_country: 'United States'
    })

    const loadCartData = () => {
        const cart = JSON.parse(localStorage.getItem('cart') || '[]')
        setCartItems(cart)
        return cart
    }

    useEffect(() => {
        const cart = loadCartData()

        if (cart.length === 0) {
            toast.error('Your cart is empty')
            setPageState('redirecting')
            setTimeout(() => router.push('/cart'), 1000)
            return
        }

        const savedFormData = localStorage.getItem('checkout-form-data')
        if (savedFormData) {
            setFormData(JSON.parse(savedFormData))
        }

        setPageState('ready')
    }, [router])

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
        if (!validateForm()) {
            return;
        }

        setIsLoading(true);

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

            console.log('Placing order with data:', orderData);

            const order = await ordersService.createOrder(orderData);
            console.log('Order created:', order);

            localStorage.setItem('cart', '[]');
            localStorage.removeItem('checkout-form-data');

            toast.success(`Order #${order.id.slice(0, 8).toUpperCase()} placed successfully!`);

            setTimeout(() => {
                router.push(`/order-confirmation?orderId=${order.id}`);
            }, 2000);

        } catch (error: any) {
            console.error('Order placement error:', error);
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

    if (pageState === 'loading') {
        return (
            <div className="h-full w-full bg-transparent text-black">
                <SearchSection />
                <Banner />
                <div className="bg-white rounded-2xl w-full mt-6 px-8 py-8 flex justify-center items-center min-h-[400px]">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1ABA1A] mx-auto mb-4"></div>
                        <div className="text-lg">Loading checkout...</div>
                    </div>
                </div>
            </div>
        );
    }

    if (pageState === 'redirecting') {
        return (
            <div className="h-full w-full bg-transparent text-black">
                <SearchSection />
                <Banner />
                <div className="bg-white rounded-2xl w-full mt-6 px-8 py-8 flex justify-center items-center min-h-[400px]">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1ABA1A] mx-auto mb-4"></div>
                        <div className="text-lg">Redirecting...</div>
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
                        <CheckoutForm
                            formData={formData}
                            shippingMethod={shippingMethod}
                            paymentMethod={paymentMethod}
                            shippingCost={shippingCost}
                            saveInfo={saveInfo}
                            onInputChange={handleInputChange}
                            onShippingMethodChange={setShippingMethod}
                            onPaymentMethodChange={setPaymentMethod}
                            onSaveInfoChange={setSaveInfo}
                        />
                    </div>

                    <OrderSummary
                        cartItems={cartItems}
                        subtotal={subtotal}
                        shippingCost={shippingCost}
                        tax={tax}
                        total={total}
                        shippingMethod={shippingMethod}
                        isLoading={isLoading}
                        onPlaceOrder={handlePlaceOrder}
                    />
                </div>
            </div>
        </div>
    )
}