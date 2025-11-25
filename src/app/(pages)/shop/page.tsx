import ProductCard from '@/components/cards/ProductCard'
import Banner from '@/components/common/Banner'
import Button from '@/components/common/Button'
import SearchSection from '@/components/common/SearchSection'
import BrandNewSection from '@/components/home/BrandNewSection'
import { productsService } from '@/utils/supabase/products'
import { categoriesService } from '@/utils/supabase/categories'
import ShopFilters from '@/components/shop/ShopFilters'
import Link from 'next/link'

interface SearchParams {
    category?: string
    sort?: string
    page?: string
}

interface ShopPageProps {
    searchParams: Promise<SearchParams>
}

export default async function ShopPage({ searchParams }: ShopPageProps) {
    const params = await searchParams

    const [products, categories] = await Promise.all([
        productsService.getProducts(),
        categoriesService.getCategories()
    ])

    const selectedCategory = params.category || 'All Categories'
    const sortBy = params.sort || 'featured'
    const currentPage = parseInt(params.page || '1')
    const productsPerPage = 12

    let filteredProducts = products.filter(product => {
        if (selectedCategory === 'All Categories') return true

        const category = categories.find(cat => cat.id === product.category_id)
        return category?.slug === selectedCategory
    })


    filteredProducts = filteredProducts.sort((a, b) => {
        switch (sortBy) {
            case 'price-low':
                return a.price - b.price
            case 'price-high':
                return b.price - a.price
            case 'newest':
                return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
            default:
                return 0
        }
    })

    const totalPages = Math.ceil(filteredProducts.length / productsPerPage)
    const startIndex = (currentPage - 1) * productsPerPage
    const productsToShow = filteredProducts.slice(startIndex, startIndex + productsPerPage)

    return (
        <div className="h-full w-full bg-transparent text-black">
            <SearchSection />
            <Banner />
            <BrandNewSection />

            <div className="
                bg-white rounded-2xl w-full mt-6 px-8 py-8
                max-[1000px]:px-4 max-[1000px]:py-6
            ">
                <ShopFilters
                    categories={categories}
                    selectedCategory={selectedCategory}
                    sortBy={sortBy}
                    totalProducts={filteredProducts.length}
                    currentPage={currentPage}
                    totalPages={totalPages}
                />

                <div className="
                    flex flex-wrap w-full gap-y-6 justify-between
                    max-[1000px]:justify-center max-[1000px]:gap-x-4 max-sm:gap-x-0
                ">
                    {productsToShow.map((product) => (
                        <ProductCard
                            slug={product.slug}
                            key={product.id}
                            image={product.main_img_url}
                            title={product.name}
                            price={`$${product.price}`}
                            hasFreeShipping={product.free_shipping}
                            inStock={product.stock_quantity > 0}
                        />
                    ))}
                </div>

                {totalPages > 1 && (
                    <div className="flex justify-center items-center gap-4 mt-8">
                        {currentPage > 1 && (
                            <Link
                                href={`/shop?${new URLSearchParams({
                                    category: selectedCategory,
                                    sort: sortBy,
                                    page: (currentPage - 1).toString()
                                })}`}
                            >
                                <Button variant="outline" size="sm">
                                    Previous
                                </Button>
                            </Link>
                        )}

                        <span className="text-sm text-gray-600">
                            Page {currentPage} of {totalPages}
                        </span>

                        {currentPage < totalPages && (
                            <Link
                                href={`/shop?${new URLSearchParams({
                                    category: selectedCategory,
                                    sort: sortBy,
                                    page: (currentPage + 1).toString()
                                })}`}
                            >
                                <Button variant="outline" size="sm">
                                    Next
                                </Button>
                            </Link>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}