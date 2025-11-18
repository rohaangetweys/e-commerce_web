import FeaturedSection from "@/components/home/FeatuedSection";
import HeroSection from "@/components/home/HeroSection";
import BrandNewSection from "@/components/home/BrandNewSection";
import CategorySection from "@/components/home/CategorySection";
import CashbackSection from "@/components/home/CashbackSection";
import BestSellerSection from "@/components/home/BestSellerSection";

const featuredBrand = [
  { imgSrc: "/brand1.png", label: "none" },
  { imgSrc: "/brand2.png", label: "none" },
  { imgSrc: "/brand3.png", label: "none" },
  { imgSrc: "/brand4.png", label: "none" },
  { imgSrc: "/brand5.png", label: "none" },
  { imgSrc: "/brand6.png", label: "none" },
  { imgSrc: "/brand7.png", label: "none" },
  { imgSrc: "/brand8.png", label: "none" },
];

const categories = [
  { imgSrc: "/category1.png", label: "Laptops" },
  { imgSrc: "/category2.png", label: "PC Gaming" },
  { imgSrc: "/category3.png", label: "Headphones" },
  { imgSrc: "/category4.png", label: "Monitors" },
];


export default function Home() {
  return (
    <div className="h-full w-full bg-transparent text-black">
      <HeroSection />
      <div className="flex gap-4 w-full h-full py-4">
        <FeaturedSection label={false} title="FEATURED BRANDS" items={featuredBrand} />
        <FeaturedSection label={true} title="TOP CATEGORIES" items={categories} />
      </div>
      <BestSellerSection />
      <BrandNewSection />
      <CashbackSection />
      <CategorySection />
    </div>
  );
}