import Navbar from "@/components/Navbar";
import Hero from "@/components/home-page/Hero";
import Footer from "@/components/Footer";
import AboutSection from "@/components/home-page/About";
import Categories from "@/components/home-page/Categories";
import FeaturedProducts from "@/components/home-page/FeaturedProducts";
import SaleSection from "@/components/home-page/SaleSection";
import Testimonials from "@/components/home-page/Testimonials";

export default function Home() {
  return (
    <main>
      <Hero />
      <Categories/>
      <FeaturedProducts/>
      <AboutSection/>
      <SaleSection/>
      <Testimonials/>
    </main>
  );
}