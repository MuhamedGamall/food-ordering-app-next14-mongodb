import Logo from "@/components/Logo";
import Image from "next/image";
import React from "react";

export default function HeroAcountSection() {
  return (
    <section className=" h-[350px] md:h-[335px] relative">
      <div className="mx-auto max-w-[90rem]  absolute flex  w-[85%] left-[50%] translate-x-[-50%]  h-full">
        <div className="hidden md:flex flex-1 items-center justify-center ">
          <div className="w-56 h-56">
            <Logo color="white" size={"h-full w-full"} />
          </div>
        </div>
        <div className="flex gap-3 flex-col flex-1 items-center justify-center text-white">
          <span className="text-[35px] md:text-[40px] font-bold">
            WANT FREE FOOD, FASTER AND EASIER?
          </span>
          <span className="text-[15px] md:text-[18px] text-slate-100">
            The road to free pizza starts here. Let’s get you signed up quick.
            Then you’ll start earning points for Papa Dough.
          </span>
        </div>
      </div>
      <Image
        src={"/paparewards-bg-thin-3.jpg"}
        alt={"img"}
        width={1000}
        height={1000}
        className="aspect-[5/2] object-cover object-center brightness-[.9] relative z-[-500] h-full w-full"
      />
    </section>
  );
}
