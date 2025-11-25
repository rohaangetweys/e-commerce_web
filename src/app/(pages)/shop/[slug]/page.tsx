import { productsService } from '@/utils/supabase/products';
import { notFound } from 'next/navigation';
import ProductContent from "@/components/product/ProductContent";

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