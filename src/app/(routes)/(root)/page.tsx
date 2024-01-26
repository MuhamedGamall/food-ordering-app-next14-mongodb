import BestSelles from "./_components/best-selles-section";
import HeroSection from "./_components/hero-section";
import CategorySection from "./_components/category-section";
import ContactSection from "./_components/contact-section";
import About from "./_components/about-section";

export default function Home() {
  return (
    <div className="">
      <HeroSection />
      <div className="w-[90%] max-w-[80rem] mx-auto mt-5 p-5">
        <BestSelles />
      </div>
      <div className="w-[90%] max-w-[80rem] mx-auto mt-5 p-5">
        <CategorySection />
      </div>
      <div className="w-[80%] max-w-[50rem] mx-auto text-center">
        <About />
      </div>
      <div className="w-[90%] max-w-[80rem] mx-auto mt-5 p-5">
        <ContactSection />
      </div>
    </div>
  );
}
