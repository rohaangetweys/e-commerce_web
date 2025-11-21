'use client'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Button from '@/components/common/Button'
import { ordersService, Order } from '@/utils/supabase/orders'

export default function OrderConfirmationContent() {
    const searchParams = useSearchParams()
    const orderId = searchParams.get('orderId')
    const [order, setOrder] = useState<Order | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        if (orderId) {
            fetchOrder(orderId)
        } else {
            setLoading(false)
            setError('No order ID provided')
        }
    }, [orderId])

    const fetchOrder = async (id: string) => {
        try {
            const orderData = await ordersService.getOrder(id)
            setOrder(orderData)
        } catch (error) {
            console.error('Error fetching order:', error)
            setError('Order not found')
        } finally {
            setLoading(false)
        }
    }

    if (loading) {
        return (
            <div className="bg-white rounded-2xl w-full mt-6 px-8 py-8">
                <div className="max-w-2xl mx-auto text-center">
                    <div className="animate-pulse">
                        <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4"></div>
                        <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-2"></div>
                        <div className="h-4 bg-gray-200 rounded w-48 mx-auto mb-6"></div>
                        <div className="h-32 bg-gray-200 rounded mb-6"></div>
                        <div className="h-12 bg-gray-200 rounded w-48 mx-auto"></div>
                    </div>
                </div>
            </div>
        )
    }

    if (error || !order) {
        return (
            <div className="bg-white rounded-2xl w-full mt-6 px-8 py-8">
                <div className="max-w-2xl mx-auto text-center">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </div>

                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Not Found</h1>
                    <p className="text-gray-600 mb-6">
                        {error || 'We couldn\'t find the order you\'re looking for.'}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/">
                            <Button variant="outline">Continue Shopping</Button>
                        </Link>
                        <Link href="/profile">
                            <Button variant="success">View My Orders</Button>
                        </Link>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="bg-white rounded-2xl w-full mt-6 px-8 py-8">
            <div className="max-w-2xl mx-auto text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                </div>

                <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Confirmed!</h1>
                <p className="text-gray-600 mb-6">
                    Thank you for your purchase. Your order has been confirmed and will be shipped soon.
                </p>

                <div className="bg-gray-50 rounded-lg p-6 mb-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                        <div>
                            <h3 className="font-semibold text-gray-800 mb-2">Order Details</h3>
                            <p className="text-sm text-gray-600">Order #: {order.id.slice(0, 8).toUpperCase()}</p>
                            <p className="text-sm text-gray-600">Date: {new Date(order.created_at).toLocaleDateString()}</p>
                            <p className="text-sm text-gray-600">Status: <span className="capitalize text-[#1ABA1A] font-semibold">{order.status}</span></p>
                            <p className="text-sm text-gray-600">Total: <span className="font-semibold">${order.total.toFixed(2)}</span></p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-800 mb-2">Shipping Address</h3>
                            <p className="text-sm text-gray-600">
                                {order.shipping_first_name} {order.shipping_last_name}<br />
                                {order.shipping_address}<br />
                                {order.shipping_city}, {order.shipping_state} {order.shipping_zip}<br />
                                {order.shipping_country}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-6 mb-6 text-left">
                    <h3 className="font-semibold text-gray-800 mb-4">Order Items</h3>
                    <div className="space-y-3">
                        {order.items.map((item: any, index: number) => (
                            <div key={index} className="flex justify-between items-center py-2 border-b border-gray-200 last:border-b-0">
                                <div className="flex-1">
                                    <p className="font-medium text-gray-800">{item.name}</p>
                                    <p className="text-sm text-gray-500">Qty: {item.quantity} × ${item.price}</p>
                                </div>
                                <p className="font-semibold text-gray-800">
                                    ${(item.price * item.quantity).toFixed(2)}
                                </p>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-between items-center pt-4 mt-4 border-t border-gray-200">
                        <span className="font-semibold text-gray-800">Total</span>
                        <span className="text-xl font-bold text-[#1ABA1A]">${order.total.toFixed(2)}</span>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link href="/">
                        <Button variant="outline">Continue Shopping</Button>
                    </Link>
                    <Link href="/profile">
                        <Button variant="success">View My Orders</Button>
                    </Link>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-200">
                    <p className="text-sm text-gray-600 mb-2">
                        Need help with your order?
                    </p>
                    <div className="text-lg font-bold text-[#1ABA1A]">(025) 3886 25 16</div>
                    <p className="text-sm text-gray-500 mt-1">24/7 Customer Support</p>
                </div>
            </div>
        </div>
    )
}