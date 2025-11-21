import Image from "next/image";

export default function ProductImageSection({ product }: { product: any }) {
    const allImages = [product.main_img_url, ...(product.image_urls || [])].filter(Boolean);
    
    return (
        <div className="lg:col-span-1">
            <div className="relative w-full h-[400px] bg-gray-50 rounded-2xl flex items-center justify-center border">
                <Image
                    src={product.main_img_url}
                    alt={product.name}
                    fill
                    className="object-contain"
                />
                {product.is_new && (
                    <span className="absolute top-4 left-4 bg-black text-white px-3 py-1 text-xs rounded font-semibold">
                        NEW
                    </span>
                )}
            </div>

            {allImages.length > 1 && (
                <div className="flex gap-4 mt-4">
                    {allImages.slice(0, 3).map((image, index) => (
                        <div key={index} className="w-20 h-20 bg-gray-50 border rounded-xl flex items-center justify-center cursor-pointer hover:border-[#1ABA1A] transition">
                            <Image 
                                src={image} 
                                alt={`${product.name} thumbnail ${index + 1}`} 
                                width={50} 
                                height={50} 
                                className="object-contain"
                            />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}