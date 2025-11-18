import React from "react";
import Image from "next/image";

type Item = {
    imgSrc: string;
    label: string;
};

type Props = {
    title: string;
    items: Item[];
    label: boolean;
};

const FeaturedSection: React.FC<Props> = ({ title, items, label }) => {
    return (
        <div className="w-full px-[30px] py-5 bg-white rounded-xl shadow-md h-[250px] flex-1">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">{title}</h2>
                <span className="text-sm text-gray-500 cursor-pointer">View All</span>
            </div>


            <div className="flex flex-wrap gap-2 h-full justify-evenly">
                {items.map((item, index) => (
                    <div
                        key={index}
                        className="flex flex-col items-center justify-center w-1/5"
                    >
                        <div className={`${label ? "w-32 h-32" : "w-16 h-16"}  relative`}>
                            <Image
                                src={item.imgSrc}
                                alt={item.label}
                                fill
                                style={{ objectFit: "contain" }}
                            />
                        </div>
                        {
                            label && <span className="text-sm mt-2 text-center">{item.label}</span>
                        }
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FeaturedSection;
