'use client';
import React from 'react';
import Image from 'next/image';
import { IoCheckmarkCircleSharp } from 'react-icons/io5';
import { useRouter } from 'next/navigation';

interface ProductCardProps {
    slug: string;
    image: string;
    title: string;
    price: string;
    hasFreeShipping?: boolean;
    inStock?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({
    slug,
    image,
    title,
    price,
    hasFreeShipping = true,
    inStock = true
}) => {
    const router = useRouter();

    return (
        <div onClick={() => router.push(`/shop/${slug}`)} className="
            min-w-[230px] max-w-[230px]
            bg-gray-100 cursor-pointer 
            hover:scale-105 hover:shadow-2xl rounded-xl p-4 shadow-sm 
            hover:border border-green-400 transition

            max-[1000px]:min-w-[180px]
            max-[1000px]:max-w-[180px]
            max-[1000px]:p-3
        ">
            <div className="
                w-full h-[200px] relative rounded-lg overflow-hidden bg-white flex items-center justify-center
                max-[1000px]:h-[150px]
            ">
                <Image
                    src={image}
                    alt={title}
                    fill
                    className="object-contain"
                />
            </div>

            <div className="flex flex-col text-left pt-4 max-[1000px]:pt-3">
                <p className="text-base font-semibold text-gray-800 max-[1000px]:text-sm truncate">
                    {title}
                </p>

                <p className="text-xl font-bold mt-1 max-[1000px]:text-lg">
                    {price}
                </p>

                {hasFreeShipping && (
                    <span className="
                        text-[#1ABA1A] text-[11px] font-semibold bg-green-100 px-2 py-1 rounded mt-4 w-fit
                        max-[1000px]:mt-2 max-[1000px]:text-[10px] max-[1000px]:px-1.5 max-[1000px]:py-0.5
                    ">
                        FREE SHIPPING
                    </span>
                )}

                {inStock && (
                    <p className="
                        flex items-center gap-1 text-[12px] mt-4 text-gray-600
                        max-[1000px]:text-[10px] max-[1000px]:mt-2
                    ">
                        <IoCheckmarkCircleSharp className="text-[#1ABA1A] text-lg max-[1000px]:text-base" />
                        In Stock
                    </p>
                )}
            </div>
        </div>
    );
};

export default ProductCard;