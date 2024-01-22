"use client";
import Categorys from "../../_components/categorys";
import MenuItems from "../../_components/menu-items";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { getCategories } from "@/lib/RTK/slices/categories-slice";
import { getProducts } from "@/lib/RTK/slices/menu-products-slice";
import { getCart } from "@/lib/RTK/slices/cart-slice";
import PageHeader from "@/components/page-header";
import HandleLoader from "@/components/loader";

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
    (el) => el?.category.category_id === (findCategoryId || categories[0]?._id)
  );
  const menuTitle = (id === "_" ? categories[0]?.title : id) || "";

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getProducts());
    dispatch(getCart());
  }, [dispatch]);

  return (
    <section className="mx-auto px-4 max-w-[80rem]">
      {(productsLoding || categoryLoading) && <HandleLoader />}
      <Categorys categories={categories} loading={categoryLoading} />
      <div className=" md:max-w-[90%] mx-auto ">
        <div className=" max-w-[80rem] ">
          <PageHeader title={menuTitle.toUpperCase()} className="my-5"/>
        </div>
      </div>
      <MenuItems products={menuChoiced} loading={productsLoding} />
    </section>
  );
}
