"use client";

import { DataTable } from "./(table)/table-categories";

import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { getCategories } from "@/lib/RTK/slices/categories-slice";
import { Loader } from "lucide-react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function AllCategorios() {
  const session = useSession();
  const { categories } = useAppSelector((state) => state.catygories);
  const [tableLoading, setTableLoading] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    async function getData() {
      if (session.status === "authenticated") {
        setTableLoading(true);
        await dispatch(getCategories());
        setTableLoading(false);
      }
    }
    getData();
  }, [dispatch, session.status]);

  return (
    <div>
      <DataTable data={categories} tableLoading={tableLoading} />
    </div>
  );
}
