import BrandNewCard from '../cards/BrandNewCard'
import { productsService } from '@/utils/supabase/products'

export default async function BrandNewSection() {
    const products = await productsService.getProducts();

    const latestProducts = products
        .filter(product => product.is_new)
        .slice(0, 4)
        .map(product => ({
            image: product.main_img_url,
            title: product.name,
            description: product.description?.split('\n')[0] || 'Check out this amazing new product!',
            slug: product.slug
        }));

    return (
        <div className="bg-white rounded-2xl w-full mt-6 px-8 py-8">
            <h2 className="text-lg font-semibold cursor-default mb-6">BRAND NEW FOR YOU</h2>

            <div className="overflow-x-auto whitespace-nowrap no-scrollbar">
                <div className="flex gap-6 w-full">
                    {latestProducts.map((item, i) => (
                        <BrandNewCard
                            slug={item.slug}
                            key={i}
                            image={item.image}
                            title={item.title}
                            description={item.description}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}