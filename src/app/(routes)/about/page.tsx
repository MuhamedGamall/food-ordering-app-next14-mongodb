import PageHeader from "@/components/page-header";
import Image from "next/image";
import React from "react";

export default function About() {
  return (
    <section className="w-[90%] max-w-[80rem] mx-auto mt-5 p-5">
      <PageHeader title="ABOUT FOOD ORDERING" className="my-5" />
      <div className="sm:h-[300px]  w-full my-2">
        <Image
          src={"/about-hero-works.webp"}
          alt="about-hero-works-image"
          width={1920}
          height={853}
          className=" object-cover sm:object-center  h-full w-full rounded-sm my-4"
        />
      </div>
      <PageHeader title="ABOUT US" className="my-5 sm:text-[30px] text-[30px]">
        <h3 className="font-semibold  text-[21px]">
          BUILDING A FOUNDATION OF QUALITY
        </h3>
      </PageHeader>
      <ul className="flex flex-col gap-4 text-[#626262] [&>li>p]:eading-8">
        <li>
          <p>
            The secret to success is much like the secret to making a better
            pizza - the more you put into it, the more you get out of it. Our
            pizza family is as hungry for perfection today as we were when we
            first opened our doors more than 30 years ago. And we&apos;re driven
            to be the best at making innovative new products and recipes.
          </p>
        </li>
        <li>
          <p>
            Quality is at our core. It’s the foundation we started with, from
            the first Papa Johns pizza that was made in a broom closet in
            Jeffersonville, IN, to now more than 5,000 locations in 45 countries
            and territories around the world.
          </p>
        </li>
        <li>
          <p>
            We don’t use cheap and more processed ingredients. Whether it&apos;s
            our signature sauce, toppings, our original fresh dough, or even the
            box itself, we invest in our ingredients to ensure that we always
            give you the finest quality pizza.
          </p>
        </li>
        <li>
          <p>
            For you, it’s not just a better pizza. It’s a family gathering,
            memorable birthday, work celebration or simply a great meal. It’s
            our goal to make sure you always have the best ingredients for every
            occasion.
          </p>
        </li>
      </ul>
      <PageHeader
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
