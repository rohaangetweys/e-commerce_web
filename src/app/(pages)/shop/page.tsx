import ProductCard from '@/components/cards/ProductCard'
import SearchSection from '@/components/common/SearchSection'
import BrandNewSection from '@/components/home/BrandNewSection'
import Link from 'next/link'
import React from 'react'
import { IoIosArrowForward } from 'react-icons/io'

const products = [
    {
        id: 1,
        image: '/category1.png',
        title: 'Wireless Bluetooth Headphones',
        price: '$79.99',
        hasFreeShipping: true,
        inStock: true
    },
    {
        id: 2,
        image: '/category2.png',
        title: 'Smart Fitness Watch',
        price: '$129.99',
        hasFreeShipping: true,
        inStock: true
    },
    {
        id: 3,
        image: '/category3.png',
        title: 'USB-C Fast Charger',
        price: '$24.99',
        hasFreeShipping: false,
        inStock: true
    },
    {
        id: 4,
        image: '/category4.png',
        title: 'Laptop Backpack',
        price: '$49.99',
        hasFreeShipping: true,
        inStock: true
    },
    {
        id: 5,
        image: '/keyboard.png',
        title: 'Wireless Mouse',
        price: '$29.99',
        hasFreeShipping: true,
        inStock: false
    },
    {
        id: 6,
        image: '/gamingcard.png',
        title: 'Smartphone Case',
        price: '$15.99',
        hasFreeShipping: true,
        inStock: true
    },
    {
        id: 7,
        image: '/headphones.png',
        title: 'Portable Speaker',
        price: '$89.99',
        hasFreeShipping: true,
        inStock: true
    },
    {
        id: 8,
        image: '/images/product8.jpg',
        title: 'Tablet Stand',
        price: '$19.99',
        hasFreeShipping: false,
        inStock: true
    },
    {
        id: 9,
        image: '/category1.png',
        title: 'Wireless Bluetooth Headphones',
        price: '$79.99',
        hasFreeShipping: true,
        inStock: true
    },
    {
        id: 10,
        image: '/category2.png',
        title: 'Smart Fitness Watch',
        price: '$129.99',
        hasFreeShipping: true,
        inStock: true
    },
    {
        id: 11,
        image: '/category3.png',
        title: 'USB-C Fast Charger',
        price: '$24.99',
        hasFreeShipping: false,
        inStock: true
    },
    {
        id: 12,
        image: '/category4.png',
        title: 'Laptop Backpack',
        price: '$49.99',
        hasFreeShipping: true,
        inStock: true
    },
    {
        id: 13,
        image: '/keyboard.png',
        title: 'Wireless Mouse',
        price: '$29.99',
        hasFreeShipping: true,
        inStock: false
    },
    {
        id: 14,
        image: '/gamingcard.png',
        title: 'Smartphone Case',
        price: '$15.99',
        hasFreeShipping: true,
        inStock: true
    },
    {
        id: 15,
        image: '/headphones.png',
        title: 'Portable Speaker',
        price: '$89.99',
        hasFreeShipping: true,
        inStock: true
    },
    {
        id: 16,
        image: '/images/product8.jpg',
        title: 'Tablet Stand',
        price: '$19.99',
        hasFreeShipping: false,
        inStock: true
    }
]

export default function ShopPage() {
    return (
        <div className="h-full w-full bg-transparent text-black">
            <SearchSection />

            {/* Breadcrumb */}
            <div className='h-20 w-full bg-white rounded-2xl mt-6 flex items-center px-8 gap-2'>
                <Link href='/' className='text-sm text-[#999999] hover:underline font-semibold tracking-wide'>
                    Home
                </Link>
                <IoIosArrowForward className='text-[#999999]' />
                <Link href='/shop' className='text-sm text-[#999999] hover:underline font-semibold tracking-wide'>
                    Shop
                </Link>
            </div>

            <BrandNewSection />

            {/* Main Shop Section */}
            <div className="bg-white rounded-2xl w-full mt-6 px-8 py-8">
                {/* Header Section */}
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-lg font-semibold cursor-default">ALL PRODUCTS</h2>
                    <div className="flex items-center gap-4">
                        <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1ABA1A]">
                            <option>Sort by: Featured</option>
                            <option>Price: Low to High</option>
                            <option>Price: High to Low</option>
                            <option>Newest First</option>
                        </select>
                        <div className="text-sm text-gray-600">
                            {products.length} products
                        </div>
                    </div>
                </div>

                {/* Products Grid */}
                <div className="flex flex-wrap w-full gap-y-6 justify-between">
                    {products.map((product) => (
                        <ProductCard
                            key={product.id}
                            image={product.image}
                            title={product.title}
                            price={product.price}
                            hasFreeShipping={product.hasFreeShipping}
                            inStock={product.inStock}
                        />
                    ))}
                </div>

                {/* Load More Button */}
                <div className="flex justify-center mt-8">
                    <button className="bg-[#1ABA1A] text-white px-8 py-3 rounded-full font-semibold hover:bg-green-600 transition-colors text-sm">
                        LOAD MORE PRODUCTS
                    </button>
                </div>
            </div>
        </div>
    )
}