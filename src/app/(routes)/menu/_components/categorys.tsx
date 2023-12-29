'use client'
import React, { useEffect, useState } from "react";
import CategoryItems from "./categorry-item";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { getCategories } from "@/lib/RTK/slices/categories-slice";

export default function Categorys() {
  const { categories } = useAppSelector((state) => state.catygories);
  const [tableLoading, setTableLoading] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    async function getData() {
      setTableLoading(true);
      await dispatch(getCategories());
      setTableLoading(false);
    }
    getData();
  }, [dispatch]);

  return <CategoryItems categories={categories} />;
}
