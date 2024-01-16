"use client";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { getProducts } from "@/lib/RTK/slices/menu-products-slice";

import { ExtraPriceState } from "../../../../../../../../types";

import HandleLoader from "@/components/loader";
import {

  getFavorites,

} from "@/lib/RTK/slices/favorite-slice";

import ProductItem from "./_combonents/product-item";

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
  const { products, loading } = useAppSelector((state) => state.menuProducts);
  const { favorites } = useAppSelector((state) => state.favoritesData);

  const dispatch = useAppDispatch();
  const product = products.filter((el) => el._id === productId)[0];

  useEffect(() => {
    dispatch(getProducts());
    dispatch(getFavorites());
  }, [dispatch]);

  const isFav = favorites
    .map((el: any) => el.product_id)
    .includes(product?._id);

  return (
    <main className="border-b ">
      {loading && <HandleLoader />}

      <ProductItem product={product} isFav={isFav} />
    </main>
  );
}
