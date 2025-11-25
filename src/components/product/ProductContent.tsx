'use client'
import { useState } from 'react';
import SearchSection from '../common/SearchSection';
import Banner from '../common/Banner';
import ProductImageSection from './ProductImageSection';
import ProductDetailsSection from './ProductDetailsSection';
import ProductPurchaseSection from './ProductPurchaseSection';

export default function ProductContent({ product }: { product: any }) {
    const [selectedVariant1, setSelectedVariant1] = useState(product.variant_type1_options?.[0] || '');
    const [selectedVariant2, setSelectedVariant2] = useState(product.variant_type2_options?.[0] || '');

    return (
        <div className="h-full w-full bg-transparent text-black">
            <SearchSection />
            <Banner hasProduct={true} productName={product.name} />
            <div className="bg-white rounded-2xl w-full mt-6 px-8 py-8">
                <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <ProductImageSection product={product} />
                    <ProductDetailsSection 
                        product={product} 
                        selectedVariant1={selectedVariant1}
                        selectedVariant2={selectedVariant2}
                        onVariant1Change={setSelectedVariant1}
                        onVariant2Change={setSelectedVariant2}
                    />
                    <ProductPurchaseSection 
                        product={product}
                        selectedVariant1={selectedVariant1}
                        selectedVariant2={selectedVariant2}
                        onVariant1Change={setSelectedVariant1}
                        onVariant2Change={setSelectedVariant2}
                    />
                </div>
            </div>
        </div>
    );
}