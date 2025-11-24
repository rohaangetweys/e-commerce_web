'use client';
import { useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import { FiUser, FiMail, FiShoppingBag, FiLogOut, FiPackage, FiClock, FiCheck, FiTruck } from 'react-icons/fi';
import Button from '@/components/common/Button';
import SearchSection from '@/components/common/SearchSection';
import Banner from '@/components/common/Banner';
import Image from 'next/image';
import Link from 'next/link';
import toast from 'react-hot-toast';

interface Order {
    id: string;
    user_id: string | null;
    email: string;
    phone: string | null;
    shipping_first_name: string;
    shipping_last_name: string;
    shipping_address: string;
    shipping_city: string;
    shipping_state: string;
    shipping_zip: string;
    shipping_country: string;
    shipping_method: string;
    shipping_cost: number;
    payment_method: string;
    subtotal: number;
    tax: number;
    total: number;
    status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
    items: any[];
    created_at: string;
    updated_at: string;
}

interface ProfileContentProps {
    user: any;
    profile: any;
    orders: Order[];
}

export default function ProfileContent({ user, profile, orders }: ProfileContentProps) {
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState<'profile' | 'orders'>('profile');
    const router = useRouter();
    const supabase = createClient();

    const handleLogout = async () => {
        setLoading(true);
        try {
            await supabase.auth.signOut();
            router.push('/');
            router.refresh();
        } catch (error) {
            console.error('Logout error:', error);
            router.push('/');
            router.refresh();
        } finally {
            setLoading(false);
        }
    };

    const displayName = profile?.full_name || user?.email || 'User';

    const getStatusIcon = (status: Order['status']) => {
        switch (status) {
            case 'pending':
                return <FiClock className="text-yellow-500" />;
            case 'confirmed':
                return <FiCheck className="text-blue-500" />;
            case 'shipped':
                return <FiTruck className="text-purple-500" />;
            case 'delivered':
                return <FiPackage className="text-green-500" />;
            case 'cancelled':
                return <FiClock className="text-red-500" />;
            default:
                return <FiClock className="text-gray-500" />;
        }
    };

    const getStatusColor = (status: Order['status']) => {
        switch (status) {
            case 'pending':
                return 'bg-yellow-100 text-yellow-800';
            case 'confirmed':
                return 'bg-blue-100 text-blue-800';
            case 'shipped':
                return 'bg-purple-100 text-purple-800';
            case 'delivered':
                return 'bg-green-100 text-green-800';
            case 'cancelled':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    const handleViewOrderDetails = (orderId: string) => {
        router.push(`/order-confirmation?orderId=${orderId}`);
    };

    const handleBuyAgain = () => {
        router.push('/shop');
        toast.success('Continue shopping to add items to your cart');
    };

    return (
        <div className="h-full w-full bg-transparent text-black">
            <SearchSection />
            <Banner hasProduct={true} productName="My Profile" />

            <div className="bg-white rounded-2xl w-full mt-6 px-8 py-8">
                <div className="max-w-6xl mx-auto">

                    <div className="text-center mb-8">
                        <div className="w-24 h-24 bg-[#1ABA1A] rounded-full flex items-center justify-center mx-auto mb-4">
                            <FiUser className="text-white text-3xl" />
                        </div>
                        <h1 className="text-2xl font-bold text-gray-800">My Profile</h1>
                        <p className="text-gray-600">Manage your account information and view order history</p>
                    </div>

                    <div className="flex border-b border-gray-200 mb-8">
                        <button
                            className={`px-4 py-2 font-semibold border-b-2 transition-colors ${
                                activeTab === 'profile'
                                    ? 'border-[#1ABA1A] text-[#1ABA1A]'
                                    : 'border-transparent text-gray-500 hover:text-gray-700'
                            }`}
                            onClick={() => setActiveTab('profile')}
                        >
                            <FiUser className="inline mr-2" />
                            Profile Information
                        </button>
                        <button
                            className={`px-4 py-2 font-semibold border-b-2 transition-colors ${
                                activeTab === 'orders'
                                    ? 'border-[#1ABA1A] text-[#1ABA1A]'
                                    : 'border-transparent text-gray-500 hover:text-gray-700'
                            }`}
                            onClick={() => setActiveTab('orders')}
                        >
                            <FiShoppingBag className="inline mr-2" />
                            Order History ({orders.length})
                        </button>
                    </div>

                    {activeTab === 'profile' && (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <div className="bg-gray-50 rounded-xl p-6">
                                <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                                    <FiUser className="text-[#1ABA1A]" />
                                    Personal Information
                                </h2>

                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-600 mb-1">
                                            Full Name
                                        </label>
                                        <div className="p-3 bg-white rounded-lg border border-gray-200">
                                            {displayName}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-600 mb-1">
                                            Email Address
                                        </label>
                                        <div className="p-3 bg-white rounded-lg border border-gray-200 flex items-center gap-2">
                                            <FiMail className="text-gray-400" />
                                            {user.email}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-600 mb-1">
                                            Account Created
                                        </label>
                                        <div className="p-3 bg-white rounded-lg border border-gray-200">
                                            {new Date(user.created_at).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-gray-50 rounded-xl p-6">
                                <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                                    <FiShoppingBag className="text-[#1ABA1A]" />
                                    Order Summary
                                </h2>

                                <div className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4 text-center">
                                        <div className="bg-white rounded-lg p-4 border border-gray-200">
                                            <div className="text-2xl font-bold text-[#1ABA1A]">
                                                {orders.length}
                                            </div>
                                            <div className="text-sm text-gray-600">Total Orders</div>
                                        </div>
                                        <div className="bg-white rounded-lg p-4 border border-gray-200">
                                            <div className="text-2xl font-bold text-blue-600">
                                                {orders.filter(order => order.status === 'delivered').length}
                                            </div>
                                            <div className="text-sm text-gray-600">Delivered</div>
                                        </div>
                                    </div>

                                    <Button
                                        variant="outline"
                                        className="w-full"
                                        onClick={() => setActiveTab('orders')}
                                    >
                                        <FiShoppingBag className="mr-2" />
                                        View All Orders
                                    </Button>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'orders' && (
                        <div className="bg-gray-50 rounded-xl p-6">
                            <h2 className="text-lg font-semibold text-gray-800 mb-6 flex items-center gap-2">
                                <FiShoppingBag className="text-[#1ABA1A]" />
                                Order History
                            </h2>

                            {orders.length === 0 ? (
                                <div className="text-center py-8">
                                    <FiShoppingBag className="text-gray-300 text-4xl mx-auto mb-3" />
                                    <p className="text-gray-500 text-sm">No orders yet</p>
                                    <p className="text-gray-400 text-xs mt-1 mb-4">
                                        Your order history will appear here
                                    </p>
                                    <Button
                                        variant="outline"
                                        onClick={() => router.push('/shop')}
                                    >
                                        <FiShoppingBag className="mr-2" />
                                        Start Shopping
                                    </Button>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {orders.map((order) => (
                                        <div key={order.id} className="bg-white rounded-lg border border-gray-200 p-6">
                                            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
                                                <div>
                                                    <h3 className="font-semibold text-gray-800">
                                                        Order #{order.id.slice(0, 8).toUpperCase()}
                                                    </h3>
                                                    <p className="text-sm text-gray-500">
                                                        {formatDate(order.created_at)}
                                                    </p>
                                                </div>
                                                <div className="flex items-center gap-3 mt-2 sm:mt-0">
                                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold capitalize flex items-center gap-1 ${getStatusColor(order.status)}`}>
                                                        {getStatusIcon(order.status)}
                                                        {order.status}
                                                    </span>
                                                    <span className="text-lg font-bold text-[#1ABA1A]">
                                                        ${order.total.toFixed(2)}
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="border-t border-gray-200 pt-4">
                                                <div className="space-y-3">
                                                    {order.items?.slice(0, 2).map((item: any, index: number) => (
                                                        <div key={index} className="flex items-center gap-3">
                                                            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center border relative overflow-hidden">
                                                                <Image
                                                                    src={item.main_img_url}
                                                                    alt={item.name}
                                                                    fill
                                                                    className="object-cover"
                                                                />
                                                            </div>
                                                            <div className="flex-1 min-w-0">
                                                                <h4 className="font-medium text-gray-800 text-sm truncate">
                                                                    {item.name}
                                                                </h4>
                                                                <p className="text-xs text-gray-500">
                                                                    Qty: {item.quantity} • ${item.price}
                                                                </p>
                                                            </div>
                                                            <div className="text-sm font-semibold">
                                                                ${(item.price * item.quantity).toFixed(2)}
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>

                                                {order.items && order.items.length > 2 && (
                                                    <p className="text-sm text-gray-500 mt-2">
                                                        +{order.items.length - 2} more item(s)
                                                    </p>
                                                )}

                                                <div className="flex flex-col sm:flex-row sm:items-center justify-between mt-4 pt-4 border-t border-gray-200">
                                                    <div className="text-sm text-gray-600">
                                                        <p>
                                                            {order.items?.reduce((sum, item) => sum + item.quantity, 0)} items • 
                                                            Shipped to {order.shipping_city}, {order.shipping_state}
                                                        </p>
                                                    </div>
                                                    <div className="flex gap-2 mt-2 sm:mt-0">
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            onClick={() => handleViewOrderDetails(order.id)}
                                                        >
                                                            View Details
                                                        </Button>
                                                        {order.status === 'delivered' && (
                                                            <Button
                                                                variant="success"
                                                                size="sm"
                                                                onClick={handleBuyAgain}
                                                            >
                                                                Buy Again
                                                            </Button>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    <div className="mt-8 pt-6 border-t border-gray-200">
                        <div className="flex justify-center">
                            <Button
                                variant="secondary"
                                size="lg"
                                onClick={handleLogout}
                                disabled={loading}
                                className="bg-red-600 hover:bg-red-700 text-white"
                            >
                                <FiLogOut className="mr-2" />
                                {loading ? 'Logging out...' : 'Logout'}
                            </Button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}