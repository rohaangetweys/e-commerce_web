import Link from 'next/link'
import Button from '@/components/common/Button'
import SearchSection from '@/components/common/SearchSection'
import Banner from '@/components/common/Banner'
import { HiOutlineEmojiSad } from 'react-icons/hi'

export default function NotFound() {
    return (
        <div className="h-full w-full bg-transparent text-black">
            <SearchSection />
            <Banner />

            <div className="bg-white rounded-2xl w-full mt-6 px-8 py-16 text-center">
                <div className="max-w-2xl mx-auto">
                    <div className="text-[120px] font-bold text-gray-200 leading-none mb-4">
                        404
                    </div>

                    <h1 className="text-3xl font-bold text-gray-800 mb-4">
                        Oops! Page Not Found
                    </h1>

                    <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
                        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
                    </p>

                    <div className="mb-8">
                        <div className="w-64 h-64 mx-auto bg-gray-100 rounded-full flex items-center justify-center">
                            <HiOutlineEmojiSad className="w-32 h-32 text-gray-400" />
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
                        <Link href="/">
                            <Button variant="success" size="lg">
                                Go Back Home
                            </Button>
                        </Link>

                        <Link href="/shop">
                            <Button variant="outline" size="lg">
                                Continue Shopping
                            </Button>
                        </Link>
                    </div>

                    <div className="bg-gray-50 rounded-xl p-6 max-w-md mx-auto">
                        <h3 className="text-lg font-semibold text-gray-800 mb-3">
                            Can't find what you're looking for?
                        </h3>
                        <p className="text-gray-600 mb-4 text-sm">
                            Try searching our store for products
                        </p>
                        <Link href="/shop">
                            <Button variant="dark" size="sm" className="w-full">
                                Browse All Products
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}