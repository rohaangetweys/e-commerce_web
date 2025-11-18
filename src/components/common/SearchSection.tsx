import { FaSearch } from 'react-icons/fa'
import { MdKeyboardArrowDown } from 'react-icons/md'

export default function SearchSection() {
    return (
        <div className="w-full flex items-center px-8 h-[75px] bg-[#1ABA1A] rounded-xl justify-between">
            <div className="bg-white h-11 flex items-center rounded-full w-1/3 px-4">
                <div className="w-60 flex items-center">
                    All Categories <MdKeyboardArrowDown className="ml-2 translate-y-1 inline-block mb-1" />
                </div>
                <input type="text" className="h-full w-full border-l px-4 outline-none" placeholder="Search any product..." />
                <FaSearch className="text-gray-500 text-xl ml-auto" />
            </div>
            <p className="text-white text-sm">FREE SHIPPING OVER $199</p>
            <p className="text-white text-sm">30 DAYS MONEY BACK</p>
            <p className="text-white text-sm">100% SECURE PAYMENT</p>
        </div>
    )
}
