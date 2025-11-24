'use client'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { IoMdHeartEmpty } from 'react-icons/io';
import { IoBagCheckOutline } from 'react-icons/io5';
import { RiShoppingCartLine } from 'react-icons/ri';
import { useState, useEffect } from 'react';
import { FaRegUser, FaUser } from 'react-icons/fa';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';

export default function Header({ isAuthPage }: { isAuthPage?: boolean }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [user, setUser] = useState<any>(null);
    const [userProfile, setUserProfile] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const pathname = usePathname();
    const router = useRouter();
    const supabase = createClient();

    const navs: { name: string; link: string }[] = [
        { name: 'HOME', link: '/' },
        { name: 'SHOP', link: '/shop' },
        { name: 'CART', link: '/cart' },
        { name: 'CHECKOUT', link: '/checkout' },
    ];

    useEffect(() => {
        const getUserData = async () => {
            try {
                const { data: { user } } = await supabase.auth.getUser();
                setUser(user);

                if (user) {
                    const { data: profile, error } = await supabase
                        .from('users')
                        .select('full_name')
                        .eq('id', user.id)
                        .single();

                    if (!error && profile) {
                        setUserProfile(profile);
                    }
                }
            } catch (error) {
                console.error('Error getting user data:', error);
            } finally {
                setLoading(false);
            }
        };

        getUserData();

        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
            setUser(session?.user || null);

            if (session?.user) {
                const { data: profile, error } = await supabase
                    .from('users')
                    .select('full_name')
                    .eq('id', session.user.id)
                    .single();

                if (!error && profile) {
                    setUserProfile(profile);
                }
            } else {
                setUserProfile(null);
            }
        });

        return () => subscription.unsubscribe();
    }, [supabase.auth]);

    const handleAuthClick = () => {
        if (user) {
            router.push('/profile');
        } else {
            router.push('/auth');
        }
    };

    const displayName = userProfile?.full_name || user?.email || 'User';

    return (
        <header className="h-[82px] shadow-lg w-full bg-white flex flex-col justify-center items-center py-4 fixed top-0 z-50">
            <div className='h-[50px] px-6 flex justify-between items-center max-w-screen-2xl w-full'>
                <div className='flex items-center'>
                    <div className="text-white w-10 h-10 flex justify-center items-center bg-[#1ABA1A] rounded-2xl">
                        <span className="inline-block -rotate-90 translate-y-2 font-bold">
                            {"("}
                        </span>
                    </div>
                    <h1 className='flex flex-col gap-1 leading-4 my-auto text-black font-bold text-xl ml-2'>
                        SWOO
                        <span className='font-thin'>TECH MART</span>
                    </h1>
                </div>

                <button
                    className="hidden max-[1000px]:block text-2xl text-black"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    ☰
                </button>

                {
                    isAuthPage ? null : (
                        <nav className="max-[1000px]:hidden">
                            <ul className='flex gap-8 text-sm font-semibold'>
                                {navs.map((nav) => (
                                    <li
                                        key={nav.name}
                                        className={`hover:text-green-600 cursor-pointer ${pathname === nav.link ? 'text-green-600' : 'text-black'
                                            }`}
                                    >
                                        <Link href={nav.link} prefetch>
                                            {nav.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    )
                }

                <div className='flex items-center gap-3 max-[1000px]:hidden'>
                    {!isAuthPage && (
                        <>
                            <Link href={'/cart'} className='hover:scale-105 transition w-10 h-10 bg-[#EBEEF6] rounded-full flex justify-center items-center text-black'>
                                <RiShoppingCartLine />
                            </Link>
                            <Link href={'/checkout'} className='hover:scale-105 transition w-10 h-10 bg-[#EBEEF6] rounded-full flex justify-center items-center text-black'>
                                <IoBagCheckOutline />
                            </Link>
                        </>
                    )}
                    <div className="max-[768px]:hidden">
                        <h2 className='text-sm text-black flex flex-col font-semibold'>
                            <span className='text-xs text-[#666666] font-thin'>
                                {user ? 'WELCOME BACK' : 'WELCOME'}
                            </span>
                            {user ? (
                                <div className="flex items-center gap-2">
                                    <span className="hover:underline transition">
                                        {displayName}
                                    </span>
                                </div>
                            ) : (
                                <Link href={'/auth'} className='hover:underline transition'>
                                    LOG IN / REGISTER
                                </Link>
                            )}
                        </h2>
                    </div>
                    {!isAuthPage && (
                        <div className='flex gap-2 ml-4 max-[768px]:hidden'>
                            <button
                                onClick={handleAuthClick}
                                className='hover:scale-105 cursor-pointer transition w-10 h-10 bg-[#EBEEF6] rounded-full flex justify-center items-center text-black'
                            >
                                {user ? <FaUser className="text-[#1ABA1A]" /> : <FaRegUser />}
                            </button>
                        </div>
                    )}
                </div>

            </div>

            {isMenuOpen && (
                <div className="fixed top-[82px] left-0 w-full bg-white shadow-lg max-[1000px]:block hidden">
                    <nav className="p-6">
                        <ul className='flex flex-col gap-4 text-sm font-semibold'>
                            {navs.map((nav) => (
                                <li
                                    key={nav.name}
                                    className={`hover:text-green-600 cursor-pointer py-2 border-b ${pathname === nav.link ? 'text-green-600' : 'text-black'
                                        }`}
                                >
                                    <Link href={nav.link} prefetch onClick={() => setIsMenuOpen(false)}>
                                        {nav.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>
                    <div className='p-6 border-t'>
                        <div className='flex flex-col gap-4'>
                            <div className='flex items-center gap-4'>
                                <div className='hover:scale-105 transition w-10 h-10 bg-[#EBEEF6] rounded-full flex justify-center items-center text-black'>
                                    <IoMdHeartEmpty />
                                </div>
                                <span>Wishlist</span>
                            </div>
                            <div className='flex items-center gap-4'>
                                <div className='hover:scale-105 transition w-10 h-10 bg-[#EBEEF6] rounded-full flex justify-center items-center text-black'>
                                    <RiShoppingCartLine />
                                </div>
                                <span>Cart</span>
                            </div>
                            <div className='flex items-center gap-4'>
                                <div className='hover:scale-105 transition w-10 h-10 bg-[#EBEEF6] rounded-full flex justify-center items-center text-black'>
                                    <IoBagCheckOutline />
                                </div>
                                <span>Orders</span>
                            </div>
                            <div className='flex items-center gap-4 pt-4 border-t'>
                                <h2 className='text-sm text-black flex flex-col font-semibold'>
                                    <span className='text-xs text-[#666666] font-thin'>
                                        {user ? 'WELCOME BACK' : 'WELCOME'}
                                    </span>
                                    {user ? (
                                        <div className="flex flex-col gap-1">
                                            <span>{displayName}</span>
                                        </div>
                                    ) : (
                                        <Link
                                            href={'/auth'}
                                            className='hover:underline transition'
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            LOG IN / REGISTER
                                        </Link>
                                    )}
                                </h2>
                            </div>
                            {user && (
                                <div className='flex items-center gap-4'>
                                    <button
                                        onClick={() => {
                                            handleAuthClick();
                                            setIsMenuOpen(false);
                                        }}
                                        className='hover:scale-105 cursor-pointer transition w-10 h-10 bg-[#EBEEF6] rounded-full flex justify-center items-center text-black'
                                    >
                                        <FaUser className="text-[#1ABA1A]" />
                                    </button>
                                    <span>Profile</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </header>
    )
}