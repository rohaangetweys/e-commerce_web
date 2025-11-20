import React from 'react';
import Image from 'next/image';

interface CategoryItem {
    image: string;
    name: string;
    itemCount: string;
}

interface CategoryCardProps {
    title: string;
    promoImage: string;
    items: CategoryItem[];
}

const CategoryCard: React.FC<CategoryCardProps> = ({
    title,
    promoImage,
    items
}) => {
    return (
        <div className="bg-white rounded-2xl p-6 hover:shadow-md transition">
            <div className="w-full h-[200px] rounded-xl overflow-hidden bg-gray-100 relative mb-6">
                <Image
                    src={promoImage}
                    alt={`${title} Promo`}
                    fill
                    className="object-cover"
                />
            </div>

            <hr className="border-gray-200 mb-6" />

            <div className="grid grid-cols-2 gap-4 text-center">
                {items.map((item, index) => (
                    <div key={index} className="flex flex-col items-center">
                        <div className="w-20 h-20 rounded-full bg-gray-100 relative overflow-hidden flex items-center justify-center mb-2">
                            <Image
                                src={item.image}
                                alt={item.name}
                                fill
                                className="object-contain p-3"
                            />
                        </div>
                        <p className="font-semibold text-sm">{item.name}</p>
                        <p className="text-xs text-gray-500">{item.itemCount}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CategoryCard;