import React from 'react'
import { IoMdHeartEmpty } from 'react-icons/io'
import { IoBagCheckOutline } from 'react-icons/io5'
import { RiShoppingCartLine } from 'react-icons/ri'

export default function Header() {
    return (
        <header className='h-[82px] w-full bg-white flex flex-col justify-between py-4 px-8 rounded-b-xl fixed top-0 z-50'>
            <div className='h-[50px] flex justify-between items-center'>
                <div className='flex'>
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

                <nav>
                    <ul className='flex gap-8 text-black text-sm font-semibold'>
                        <li>HOME</li>
                        <li>PAGES</li>
                        <li>PRODUCTS</li>
                        <li>CONTACT</li>
                    </ul>
                </nav>

                <div className='flex items-center gap-3'>
                    <div className='w-10 h-10 bg-[#EBEEF6] rounded-full flex justify-center items-center text-black'>
                        <IoMdHeartEmpty />
                    </div>
                    <div className='w-10 h-10 bg-[#EBEEF6] rounded-full flex justify-center items-center text-black'>
                        <RiShoppingCartLine />
                    </div>
                    <div className='w-10 h-10 bg-[#EBEEF6] rounded-full flex justify-center items-center text-black'>
                        <IoBagCheckOutline />
                    </div>

                    <div>
                        <h2 className='text-sm text-black flex flex-col font-semibold'>
                            <span className='text-xs text-[#666666] font-thin'>WELCOME</span>
                            LOG IN / REGISTER
                        </h2>
                    </div>

                    <div className='flex gap-2 ml-4'>
                        <div className='w-10 h-10 bg-[#EBEEF6] rounded-full flex justify-center items-center text-black'></div>
                        <h2 className='text-sm text-black flex flex-col font-semibold'>
                            <span className='text-xs text-[#666666] font-thin'>CART</span>
                            $50, 000
                        </h2>
                    </div>
                </div>
            </div>
        </header>
    )
}
