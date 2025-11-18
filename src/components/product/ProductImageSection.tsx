import Image from "next/image";

export default function ProductImageSection() {
    return (
        <div className="lg:col-span-1">
            <div className="relative w-full h-[400px] bg-gray-50 rounded-2xl flex items-center justify-center border">
                <Image
                    src="/category1.png"
                    alt="phone"
                    width={300}
                    height={300}
                    className="object-contain"
                />
                <span className="absolute top-4 left-4 bg-black text-white px-3 py-1 text-xs rounded font-semibold">
                    NEW
                </span>
            </div>

            <div className="flex gap-4 mt-4">
                {[1, 2, 3].map((item) => (
                    <div key={item} className="w-20 h-20 bg-gray-50 border rounded-xl flex items-center justify-center cursor-pointer hover:border-[#1ABA1A] transition">
                        <Image src="/category1.png" alt={`Thumbnail ${item}`} width={50} height={50} />
                    </div>
                ))}
            </div>
        </div>
    );
}