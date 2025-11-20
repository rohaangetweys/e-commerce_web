import CategoryCard from '../cards/CategoryCard'
import { categoriesService } from '@/utils/supabase/categories'
import { productsService } from '@/utils/supabase/products'

export default async function CategorySection() {
    const [categories, products] = await Promise.all([
        categoriesService.getCategories(),
        productsService.getProducts()
    ])

    const featuredCategories = categories.slice(0, 3).map(category => {
        const categoryProducts = products.filter(product => product.category_id === category.id)
        const featuredProducts = categoryProducts.slice(0, 4).map(product => ({
            image: product.main_img_url,
            name: product.name,
            itemCount: `${product.stock_quantity} in stock`
        }))

        return {
            title: category.name.toUpperCase(),
            promoImage: category.image_url,
            items: featuredProducts
        }
    })

    return (
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            {featuredCategories.map((category, i) => (
                <CategoryCard
                    key={category.title}
                    title={category.title}
                    promoImage={category.promoImage}
                    items={category.items}
                />
            ))}
        </div>
    )
}