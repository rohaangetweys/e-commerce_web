'use client'
import Banner from "@/components/common/Banner";
import SearchSection from "@/components/common/SearchSection";
import { useState } from "react";
import ProductImageSection from "@/components/product/ProductImageSection";
import ProductDetailsSection from "@/components/product/ProductDetailsSection";
import ProductPurchaseSection from "@/components/product/ProductPurchaseSection";

export default function ProductPage() {
    const [qty, setQty] = useState(1);
    const total = 609 * qty;

    return (
        <div className="h-full w-full bg-transparent text-black">
            <SearchSection />
            <Banner />
            <div className="bg-white rounded-2xl w-full mt-6 px-8 py-8">
                <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <ProductImageSection />
                    <ProductDetailsSection />
                    <ProductPurchaseSection qty={qty} setQty={setQty} total={total} />
                </div>
            </div>
        </div>
    );
}