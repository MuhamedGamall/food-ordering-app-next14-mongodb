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
  const { products } = useAppSelector((state) => state.menuProducts);
  const { categories } = useAppSelector((state) => state.catygories);
  const [tableLoading, setTableLoading] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    async function getData() {
      if (session.status === "authenticated") {
        setTableLoading(true);
        await dispatch(getProducts());
        await dispatch(getCategories());
        setTableLoading(false);
      }
    }
    getData();
  }, [dispatch, session.status]);
  const productsIds = products.map((el) => el.category);
  const categoriesIds = categories.map((el) => el._id);
  const checkProductNotHasCategory = productsIds.filter(
    (el) => !categoriesIds.includes(el)
  );

  return (
    <div>
      {checkProductNotHasCategory.length > 0 && (
        <div className="flex gap-2 items-center w-full bg-red-100 rounded-md border py-3 px-2 text-[18px] mt-3">
          <AlertOctagon color="red" />
          You shold add category to product for publish product
        </div>
      )}
      <DataTable
        data={products}
        categories={categories}
        tableLoading={tableLoading}
      />
    </div>
  );
}