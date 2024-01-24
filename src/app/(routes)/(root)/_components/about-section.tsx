import React from "react";
import AboutSection from "../../_comonents/about-section";
import PageHeader from "@/components/page-header";
import Link from "next/link";
import { ArrowRight, ArrowRightCircle, MoveRight } from "lucide-react";

export default function About() {
  return (
    <section>
      <div className="w-fit mx-auto my-8 ">
        <PageHeader
          title="ABOUT US"
          className="text-[19px] sm:text-[25px] mb-1"
        />
        <span className="w-[70%] bg-black h-[2px] mx-auto block"></span>
      </div>
      <AboutSection />
      <Link
        href={"/about"}
        className=" flex items-center underline my-3 text-black text-[20px] gap-x-2 w-fit mx-auto"
      >
        Learn more <MoveRight className="h-6 w-6" />
      </Link>
    </section>
  );
}
