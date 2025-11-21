import Image from 'next/image'
import Button from '../common/Button'
import SearchSection from '../common/SearchSection';
import { categoriesService } from '@/utils/supabase/categories';
import Link from 'next/link';

export default async function HeroSection() {
    const categories = await categoriesService.getCategories();

    const featuredCategories = categories.slice(0, 12);
    const saleCategory = "SALE 40% OFF";

    return (
        <>
            <SearchSection />
            <div className="w-full mt-4 md:h-[492px] flex max-md:flex-col items-center justify-between gap-4">
                <div className="py-5 h-full px-14 rounded-xl w-1/4 bg-white max-md:hidden">
                    <h3 className="text-[#F1352B] text-sm font-bold">{saleCategory}</h3>
                    {featuredCategories.map((category, index) => (
                        <div key={category.id} className="mt-4">
                            <Link
                                href={`/shop?category=${encodeURIComponent(category.slug)}`}
                                className={`text-sm text-black ${index <= 2 ? "hover:text-[#F1352B] cursor-pointer" : "cursor-default"}`}
                            >
                                {category.name}
                            </Link>

                        </div>
                    ))}
                </div>

                <div className="h-full flex flex-col md:w-1/2 w-full gap-4">
                    <div className="w-full md:h-2/3 h-full py-10 px-15 relative overflow-hidden flex flex-col justify-between rounded-xl max-md:px-8 max-md:gap-4">
                        <Image
                            src="/headphones.png"
                            alt="Homepage Banner"
                            fill
                            className="object-cover"
                        />

                        <h1 className="relative flex flex-col z-10 text-white text-4xl font-bold max-md:text-3xl">
                            Noise Cancelling
                            <span className="font-thin text-2xl max-md:text-xl">Headphones</span>
                        </h1>

                        <p className="text-xs ml-4 z-10 relative text-white max-md:text-[10px]">
                            Boso Over-Ear Headphone <br />
                            Wifi, Voice Assistant, <br />
                            Low latency game mode
                        </p>

                        <Button variant="primary" size="sm" className="relative z-10">BUY NOW</Button>
                    </div>

                    <div className="flex gap-4 h-1/3 w-full">
                        <div className="w-1/2 h-full p-5 relative overflow-hidden flex flex-col justify-between rounded-xl max-md:gap-4">
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

                        <div className="w-1/2 h-full p-5 relative overflow-hidden flex flex-col justify-between rounded-xl max-md:gap-4">
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

                <div className="h-full md:w-1/4 w-full gap-4 flex flex-col">
                    <div className="w-full h-1/2 p-5 items-end relative overflow-hidden flex flex-col justify-between rounded-xl max-md:gap-4">
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

                    <div className="w-full h-1/2 p-5 relative overflow-hidden flex flex-col justify-between rounded-xl max-md:gap-4">
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