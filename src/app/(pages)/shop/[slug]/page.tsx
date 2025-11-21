import Banner from "@/components/common/Banner";
import SearchSection from "@/components/common/SearchSection";
import ProductImageSection from "@/components/product/ProductImageSection";
import ProductDetailsSection from "@/components/product/ProductDetailsSection";
import ProductPurchaseSection from "@/components/product/ProductPurchaseSection";
import { productsService } from '@/utils/supabase/products';
import { notFound } from 'next/navigation';

interface ProductPageProps {
    params: Promise<{
        slug: string;
    }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
    const { slug } = await params;
    const products = await productsService.getProducts();
    const product = products.find(p => p.slug === slug);

    if (!product) {
        notFound();
    }

    return (
        <ProductContent product={product} />
    );
}

function ProductContent({ product }: { product: any }) {
    return (
        <div className="h-full w-full bg-transparent text-black">
            <SearchSection />
            <Banner hasProduct={true} productName={product.name} />
            <div className="bg-white rounded-2xl w-full mt-6 px-8 py-8">
                <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <ProductImageSection product={product} />
                    <ProductDetailsSection product={product} />
                    <ProductPurchaseSection product={product} />
                </div>
            </div>
        </div>
    );
}