'use client'
import { useSearchParams, useRouter } from 'next/navigation'
import { Category } from '@/utils/supabase/categories'

interface ShopFiltersProps {
    categories: Category[]
    selectedCategory: string
    sortBy: string
    totalProducts: number
    currentPage: number
    totalPages: number
}

export default function ShopFilters({
    categories,
    selectedCategory,
    sortBy,
    totalProducts
}: ShopFiltersProps) {
    const searchParams = useSearchParams()
    const router = useRouter()

    const createQueryString = (name: string, value: string) => {
        const params = new URLSearchParams(searchParams.toString())

        if (value === 'All Categories' && name === 'category') {
            params.delete('category')
        } else if (value === 'featured' && name === 'sort') {
            params.delete('sort')
        } else {
            params.set(name, value)
        }

        if (name !== 'page') {
            params.delete('page')
        }

        return params.toString()
    }

    const handleCategoryChange = (category: string) => {
        const queryString = createQueryString('category', category)
        router.push(`/shop?${queryString}`, { scroll: false })
    }

    const handleSortChange = (sort: string) => {
        const queryString = createQueryString('sort', sort)
        router.push(`/shop?${queryString}`, { scroll: false })
    }

    return (
        <div className="
            flex justify-between items-center mb-6
            max-[1000px]:flex-col max-[1000px]:items-start max-[1000px]:gap-3
        ">
            <h2 className="text-lg font-semibold cursor-default max-[1000px]:text-base">
                ALL PRODUCTS
            </h2>

            <div className="flex items-center gap-4 max-[1000px]:w-full max-[1000px]:justify-between">
                <select
                    value={selectedCategory}
                    onChange={(e) => handleCategoryChange(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
                >
                    <option value="All Categories">All Categories</option>

                    {categories.map(category => (
                        <option key={category.id} value={category.slug}>
                            {category.name}
                        </option>
                    ))}
                </select>


                <select
                    value={sortBy}
                    onChange={(e) => handleSortChange(e.target.value)}
                    className="
                        border border-gray-300 rounded-lg px-3 py-2 text-sm 
                        focus:outline-none focus:ring-2 focus:ring-[#1ABA1A]
                        max-[1000px]:text-xs max-[1000px]:px-2 max-[1000px]:py-1.5
                    "
                >
                    <option value="featured">Sort by: Featured</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="newest">Newest First</option>
                </select>

                <div className="text-sm text-gray-600 max-[1000px]:text-xs">
                    {totalProducts} products
                </div>
            </div>
        </div>
    )
}