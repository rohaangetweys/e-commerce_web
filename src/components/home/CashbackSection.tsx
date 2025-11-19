import Image from 'next/image'

export default function CashbackSection() {
    return (
        <div className="flex items-center gap-4 mt-6">
            <div className="w-1/2 relative h-[200px] rounded-2xl overflow-hidden max-md:w-full">
                <Image
                    src="/cashbackbanner.png"
                    alt="Cashback Banner"
                    fill
                    className="object-cover rounded-2xl"
                />

                <div className="absolute top-10 right-20 z-20 text-white max-md:right-6">
                    <h2 className="text-[40px] text-[#FFE400] font-bold">10% Back</h2>
                    <p className="text-white text-sm mt-3">Earn 10% Cash back on <br />Swootech. Learn How</p>
                </div>
            </div>
            <div className="w-1/2 relative h-[200px] rounded-2xl overflow-hidden max-md:hidden">
                <Image
                    src="/cashbackbanner.png"
                    alt="Cashback Banner"
                    fill
                    className="object-cover rounded-2xl"
                />

                <div className="absolute top-10 right-20 z-20 text-white">
                    <h2 className="text-[40px] text-[#FFE400] font-bold">10% Back</h2>
                    <p className="text-white text-sm mt-3">Earn 10% Cash back on <br />Swootech. Learn How</p>
                </div>
            </div>
        </div>
    )
}
