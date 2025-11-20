import FeaturedSection from "@/components/home/FeatuedSection";
import HeroSection from "@/components/home/HeroSection";
import BrandNewSection from "@/components/home/BrandNewSection";
import CategorySection from "@/components/home/CategorySection";
import CashbackSection from "@/components/home/CashbackSection";
import BestSellerSection from "@/components/home/BestSellerSection";
import { categoriesService } from '@/utils/supabase/categories';

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

export default async function Home() {
  const categories = await categoriesService.getCategories();

  const topCategories = categories.slice(0, 4).map(category => ({
    imgSrc: category.image_url,
    label: category.name
  }));

  return (
    <div className="h-full w-full bg-transparent text-black">
      <HeroSection />
      <div className="flex gap-4 w-full h-full py-4 max-md:flex-col">
        <FeaturedSection label={false} title="FEATURED BRANDS" items={featuredBrand} />
        <FeaturedSection label={true} title="TOP CATEGORIES" items={topCategories} />
      </div>
      <BestSellerSection />
      <BrandNewSection />
      <CashbackSection />
      <CategorySection />
    </div>
  );
}