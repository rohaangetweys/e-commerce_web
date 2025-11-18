export default function ProductDetailsSection() {
    return (
        <div className="lg:col-span-1 flex flex-col gap-6">
            <div className="flex items-center gap-2 text-sm text-[#999999] font-semibold">
                <span>★★★★★</span>
                <span>(5 Reviews)</span>
            </div>

            <h1 className="text-2xl font-semibold leading-tight">
                Somseng Galatero X6 Ultra LTE 4G/128GB, Black Smartphone
            </h1>

            <div className="text-xl font-bold text-[#1ABA1A]">$569.00 - $609.00</div>

            <ul className="text-gray-600 space-y-2 text-sm">
                <li>• Intel LGA 1700 Socket: Supports 13th & 12th Gen Intel Core</li>
                <li>• DDR5 Compatible: 4*SMD DIMMs with XMP 3.0 Memory</li>
                <li>• Commanding Power Design: Twin 16+1+2 Phases Digital VRM</li>
            </ul>

            <div className="flex gap-3">
                <span className="px-3 py-1 text-xs bg-[#1ABA1A] text-white rounded font-semibold">
                    FREE SHIPPING
                </span>
                <span className="px-3 py-1 text-xs bg-red-100 text-red-600 rounded font-semibold">
                    FREE GIFT
                </span>
            </div>

            <div>
                <div className="font-semibold mb-3 text-gray-800">COLOR: <span className="text-[#1ABA1A]">Midnight Blue</span></div>
                <div className="flex gap-3">
                    {["Midnight Blue", "Deep Purple", "Space Black"].map((color, index) => (
                        <div
                            key={color}
                            className={`border-2 rounded-xl px-4 py-3 text-sm cursor-pointer transition ${index === 0
                                ? "border-[#1ABA1A] bg-green-50"
                                : "border-gray-200 hover:border-gray-300"}`}
                        >
                            <div className="font-medium">{color}</div>
                            <div className="font-semibold text-[#1ABA1A]">$569.00</div>
                        </div>
                    ))}
                </div>
            </div>

            <div>
                <div className="font-semibold mb-3 text-gray-800">MEMORY SIZE: <span className="text-[#1ABA1A]">128GB</span></div>
                <div className="flex gap-3 flex-wrap">
                    {["64GB", "128GB", "256GB", "512GB"].map((size) => (
                        <div
                            key={size}
                            className={`px-4 py-2 border-2 rounded-xl text-sm cursor-pointer transition ${size === "128GB"
                                ? "border-[#1ABA1A] bg-green-50 text-[#1ABA1A] font-semibold"
                                : "border-gray-200 hover:border-gray-300"}`}
                        >
                            {size}
                        </div>
                    ))}
                </div>
            </div>

            <div className="text-sm text-[#999999] space-y-1">
                <div><span className="font-semibold text-gray-800">SKU:</span> ABC025168</div>
                <div><span className="font-semibold text-gray-800">CATEGORY:</span> Cell Phones & Tablets</div>
                <div>
                    <span className="font-semibold text-gray-800">BRAND:</span>{" "}
                    <span className="text-[#1ABA1A] cursor-pointer font-semibold">sumsong</span>
                </div>
            </div>
        </div>
    );
}