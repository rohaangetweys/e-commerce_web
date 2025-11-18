import Image from 'next/image'
import React from 'react'
import Button from '../common/Button'
import { MdKeyboardArrowDown } from 'react-icons/md';
import { FaSearch } from 'react-icons/fa';

export default function HeroSection() {
    const typeList: String[] = [
        "SALE 40% OFF", "Laptops", "PC & Computers", "Cell Phones", "Tablets",
        "Gaming & VR", "Networking", "Cameras", "Sounds", "Office",
        "Storage, USB", "Accessories", "Clearance"
    ];

    return (
        <>
            {/* Search Section */}
            <div className="w-full flex items-center px-8 h-[75px] bg-[#1ABA1A] rounded-xl justify-between">
                <div className="bg-white h-11 flex items-center rounded-full w-1/3 px-4">
                    <div className="w-60 flex items-center">
                        All Categories <MdKeyboardArrowDown className="ml-2 translate-y-1 inline-block mb-1" />
                    </div>
                    <input type="text" className="h-full w-full border-l px-4 outline-none" placeholder="Search any product..." />
                    <FaSearch className="text-gray-500 text-xl ml-auto" />
                </div>
                <p className="text-white text-sm">FREE SHIPPING OVER $199</p>
                <p className="text-white text-sm">30 DAYS MONEY BACK</p>
                <p className="text-white text-sm">100% SECURE PAYMENT</p>
            </div>

            <div className="w-full mt-4 h-[492px] flex items-center justify-between gap-4">
                <div className="py-5 px-14 rounded-xl w-1/4 bg-white">
                    <h3 className="text-[#F1352B] text-sm font-bold">SALE 40% OFF</h3>
                    {typeList.slice(1).map((type, index) => (
                        <div key={index} className="mt-4">
                            <p className="text-sm text-black hover:text-[#F1352B] cursor-pointer">{type}</p>
                        </div>
                    ))}
                </div>

                <div className="h-full flex flex-col w-1/2 gap-4">
                    {/* card1 */}
                    <div className="w-full h-2/3 py-10 px-15 relative overflow-hidden flex flex-col justify-between rounded-xl">
                        <Image
                            src="/headphones.png"
                            alt="Homepage Banner"
                            fill
                            className="object-cover"
                        />

                        <h1 className="relative flex flex-col z-10 text-white text-4xl font-bold">
                            Noise Cancelling
                            <span className="font-thin text-2xl">Headphones</span>
                        </h1>

                        <p className="text-xs ml-4 z-10 relative text-white">
                            Boso Over-Ear Headphone <br />
                            Wifi, Voice Assistant, <br />
                            Low latency game mode
                        </p>

                        <Button variant="primary" size="sm" className="relative z-10">BUY NOW</Button>
                    </div>

                    <div className="flex gap-4 h-1/3 w-full">
                        {/* card2 */}
                        <div className="w-1/2 h-full p-5 relative overflow-hidden flex flex-col justify-between rounded-xl">
                            <Image
                                src="/playstation.png"
                                alt="Homepage Banner"
                                fill
                                className="object-cover"
                            />

                            <h1 className="relative z-10 text-black text-[15px] font-semibold">
                                Sono Playgo 5 <br />
                                from $569
                            </h1>

                            <Button variant="secondary" size="sm" className="relative z-10">BUY NOW</Button>
                        </div>

                        {/* card3 */}
                        <div className="w-1/2 h-full p-5 relative overflow-hidden flex flex-col justify-between rounded-xl">
                            <Image
                                src="/keyboard.png"
                                alt="Homepage Banner"
                                fill
                                className="object-cover"
                            />

                            <h1 className="relative z-10 text-white text-[15px] font-semibold">
                                Logitek Bluetooth <br />
                                <span className="text-[#FFC107]">Keyboard</span>
                            </h1>

                            <Button variant="secondary" size="sm" className="relative z-10">BUY NOW</Button>
                        </div>
                    </div>
                </div>

                <div className="h-full w-1/4 gap-4 flex flex-col">
                    <div className="w-full h-1/2 p-5 items-end relative overflow-hidden flex flex-col justify-between rounded-xl">
                        <Image
                            src="/watch.png"
                            alt="Homepage Banner"
                            fill
                            className="object-cover"
                        />

                        <h1 className="relative z-10 text-black text-[10px] font-semibold">
                            XOMIA
                        </h1>

                        <h2 className="relative z-10 text-black text-xl font-bold">
                            Sport Water <br />
                            Resistance <br />
                            Watch
                        </h2>

                        <Button variant="dark" size="sm" className="relative z-10 mb-5">BUY NOW</Button>
                    </div>

                    <div className="w-full h-1/2 p-5 relative overflow-hidden flex flex-col justify-between rounded-xl">
                        <Image
                            src="/camera.png"
                            alt="Homepage Banner"
                            fill
                            className="object-cover"
                        />

                        <h1 className="relative z-10 text-white text-2xl uppercase">
                            <span className="font-bold">OKODo</span><br />
                            hero 11+ <br />
                            black
                        </h1>

                        <Button variant="dark" size="sm" className="relative z-10 mb-5">BUY NOW</Button>
                    </div>
                </div>
            </div>
        </>
    )
}
