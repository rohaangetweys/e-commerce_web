'use client';
import React from 'react';
import Image from 'next/image';
import Button from '@/components/common/Button';

interface BrandNewCardProps {
    slug: string;
    image: string;
    title: string;
    description: string;
}

const BrandNewCard: React.FC<BrandNewCardProps> = ({
    slug,
    image,
    title,
    description
}) => {
    return (
        <div className="min-w-[300px] w-1/4 bg-white rounded-xl overflow-hidden shadow-sm  cursor-default">
            <div 
                className="w-full h-[250px] relative"
            >
                <Image
                    src={image}
                    alt={title}
                    fill
                    className="object-cover"
                />
            </div>

            <div className="p-4">
                <p className="text-lg font-semibold text-wrap">
                    {title}
                </p>
                <p className="text-sm text-gray-500 mt-1 text-wrap">
                    {description}
                </p>

                <Button 
                    variant="outline" 
                    className="mt-4"
                    routeTo={`/shop/${slug}`}
                >
                    SHOP NOW
                </Button>
            </div>
        </div>
    );
};

export default BrandNewCard;