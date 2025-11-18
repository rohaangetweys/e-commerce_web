'use client'
import Banner from "@/components/common/Banner";
import SearchSection from "@/components/common/SearchSection";
import Button from "@/components/common/Button";
import Image from "next/image";
import { useState } from "react";

export default function ProductPage() {
    const [qty, setQty] = useState(1);
    const total = 609 * qty;

    return (
        <div className="h-full w-full bg-transparent text-black">
            <SearchSection />
            <Banner />

            <div className="bg-white rounded-2xl w-full mt-6 px-8 py-8">
                <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Image Gallery Section */}
                    <div className="lg:col-span-1">
                        <div className="relative w-full h-[400px] bg-gray-50 rounded-2xl flex items-center justify-center border">
                            <Image
                                src="/category1.png"
                                alt="phone"
                                width={300}
                                height={300}
                                className="object-contain"
                            />
                            <span className="absolute top-4 left-4 bg-black text-white px-3 py-1 text-xs rounded font-semibold">
                                NEW
                            </span>
                        </div>

                        <div className="flex gap-4 mt-4">
                            {[1, 2, 3].map((item) => (
                                <div key={item} className="w-20 h-20 bg-gray-50 border rounded-xl flex items-center justify-center cursor-pointer hover:border-[#1ABA1A] transition">
                                    <Image src="/category1.png" alt={`Thumbnail ${item}`} width={50} height={50} />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Product Details Section */}
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

                        {/* Color Selection */}
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

                        {/* Memory Selection */}
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

                        {/* Product Meta */}
                        <div className="text-sm text-[#999999] space-y-1">
                            <div><span className="font-semibold text-gray-800">SKU:</span> ABC025168</div>
                            <div><span className="font-semibold text-gray-800">CATEGORY:</span> Cell Phones & Tablets</div>
                            <div>
                                <span className="font-semibold text-gray-800">BRAND:</span>{" "}
                                <span className="text-[#1ABA1A] cursor-pointer font-semibold">sumsong</span>
                            </div>
                        </div>

                    </div>

                    {/* Purchase Section */}
                    <div className="lg:col-span-1">
                        <div className="bg-gray-50 rounded-2xl p-6 w-full border border-black/10">
                            <div className="text-[#999999] text-sm mb-2 font-semibold">TOTAL PRICE:</div>
                            <div className="text-3xl font-bold text-[#1ABA1A]">${total.toFixed(2)}</div>

                            {/* Quantity Selector */}
                            <div className="flex items-center gap-5 mt-6">
                                <button
                                    onClick={() => qty > 1 && setQty(qty - 1)}
                                    className="w-10 h-10 rounded-full bg-white border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition font-semibold"
                                >
                                    -
                                </button>
                                <div className="text-lg font-semibold w-8 text-center">{qty}</div>
                                <button
                                    onClick={() => setQty(qty + 1)}
                                    className="w-10 h-10 rounded-full bg-white border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition font-semibold"
                                >
                                    +
                                </button>
                            </div>

                            {/* Action Buttons */}
                            <div className="space-y-3 mt-6">
                                <Button variant="success" size="lg" className="w-full py-3 text-base font-semibold">
                                    ADD TO CART
                                </Button>
                                
                                <Button variant="outline" size="lg" className="w-full py-3 text-base font-semibold border-yellow-400 bg-yellow-400 hover:bg-yellow-500 text-black">
                                    BUY WITH PAYPAL
                                </Button>
                            </div>

                            <div className="text-xs text-[#999999] mt-4 text-center font-semibold">Guaranteed Safe Checkout</div>

                            {/* Payment Icons */}
                            <div className="flex justify-center gap-3 mt-3">
                                {[1, 2, 3, 4].map((item) => (
                                    <div key={item} className="w-10 h-6 bg-gray-200 rounded flex items-center justify-center">
                                        <span className="text-xs font-semibold text-gray-500">Pay</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Quick Order Section */}
                        <div className="bg-gray-50 rounded-2xl p-6 mt-6 border border-black/10 text-center">
                            <div className="font-semibold text-gray-800 mb-2">Quick Order 24/7</div>
                            <div className="text-xl font-bold text-[#1ABA1A]">(025) 3886 25 16</div>
                            <div className="text-sm text-[#999999] mt-3">
                                Ships from <span className="font-semibold text-gray-800">United States</span>
                            </div>
                        </div>

                        {/* Additional Info */}
                        <div className="bg-gray-50 rounded-2xl p-6 mt-6 border border-black/10">
                            <div className="space-y-3 text-sm">
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-[#1ABA1A] rounded-full"></div>
                                    <span className="font-semibold">30 Days Money Back Guarantee</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-[#1ABA1A] rounded-full"></div>
                                    <span className="font-semibold">Free Shipping Over $199</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-[#1ABA1A] rounded-full"></div>
                                    <span className="font-semibold">Secure Payment</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}