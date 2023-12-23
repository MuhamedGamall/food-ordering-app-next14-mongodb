"use client";

import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { getProducts } from "@/lib/RTK/slices/menu-products-slice";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { DataTable } from "./(table)/table-products";

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
        setTableLoading(false);
      }
    }
    getData();
  }, [dispatch, session.status]);

  return (
    <div>
      <DataTable

        data={products}
        categories={categories}
        tableLoading={tableLoading}
      />
    </div>
  );
}
