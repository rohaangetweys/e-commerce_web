import React from 'react';
import Image from 'next/image';
import { IoCheckmarkCircleSharp } from 'react-icons/io5';

interface ProductCardProps {
    image: string;
    title: string;
    price: string;
    hasFreeShipping?: boolean;
    inStock?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({
    image,
    title,
    price,
    hasFreeShipping = true,
    inStock = true
}) => {
    return (
        <div className="min-w-[230px] max-w-[230px] bg-gray-50 rounded-xl p-4 shadow-sm hover:shadow-md transition">
            <div className="w-full h-[200px] relative rounded-lg overflow-hidden bg-white flex items-center justify-center">
                <Image
                    src={image}
                    alt={title}
                    fill
                    className="object-contain"
                />
            </div>

            <div className="flex flex-col text-left pt-4">
                <p className="text-base font-semibold text-gray-800">
                    {title}
                </p>
                <p className="text-xl font-bold mt-1">{price}</p>

                {hasFreeShipping && (
                    <span className="text-[#1ABA1A] text-[11px] font-semibold bg-green-100 px-2 py-1 rounded mt-4 w-fit">
                        FREE SHIPPING
                    </span>
                )}

                {inStock && (
                    <p className="flex items-center gap-1 text-[12px] mt-4 text-gray-600">
                        <IoCheckmarkCircleSharp className="text-[#1ABA1A] text-lg" />
                        In Stock
                    </p>
                )}
            </div>
        </div>
    );
};

export default ProductCard;