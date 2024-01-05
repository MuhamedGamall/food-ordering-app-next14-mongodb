"use client";

import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { getProducts } from "@/lib/RTK/slices/menu-products-slice";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { DataTable } from "./(table)/table-products";
import { getCategories } from "@/lib/RTK/slices/categories-slice";
import { AlertOctagon } from "lucide-react";

export default function AllProducts() {
  const session = useSession();
  const { products ,loading} = useAppSelector((state) => state.menuProducts);
  const { categories } = useAppSelector((state) => state.catygories);
  const dispatch = useAppDispatch();

  useEffect(() => {
    async function getData() {
      if (session.status === "authenticated") {
        await dispatch(getProducts());
        await dispatch(getCategories());
      }
    }
    getData();
  }, [dispatch, session.status]);
  const productsIds = products.map((el) => el.category.category_id);
  const categoriesIds = categories.map((el) => el._id);
  const checkProductNotHasCategory = productsIds.filter(
    (el) => !categoriesIds.includes(el)
  );

  return (
    <div>
      {checkProductNotHasCategory.length > 0 && (
        <div className="flex gap-2 items-center w-full bg-red-100 rounded-md border py-3 px-2 text-[18px] mt-3">
          <AlertOctagon color="red" />
          You need to add a category to the product to so published
        </div>
      )}
      <DataTable
        data={products}
        categories={categories}
        tableLoading={loading}
      />
    </div>
  );
}
