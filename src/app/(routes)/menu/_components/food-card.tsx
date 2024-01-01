import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { InitProductState } from "../../../../../types";
import { usePathname } from "next/navigation";
import formatPrice from "@/utils/format/format-price";
import {
  deleteProductFromCart,
  getCart,
  postProductToCart,
} from "@/lib/RTK/slices/products-cart";
import { getProducts } from "@/lib/RTK/slices/menu-products-slice";
import { getFavorites } from "@/lib/RTK/slices/favorite-slice";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";

export default function FoodCard({
  item,
  isAdded,
}: {
  item: InitProductState;
  isAdded: boolean;
}) {
  const pathname = usePathname();
  const truncateText = (text: string, limit: number) => {
    return text.length > limit ? text.substring(0, limit) + "..." : text;
  };

  const { products } = useAppSelector((state) => state.menuProducts);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getProducts());
    dispatch(getCart());
  }, [dispatch]);

  async function addToCart(id: string) {
    if (products) {
      if (isAdded) {
        dispatch(deleteProductFromCart(id));
      } else dispatch(postProductToCart({ product_id: id }));
    }
  }
  return (
    <div className="w-fit min-h-[250px] bg-white border mx-auto  shadow-card-shadow transition rounded-[5px] overflow-hidden ">
      <Link href={pathname + "/" + item._id} className="">
        <Image
          src={item.image}
          alt="product image"
          objectFit="cover"
          width={300}
          height={250}
          className="w-full rounded-[5px] transition"
        />
      </Link>
      <div className=" flex flex-col  p px-5 py-2">
        <div className="px-2 flex items-center justify-between">
          <div className=" text-[22px] max-w-[80%] break-all">
            {truncateText(item.title, 50)}
          </div>
          <Link
            href={pathname + "/" + item._id}
            className="hover:text-sky-950 underline transition text-sky-700 text-[18px]  w-fit"
          >
            Ditails
          </Link>
        </div>
        <div
          className="text-[17px] text-slate-800 max-w-[80%] break-all
          px-2 "
        >
          {formatPrice(item.base_price)}
        </div>
        <div
          className="text-[15px] text-slate-600 max-w-[80%] break-all
          px-2 "
        >
          {truncateText(
            item.description +
              "American Cheese, Grilled Chicken Breast, Onions, Mozzarella, Oregano with BBQ Sauce",
            100
          )}
        </div>
        <Button
          onClick={() => addToCart(item._id)}
          className="bg-[#2d5d2a] mt-[40px] hover:bg-green-900 rounded-md text-white text-[18px] h-[30px] p-5 mb-3 "
        >
          {isAdded ? "REMOVE FROM ORDERS" : "ADD TO ORDERS"}
        </Button>
      </div>
    </div>
  );
}
