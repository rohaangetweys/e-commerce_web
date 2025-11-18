import React from 'react'
import ProductCard from '../cards/ProductCard'

export default function BestSellerSection() {
    return (
        <div className="bg-white rounded-2xl w-full h-full mt-6 px-8 py-6 shadow-sm">
            <div className="flex items-center gap-12 mb-8">
                <h2 className="text-lg font-semibold cursor-default pb-1">BEST SELLER</h2>
                <h2 className="text-lg font-light text-gray-500 hover:text-black transition cursor-pointer">NEW IN</h2>
                <h2 className="text-lg font-light text-gray-500 hover:text-black transition cursor-pointer">POPULAR</h2>
            </div>

            <div className="w-full h-full overflow-x-auto whitespace-nowrap no-scrollbar">
                <div className="flex gap-6 w-max">
                    {[...Array(6)].map((_, index) => (
                        <ProductCard
                            key={index}
                            image="/category2.png"
                            title="Wireless Headphones"
                            price="$199.00"
                            hasFreeShipping
                            inStock
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}
