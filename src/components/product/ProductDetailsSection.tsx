'use client'

interface ProductDetailsSectionProps {
    product: any;
    selectedVariant1: string;
    selectedVariant2: string;
    onVariant1Change: (variant: string) => void;
    onVariant2Change: (variant: string) => void;
}

export default function ProductDetailsSection({ 
    product, 
    selectedVariant1, 
    selectedVariant2, 
    onVariant1Change, 
    onVariant2Change 
}: ProductDetailsSectionProps) {
    const descriptionPoints = product.description?.split('. ').filter((point: string) => point.trim()) || [];
    
    const getVariantPrice = (variant: string) => {
        return product.variant_prices?.[variant] || product.price;
    };

    const getCurrentPrice = () => {
        if (selectedVariant1 && product.variant_prices?.[selectedVariant1]) {
            return product.variant_prices[selectedVariant1];
        }
        return product.price;
    };

    const currentPrice = getCurrentPrice();

    return (
        <div className="lg:col-span-1 flex flex-col gap-6">
            <h1 className="text-2xl font-semibold leading-tight">
                {product.name}
            </h1>

            <div className="text-xl font-bold text-[#1ABA1A]">
                ${currentPrice}
                {product.compare_price && product.compare_price > currentPrice && (
                    <span className="text-lg text-gray-400 line-through ml-2">${product.compare_price}</span>
                )}
            </div>

            {descriptionPoints.length > 0 && (
                <ul className="text-gray-600 space-y-2 text-sm">
                    {descriptionPoints.map((point: string, index: number) => (
                        <li key={index}>• {point.trim()}</li>
                    ))}
                </ul>
            )}

            <div className="flex gap-3">
                {product.free_shipping && (
                    <span className="px-3 py-1 text-xs bg-[#1ABA1A] text-white rounded font-semibold">
                        FREE SHIPPING
                    </span>
                )}
                {product.free_gift && (
                    <span className="px-3 py-1 text-xs bg-red-100 text-red-600 rounded font-semibold">
                        FREE GIFT
                    </span>
                )}
            </div>

            {product.variant_type1_name && product.variant_type1_options?.length > 0 && (
                <div>
                    <div className="font-semibold mb-3 text-gray-800">
                        {product.variant_type1_name.toUpperCase()}: 
                        <span className="text-[#1ABA1A] ml-1">{selectedVariant1}</span>
                    </div>
                    <div className="flex gap-3 flex-wrap">
                        {product.variant_type1_options.map((option: string) => (
                            <div
                                key={option}
                                onClick={() => onVariant1Change(option)}
                                className={`border-2 rounded-xl px-4 py-3 text-sm cursor-pointer transition ${
                                    selectedVariant1 === option
                                        ? "border-[#1ABA1A] bg-green-50"
                                        : "border-gray-200 hover:border-gray-300"
                                }`}
                            >
                                <div className="font-medium">{option}</div>
                                <div className="font-semibold text-[#1ABA1A]">
                                    ${getVariantPrice(option)}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {product.variant_type2_name && product.variant_type2_options?.length > 0 && (
                <div>
                    <div className="font-semibold mb-3 text-gray-800">
                        {product.variant_type2_name.toUpperCase()}: 
                        <span className="text-[#1ABA1A] ml-1">{selectedVariant2}</span>
                    </div>
                    <div className="flex gap-3 flex-wrap">
                        {product.variant_type2_options.map((option: string) => (
                            <div
                                key={option}
                                onClick={() => onVariant2Change(option)}
                                className={`px-4 py-2 border-2 rounded-xl text-sm cursor-pointer transition ${
                                    selectedVariant2 === option
                                        ? "border-[#1ABA1A] bg-green-50 text-[#1ABA1A] font-semibold"
                                        : "border-gray-200 hover:border-gray-300"
                                }`}
                            >
                                {option}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <div className="text-sm text-[#999999] space-y-1">
                <div><span className="font-semibold text-gray-800">SKU:</span> {product.sku}</div>
                <div><span className="font-semibold text-gray-800">CATEGORY:</span> {product.category?.name}</div>
                <div>
                    <span className="font-semibold text-gray-800">BRAND:</span>{" "}
                    <span className="text-[#1ABA1A] cursor-pointer font-semibold">{product.brand}</span>
                </div>
            </div>
        </div>
    );
}