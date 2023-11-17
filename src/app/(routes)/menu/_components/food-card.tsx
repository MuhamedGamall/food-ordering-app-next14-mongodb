import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function FoodCard() {
  return (
    <div className="w-fit min-h-[250px] p-1 bg-white border hover:bg-slate-100 hover:shadow-card-shadow transition rounded-[5px] overflow-hidden ">
      <Link href={""} className=" block ">
        <Image
          src={"/hero/pizza.png"}
          alt="food card"
          objectFit="cover"
          width={300}
          height={300}
          className="w-full filter rounded-[5px] hover:scale-[1.2] hover:rotate-[-6deg]  transition"
        />
      </Link>
      <div className=" flex flex-col gap-4">
        <div className="text-[22px]  px-2 ">title here</div>

        <Button className="bg-[#2d5d2a] mt-auto hover:bg-[#222d21] rounded-full text-white text-[15px] h-[30px] w-[90px]  mb-2 mx-1">
          ORDER NOW
        </Button>
      </div>
    </div>
  );
}
