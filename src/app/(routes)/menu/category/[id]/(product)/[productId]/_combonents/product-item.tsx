import SelectorField from "@/app/(routes)/menu/_components/selectorField";
import BasePrice_ExtraPrices from "@/components/basePrice-extraPirces";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import React, { useState } from "react";
import { InitProductState } from "../../../../../../../../../types";
import { useAppDispatch } from "@/hooks/redux";
import { deleteFavorite, postFavorite } from "@/lib/RTK/slices/favorite-slice";
import { postProductToCart } from "@/lib/RTK/slices/cart-slice";
import Image from "next/image";
import { ExtraPricesFields } from "../page";
interface ProductItemProps {
  product: InitProductState;
  isFav: boolean;
}
export default function ProductItem({ product, isFav }: ProductItemProps) {
  const dispatch = useAppDispatch();
  const [extraPricesFields, setExtraPricesFields] = useState<ExtraPricesFields>(
    { size: null, extra_increases_price: [], quantity: "" }
  );
  async function addToFavorite() {
    if (product) {
      if (isFav) {
        dispatch(deleteFavorite(product._id));
      } else {
        dispatch(
          postFavorite({ ...extraPricesFields, product_id: product._id })
        );
      }
    }
  }
  async function addToCart() {
    if (product) {
      dispatch(
        postProductToCart({ ...extraPricesFields, product_id: product._id })
      );
    }
  }
  return (
    <section className="grid  grid-cols-1 gap-8 md:grid-cols-2 text-center md:text-left">
      <div className="md:h-[574px] overflow-hidden">
        <Image
          src={product?.image || ""}
          alt="product image"
          width={1125}
          height={816}
          loading="lazy"
          className="w-full h-full object-cover"
          objectFit="cover"
        />
      </div>
      <div className="m-[48px]">
        <div className="flex flex-col gap-3  border-b pb-8 ">
          <h2 className="text-4xl">{product?.title}</h2>
          <p className="text-[18px] mb-[5px] text-slate-700">
            <BasePrice_ExtraPrices
              extraPricesFields={extraPricesFields}
              base_price={product?.base_price}
            />
          </p>
          <p className="text-[18px] mb-[5px] max-w-[500px] text-slate-700 mx-auto md:mx-0">
            {product?.description +
              "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Id ducimus suscipit tempore cumque minus iusto, odit eos sequi qui temporibus iure numquam error quas laboriosam vero, eligendi minima atque commodi."}
          </p>
          <div>
            <SelectorField
              extraPricesFields={extraPricesFields}
              setExtraPricesFields={setExtraPricesFields}
              data={product || undefined}
            />
          </div>
          <Button
            onClick={addToCart}
            className="text-[18px] rounded-full w-fit mt-2 mx-auto md:mx-0 "
            variant={"green"}
          >
            ADD TO ORDERS
          </Button>
        </div>
        <Button
          onClick={addToFavorite}
          variant={"ghost"}
          className="rounded-full  flex items-center gap-2 mt-6 cursor-pointer"
        >
          <Heart color={isFav ? "red" : "black"} />
          <span className="hidden sm:block">ADD TO FAVORITE</span>
          <span className="sm:hidden block">ADD TO FAV</span>
        </Button>
      </div>
    </section>
  );
}
