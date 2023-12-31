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
  const findCategoryId = categories.find((el) => id === el.title)?._id;
  const menuChoiced = products.filter(
    (el) => el?.category === (findCategoryId || categories[0]?._id)
  );
  const menuTitle = (id === "_" ? categories[0]?.title : id) || "";
  useEffect(() => {
    dispatch(getCategories());
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <div className="mx-auto px-4 max-w-[80rem]">
      <Categorys categories={categories} loading={categoryLoading} />
      <div className=" md:max-w-[90%] mx-auto px-2 py-3 text-[45px] ">
        <div className=" max-w-[80rem] ">{`${menuTitle}`.toUpperCase()}</div>
      </div>
      <MenuItems products={menuChoiced} loading={productsLoding} />
    </div>
  );
}
