'use client'
import Link from 'next/link';
import { IoMdHeartEmpty } from 'react-icons/io'
import { IoBagCheckOutline } from 'react-icons/io5'
import { RiShoppingCartLine } from 'react-icons/ri'
import { useState } from 'react';

export default function Header({ isAuthPage }: { isAuthPage?: boolean }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navs: { name: string; link: string }[] = [
        { name: 'HOME', link: '/' },
        { name: 'SHOP', link: '/shop' },
        { name: 'PRODUCTS', link: '/products' },
        { name: 'CONTACT', link: '/contact' },
    ]

    return (
        <header className='h-[82px] w-full bg-white flex flex-col justify-center items-center py-4 fixed top-0 z-50'>
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
                            <ul className='flex gap-8 text-black text-sm font-semibold'>
                                {navs.map((nav) => (
                                    <li key={nav.name} className='hover:text-green-600 cursor-pointer'>
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
                    {
                        isAuthPage ? null : (
                            <>
                                <div className='w-10 h-10 bg-[#EBEEF6] rounded-full flex justify-center items-center text-black'>
                                    <IoMdHeartEmpty />
                                </div>
                                <Link href={'/cart'} className='w-10 h-10 bg-[#EBEEF6] rounded-full flex justify-center items-center text-black'>
                                    <RiShoppingCartLine />
                                </Link>
                                <div className='w-10 h-10 bg-[#EBEEF6] rounded-full flex justify-center items-center text-black'>
                                    <IoBagCheckOutline />
                                </div>
                            </>
                        )
                    }

                    <div className="max-[768px]:hidden">
                        <h2 className='text-sm text-black flex flex-col font-semibold'>
                            <span className='text-xs text-[#666666] font-thin'>WELCOME</span>
                            <Link href={'/login'}>
                            LOG IN / REGISTER
                            </Link>
                        </h2>
                    </div>

                    {
                        isAuthPage ? null : (
                            <div className='flex gap-2 ml-4 max-[768px]:hidden'>
                                <div className='w-10 h-10 bg-[#EBEEF6] rounded-full flex justify-center items-center text-black'></div>
                                <h2 className='text-sm text-black flex flex-col font-semibold'>
                                    <span className='text-xs text-[#666666] font-thin'>CART</span>
                                    $50, 000
                                </h2>
                            </div>
                        )
                    }
                </div>

                {isMenuOpen && (
                    <div className="fixed top-[82px] left-0 w-full bg-white shadow-lg max-[1000px]:block hidden">
                        <nav className="p-6">
                            <ul className='flex flex-col gap-4 text-black text-sm font-semibold'>
                                {navs.map((nav) => (
                                    <li key={nav.name} className='hover:text-green-600 cursor-pointer py-2 border-b'>
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
                                    <div className='w-10 h-10 bg-[#EBEEF6] rounded-full flex justify-center items-center text-black'>
                                        <IoMdHeartEmpty />
                                    </div>
                                    <span>Wishlist</span>
                                </div>
                                <div className='flex items-center gap-4'>
                                    <div className='w-10 h-10 bg-[#EBEEF6] rounded-full flex justify-center items-center text-black'>
                                        <RiShoppingCartLine />
                                    </div>
                                    <span>Cart</span>
                                </div>
                                <div className='flex items-center gap-4'>
                                    <div className='w-10 h-10 bg-[#EBEEF6] rounded-full flex justify-center items-center text-black'>
                                        <IoBagCheckOutline />
                                    </div>
                                    <span>Orders</span>
                                </div>
                                <div className='flex items-center gap-4 pt-4 border-t'>
                                    <h2 className='text-sm text-black flex flex-col font-semibold'>
                                        <span className='text-xs text-[#666666] font-thin'>WELCOME</span>
                                        LOG IN / REGISTER
                                    </h2>
                                </div>
                                <div className='flex items-center gap-4'>
                                    <div className='w-10 h-10 bg-[#EBEEF6] rounded-full flex justify-center items-center text-black'></div>
                                    <h2 className='text-sm text-black flex flex-col font-semibold'>
                                        <span className='text-xs text-[#666666] font-thin'>CART</span>
                                        $50, 000
                                    </h2>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </header>
    )
}