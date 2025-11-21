import ProductCard from '../cards/ProductCard'
import { productsService } from '@/utils/supabase/products';

export default async function BestSellerSection() {
    const products = await productsService.getProducts();
    const bestSellerProducts = products.slice(0, 6);

    return (
        <div className="bg-white rounded-2xl w-full mt-6 px-4 md:px-8 py-6 shadow-sm">
            <div className="flex items-center gap-6 md:gap-12 mb-8 overflow-x-auto no-scrollbar">
                <h2 className="text-lg font-semibold cursor-default pb-1">BEST SELLER</h2>
            </div>

            <div className="w-full h-[420px] overflow-x-auto whitespace-nowrap no-scrollbar">
                <div className="flex gap-6 py-3 px-2 w-max">
                    {bestSellerProducts.map((product) => (
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
            </div>
        </div>
    )
}