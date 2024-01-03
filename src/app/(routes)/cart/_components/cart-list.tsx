import formatPrice from "@/utils/format/format-price";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { ExtraPriceState } from "../../../../../types";
import BasePrice_ExtraPrices from "@/components/basePrice-extraPirces";
import totalCartPrice from "@/utils/total-cart-price";

export default function CartList({
  cart,
  onDelete,
}: {
  cart: any;
  onDelete: (id: string) => void;
}) {
  return (
    <section className="flex-[4.5] w-full">
      <ul className="flex flex-col  gap-2 border-t ">
        {cart?.map((el: any) => {
          return (
            <li
              key={el._id}
              className="flex items-start gap-3 border-b py-3 px-1 "
            >
              <Image
                src={el?.image}
                alt="cart image"
                width={200}
                height={200}
                className="w-[80px]  rounded-md"
              />
              <div className=" flex flex-col gap-2 w-full">
                <div className="flex justify-between">
                  <h5>{el?.title}</h5>
                  <p className="text-[18px] ">
                    <BasePrice_ExtraPrices
                      base_price={el?.base_price}
                      extraPricesFields={{
                        size: el?.size,
                        extra_increases_price: el?.extra_increases_price,
                        quantity: el?.quantity,
                      }}
                    />
                  </p>
                </div>
                <p className="text-slate-500">Quantity: {el?.quantity}</p>
                <p className="text-slate-500">Size: {el?.size.name}</p>
                <ul className=" flex items-center  gap-2">
                  <li>
                    <Link
                      href={
                        "/menu/category/" +
                        el?.category?.title +
                        "/" +
                        el?.product_id
                      }
                      className="hover:text-green-950  underline transition text-[#2d5d2a] text-[14px] "
                    >
                      Veiw
                    </Link>
                  </li>
                  <li
                    onClick={() => onDelete(el?._id)}
                    className="hover:text-green-950 underline transition text-[#2d5d2a] text-[14px] cursor-pointer"
                  >
                    Remove
                  </li>
                </ul>
                <div className="flex gap-2 items-center">
                  <p className="text-slate-950">Increases: </p>
                  <ul className="flex items-center gap-x-3 overflow-x-auto max-w-[500px]">
                    {el?.extra_increases_price.length ? (
                      el?.extra_increases_price?.map((xl: ExtraPriceState) => (
                        <li
                          key={xl?.name}
                          className=" flex items-center gap-1 mb-1 px-2 bg-sky-300/20 border border-sky-500 text-sky-950 rounded-full whitespace-nowrap "
                        >
                          <span>{xl?.name} -</span>
                          {formatPrice(xl?.extra_price)}
                        </li>
                      ))
                    ) : (
                      <span className="text-slate-500">No increases</span>
                    )}
                  </ul>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
