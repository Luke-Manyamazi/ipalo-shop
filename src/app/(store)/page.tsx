import { HeroSection } from "@/components/home/HeroSection";
import { FeaturedCategories } from "@/components/home/FeaturedCategories";
import { BrandStory } from "@/components/home/BrandStory";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { TrustBadges } from "@/components/home/TrustBadges";
import { NewsletterSection } from "@/components/home/NewsletterSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustBadges />
      <FeaturedCategories />
      <FeaturedProducts />
      <BrandStory />
      <NewsletterSection />
    </>
  );
}
