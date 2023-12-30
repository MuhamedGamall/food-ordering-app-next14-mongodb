"use client";
import Categorys from "../../_components/categorys";
import MenuItems from "../../_components/menu-items";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { getCategories } from "@/lib/RTK/slices/categories-slice";
import { getProducts } from "@/lib/RTK/slices/menu-products-slice";

export default function Menu({ params: { id } }: { params: { id: string } }) {
  const { products, loading: productsLoding } = useAppSelector(
    (state) => state.menuProducts
  );
  const { categories, loading: categoryLoading } = useAppSelector(
    (state) => state.catygories
  );
  const dispatch = useAppDispatch();
  const menuChoiced = products.filter(
    (el) => el.category === id || categories[0]._id
  );

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getProducts());
  }, [dispatch]);
  console.log(menuChoiced);

  return (
    <div className="mx-auto px-4 max-w-[85rem]">
      <Categorys categories={categories} loading={categoryLoading} />
      <MenuItems products={products} loading={productsLoding} />
    </div>
  );
}
