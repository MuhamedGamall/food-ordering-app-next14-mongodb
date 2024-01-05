"use client";

import { DataTable } from "./(table)/table-categories";

import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { getCategories } from "@/lib/RTK/slices/categories-slice";
import { Loader } from "lucide-react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function AllCategorios() {
  const session = useSession();
  const { categories,loading } = useAppSelector((state) => state.catygories);
  const dispatch = useAppDispatch();

  useEffect(() => {
    async function getData() {
      if (session.status === "authenticated") {
        await dispatch(getCategories());
      }
    }
    getData();
  }, [dispatch, session.status]);

  return (
    <div>
      <DataTable data={categories} tableLoading={loading} />
    </div>
  );
}
