'use client';
import { useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import { FiUser, FiMail, FiShoppingBag, FiLogOut } from 'react-icons/fi';
import Button from '@/components/common/Button';
import SearchSection from '@/components/common/SearchSection';
import Banner from '@/components/common/Banner';

interface ProfileContentProps {
    user: any;
    profile: any;
}

export default function ProfileContent({ user, profile }: ProfileContentProps) {
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const supabase = createClient();

    const handleLogout = async () => {
        setLoading(true);
        try {
            const { error } = await supabase.auth.signOut();

            if (error) {
                console.error('Standard logout failed:', error);
                clearAllCookies();
            }

            window.location.href = '/';
        } catch (error) {
            console.error('Error logging out:', error);
            window.location.href = '/';
        } finally {
            setLoading(false);
        }
    };

    const clearAllCookies = () => {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i];
            const eqPos = cookie.indexOf('=');
            const name = eqPos > -1 ? cookie.substr(0, eqPos).trim() : cookie.trim();
            document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/';
            document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=' + window.location.hostname;
        }
        localStorage.clear();
        sessionStorage.clear();
    };

    const displayName = profile?.full_name || user?.email || 'User';

    return (
        <div className="h-full w-full bg-transparent text-black">
            <SearchSection />
            <Banner hasProduct={true} productName="My Profile" />

            <div className="bg-white rounded-2xl w-full mt-6 px-8 py-8">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-8">
                        <div className="w-24 h-24 bg-[#1ABA1A] rounded-full flex items-center justify-center mx-auto mb-4">
                            <FiUser className="text-white text-3xl" />
                        </div>
                        <h1 className="text-2xl font-bold text-gray-800">My Profile</h1>
                        <p className="text-gray-600">Manage your account information</p>
                    </div>

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
                                Order History
                            </h2>

                            <div className="space-y-4">
                                <div className="text-center py-8">
                                    <FiShoppingBag className="text-gray-300 text-4xl mx-auto mb-3" />
                                    <p className="text-gray-500 text-sm">No orders yet</p>
                                    <p className="text-gray-400 text-xs mt-1">
                                        Your order history will appear here
                                    </p>
                                </div>

                                <Button
                                    variant="outline"
                                    className="w-full"
                                    onClick={() => router.push('/shop')}
                                >
                                    <FiShoppingBag className="mr-2" />
                                    Start Shopping
                                </Button>
                            </div>
                        </div>
                    </div>

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