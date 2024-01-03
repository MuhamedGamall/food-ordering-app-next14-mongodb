import BasePrice_ExtraPrices from "@/components/basePrice-extraPirces";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import formatPrice from "../../../../utils/format/format-price";

export default function CartCheckout({ cart }: any) {
  const extraPrice = cart
    ?.map((el: any) => el?.extra_increases_price?.map((xl: any) => xl))
    .flat()
    ?.reduce((a: any, c: any) => a + +c?.extra_price, 0);
  const quantity = cart?.reduce((a: any, c: any) => a + +c?.quantity, 0);
  const size = cart?.reduce((a: any, c: any) => a + +c?.size?.extra_price, 0);
  const base_price = cart?.reduce((a: any, c: any) => a + +c?.base_price, 0);
  const total = (extraPrice + size + base_price) * quantity + "";

  return (
    <section className="flex-[2.5] w-full rounded-md p-3 border flex flex-col gap-3  h-fit">
      <Button
        // onClick={backToHome}
        variant={"primary"}
        className=" text-[25px] w-[80%] mx-auto text-white bg-[#e60000] hover:bg-red-700 rounded-full flex items-center gap-3 "
      >
        CHECKOUT
      </Button>

      <Link
        href={"/profile"}
        className="text-center text-[18px] text-[#2A5D2A] underline"
      >
        Edit your address settengs before checkout
      </Link>
      <div className="px-3">
        <div className="flex items-center text-[20px] justify-between ">
          Extras:
          <span className=""> {formatPrice(extraPrice + "")}</span>
        </div>
        <div className="flex items-center text-[20px] justify-between">
          Base price:
          <span> {formatPrice(base_price + "")}</span>
        </div>
      </div>
      <hr />
      <div className="flex items-center justify-between text-[26px] ">
        Total:
        <span> {formatPrice(total)}</span>
      </div>
    </section>
  );
}
