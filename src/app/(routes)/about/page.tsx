import SectionHeader from "@/components/section-header";
import Image from "next/image";
import React from "react";
import AboutSection from "../_comonents/about-section";

export default function About() {
  return (
    <section className="w-[90%] max-w-[80rem] mx-auto mt-5 p-5">
      <SectionHeader title="ABOUT FOOD ORDERING" className="my-5" />
      <div className="sm:h-[300px]  w-full my-2">
        <Image
          src={"/about-hero-works.webp"}
          alt="about-hero-works-image"
          width={1920}
          height={853}    loading="lazy"
          className=" object-cover sm:object-center  h-full w-full rounded-sm my-4"
        />
      </div>
      <SectionHeader
        title="ABOUT US"
        className="my-5 sm:text-[30px] text-[30px]"
      >
        <h3 className="font-semibold  text-[21px]">
          BUILDING A FOUNDATION OF QUALITY
        </h3>
      </SectionHeader>
      <AboutSection />
      <SectionHeader
        title="OUR VALUES, THE WAY WE CARRY OUT OUR PURPOSE:"
        className="mt-5 mb-2 sm:text-[23px] text-[23px] "
      />
      <ul className="flex flex-col gap-3 [&>li>p]:text-[#626262]">
        <li>
          <strong>EVERYONE BELONGS</strong>
          <p>Diversity, Equity, Inclusion & Teamwork</p>
        </li>
        <li>
          <strong>EDO THE RIGHT THING</strong>
          <p>Integrity, Character and Community</p>
        </li>
        <li>
          <strong>PEOPLE FIRST</strong>
          <p>Customer and Team Member Focus</p>
        </li>
        <li>
          <strong>INNOVATE TO WIN</strong>
          <p>Think Differently and Lead Change</p>
        </li>
        <li>
          <strong>HAVE FUN</strong>
          <p>It’s Pizza, It Has To Be Fun!</p>
        </li>
      </ul>
    </section>
  );
}
