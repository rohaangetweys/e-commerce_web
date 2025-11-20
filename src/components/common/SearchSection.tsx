'use client'
import { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { useApp } from '@/contexts/AppContext';

export default function SearchSection() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('All Categories');
    const { categories } = useApp();

    const allCategories = [
        'All Categories',
        ...categories.map(category => category.name)
    ];

    return (
        <div className="w-full flex flex-col md:flex-row items-center px-4 md:px-8 h-auto md:h-[75px] gap-3 md:gap-0 bg-[#1ABA1A] rounded-xl justify-between py-4 md:py-0 relative">
            
            <div className="bg-white h-11 flex items-center rounded-full w-full md:w-1/3 px-4 relative">
                <div
                    className="w-60 flex items-center cursor-pointer"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                    {selectedCategory} 
                    <MdKeyboardArrowDown className="ml-2 translate-y-1 inline-block mb-1" />
                </div>

                {isDropdownOpen && (
                    <ul className="absolute top-12 left-0 w-60 bg-white border rounded shadow-lg z-50 max-h-60 overflow-auto">
                        {allCategories.map((category) => (
                            <li
                                key={category}
                                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                onClick={() => {
                                    setSelectedCategory(category);
                                    setIsDropdownOpen(false);
                                }}
                            >
                                {category}
                            </li>
                        ))}
                    </ul>
                )}

                <input 
                    type="text" 
                    className="h-full w-full border-l px-4 outline-none" 
                    placeholder="Search any product..." 
                />
                <FaSearch className="text-gray-500 text-xl ml-auto" />
            </div>

            <p className="text-white text-sm max-md:hidden">FREE SHIPPING OVER $199</p>
            <p className="text-white text-sm max-md:hidden">30 DAYS MONEY BACK</p>
            <p className="text-white text-sm max-md:hidden">100% SECURE PAYMENT</p>
        </div>
    );
}