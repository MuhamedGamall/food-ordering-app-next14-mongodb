"use client";

import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { getProducts } from "@/lib/RTK/slices/menu-products-slice";
import { useEffect } from "react";
import { DataTable } from "./(table)/table-products";
import { getCategories } from "@/lib/RTK/slices/categories-slice";
import { AlertOctagon } from "lucide-react";
import Banner from "@/components/banner";

export default function AllProducts() {
  const { products, loading } = useAppSelector((state) => state.menuProducts);
  const { categories } = useAppSelector((state) => state.categories);
  const dispatch = useAppDispatch();

  useEffect(() => {
    async function getData() {
      await dispatch(getProducts());
      await dispatch(getCategories());
    }
    getData();
  }, [dispatch]);
  const productsIds = products.map((el) => el.category.category_id);
  const categoriesIds = categories.map((el) => el._id);
  const checkProductNotHasCategory = productsIds.filter(
    (el) => !categoriesIds.includes(el)
  );

  return (
    <div>
      {checkProductNotHasCategory.length > 0 && (
        <Banner
          label="You need to add a category to the product to so published"
          icon={AlertOctagon}
          color="red"
          bgColor="red"
        />
      )}
      <DataTable
        data={products}
        categories={categories}
        tableLoading={loading}
      />
    </div>
  );
}
