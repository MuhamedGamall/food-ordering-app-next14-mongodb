import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { InitProductState } from "../../../../../types";
import { usePathname } from "next/navigation";
import formatPrice from "@/utils/format/format-price";
import { getCart, postProductToCart } from "@/lib/RTK/slices/cart-slice";
import { getProducts } from "@/lib/RTK/slices/menu-products-slice";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import SelectorField from "./selectorField";
import BasePrice_ExtraPrices from "../../../../components/basePrice-extraPirces";
import { ExtraPricesFields } from "../category/[id]/(product)/[productId]/page";
interface ProductDialogProps {
  item: InitProductState;
  setIsClicked: Dispatch<SetStateAction<{ check: boolean; id: string }>>;
}

export default function ProductDialog({
  item,
  setIsClicked,
}: ProductDialogProps) {
  const [extraPricesFields, setExtraPricesFields] = useState<ExtraPricesFields>(
    { size: null, extra_increases_price: [], quantity: "" }
  );
  const dispatch = useAppDispatch();

  const addToCart = () => {
    if (item) {
      setIsClicked({ check: false, id: "" });
      dispatch(
        postProductToCart({ ...extraPricesFields, product_id: item._id })
      );
    }
  };
  return (
    <>
      <div className="flex  flex-col gap-8  text-center overflow-y-auto py-10 px-4">
        <div className="max-w-[350px] mx-auto ">
          <Image
            src={item?.image || ""}
            alt="product image"
            width={350}
            height={350}
            loading="lazy"
            className="w-full h-full object-cover rounded-md"
            objectFit="cover"
          />
        </div>
        <div className="">
          <div className="flex flex-col gap-3 ">
            <h2 className="text-4xl">{item?.title}</h2>
            <p className="text-[18px] mb-[5px] text-slate-700">
              <BasePrice_ExtraPrices
                extraPricesFields={extraPricesFields}
                base_price={item?.base_price}
              />
            </p>
            <p className="text-[18px] mb-[5px] max-w-[500px] text-slate-700 mx-auto md:mx-0">
              {item?.description +
                "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Id ducimus suscipit temporeLorem ipsum dolor, sit amet consectetur adipisicing elit. Id ducimus suscipit tempore cumque minus iusto, odit eos sequi qui temporibus iure numquam error quas laboriosam vero, eligendi minima atque commodi."}
            </p>
            <div>
              <SelectorField
                extraPricesFields={extraPricesFields}
                setExtraPricesFields={setExtraPricesFields}
                data={item}
              />
            </div>
            <div className="flex items-center gap-5">
              <Button
                onClick={addToCart}
                className="text-[18px] rounded-full  mt-2 mx-auto md:mx-0 "
                variant={"green"}
              >
                ADD TO ORDERS
              </Button>
              <Button
                onClick={() => setIsClicked({ check: false, id: "" })}
                className="text-[18px] rounded-full hover:text-red-700  mt-2 mx-auto md:mx-0 "
                variant={"ghost"}
              >
                CANCEL
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
