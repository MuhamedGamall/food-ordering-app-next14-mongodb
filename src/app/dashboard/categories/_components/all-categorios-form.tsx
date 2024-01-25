"use client";

import { DataTable } from "./(table)/table-categories";

import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { getCategories } from "@/lib/RTK/slices/categories-slice";

import { useSession } from "next-auth/react";
import { useEffect } from "react";

export default function AllCategorios({
  setEditMood,
  editMood,
}: {
  setEditMood: any;
  editMood: any;
}) {
  const session = useSession();
  const { categories, loading } = useAppSelector((state) => state.categories);
  const dispatch = useAppDispatch();

  useEffect(() => {
    async function getData() {
      await dispatch(getCategories());
    }
    getData();
  }, [dispatch, session.status]);

  return (
    <div>
      <DataTable
        data={categories}
        tableLoading={loading}
        setEditMood={setEditMood}
        editMood={editMood}
      />
    </div>
  );
}
