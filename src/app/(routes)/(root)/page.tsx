import PageHeader from "@/components/page-header";
import AboutSection from "../_comonents/about-section";
import BestSelles from "./_components/best-selles-section";
import HeroSection from "./_components/hero-section";
import CategorySection from "./_components/category-section";

export default function Home() {
  return (
    <div className="">
      <HeroSection />
      <div className="w-[90%] max-w-[80rem] mx-auto mt-5 p-5">
        <BestSelles />
      </div>
      <div className="w-[80%] max-w-[50rem] mx-auto text-center">
      <div className="w-fit mx-auto mb-5 ">
        <PageHeader
          title="ABOUT US"
          className="sm:text-[25px] text-[30px] mb-1"
        />
        <span className="w-[70%] bg-black h-[2px] mx-auto block"></span>
      </div>
        <AboutSection />
      </div>
      <div className="w-[90%] max-w-[80rem] mx-auto mt-5 p-5">
        <CategorySection />
      </div>
    </div>
  );
}
