"use client";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { getProducts } from "@/lib/RTK/slices/menu-products-slice";
import Image from "next/image";

import formatPrice from "@/utils/format/format-price";
import { Button } from "@/components/ui/button";
import SelectorField from "./_combonents/selectorField";
import { ExtraPriceState } from "../../../../../../../../types";
import { Heart } from "lucide-react";
import HandleLoader from "@/components/loader";
import {
  deleteFavorite,
  getFavorites,
  postFavorite,
} from "@/lib/RTK/slices/favorite-slice";

export interface ExtraPricesFields {
  size: ExtraPriceState | null;
  extra_increases_price: ExtraPriceState[];
  quantity: string;
}

export default function ProductPage({
  params: { productId },
}: {
  params: { productId: string };
}) {
  const [extraPricesFields, setExtraPricesFields] = useState<ExtraPricesFields>(
    { size: null, extra_increases_price: [], quantity: "" }
  );

  const { products, loading } = useAppSelector((state) => state.menuProducts);
  const { favorites } = useAppSelector((state) => state.favoritesData);

  const dispatch = useAppDispatch();
  const product = products.find((el) => el._id === productId);

  useEffect(() => {
    dispatch(getProducts());
    dispatch(getFavorites());
  }, [dispatch]);

  const isFav = favorites
    .map((el: any) => el.product_id)
    .includes(product?._id);

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

  return (
    <section className="border-b ">
      <div className="grid  grid-cols-1 gap-8 md:grid-cols-2 text-center md:text-left">
        {loading && <HandleLoader />}
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
              {formatPrice(product?.base_price || "")}
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
                loading={loading}
              />
            </div>
            <Button
              className="text-[18px] rounded-full w-fit mt-2 mx-auto md:mx-0 "
              variant={"green"}
            >
              ADD TO ORDER
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
      </div>
    </section>
  );
}
