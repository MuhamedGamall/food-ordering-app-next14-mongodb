import BasePrice_ExtraPrices from "@/components/basePrice-extraPirces";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import formatPrice from "../../../../utils/format/format-price";
import useProfile from "@/hooks/user-profile";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import totalCartPrice from "@/utils/total-cart-price";

export default function CartCheckout({ cart }: any) {
  const { data } = useProfile();
  const router = useRouter();

  const { totalPrice, extraPrice, basePrice, sizePrice } = totalCartPrice(cart);

  async function proceedToCheckout() {
    // if (!Object.values({ ...data }).every((el) => !!el)) {
      const { streat_address, phone, city, country, postal_code } = data;
      if (cart.length > 0) {
        const response = await axios.post("/api/checkout", {
          cart,
          address: { streat_address, phone, city, country, postal_code },
        });
        const link = await response.data;
        router.push(link);
      } else toast.error("Your cart is empty");
    // } else{ 
    //   toast.error("Your profile data is not compleated !!");}
    
  }

  const productPrice =
    (+cart?.[3]?.base_price +
      +cart?.[3]?.size?.extra_price +
      cart?.[3]?.extra_increases_price.reduce(
        (a: any, c: any) => a + +c?.extra_price,
        0
      )) *
    +cart?.[3]?.quantity;
  console.log(productPrice);

  return (
    <section className="flex-[2.5] w-full rounded-md p-3 border flex flex-col gap-3  h-fit">
      <Button
        onClick={proceedToCheckout}
        variant={"primary"}
        className=" text-[25px] w-[80%] mx-auto  text-white bg-[#e60000] hover:bg-red-700 rounded-full flex items-center gap-3 "
      >
        CHECKOUT
      </Button>

      <Link
        href={"/profile"}
        className="text-center mb-5 text-[18px] text-[#2A5D2A] underline"
      >
        Edit your address settengs before checkout
      </Link>
      <div className="px-3">
        <div className="flex items-center text-[20px] justify-between ">
          Extras:
          <span className=""> {formatPrice(extraPrice + "")}</span>
        </div>
        <div className="flex items-center text-[20px] justify-between mb-5">
          Base price:
          <span> {formatPrice(basePrice + sizePrice + "")}</span>
        </div>
      </div>
      <hr />
      <div className="flex items-center justify-between text-[26px] ">
        Total:
        <span> {formatPrice(totalPrice + "")}</span>
      </div>
    </section>
  );
}
