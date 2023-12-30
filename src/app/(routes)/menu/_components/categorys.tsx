'use client'
import React, { useEffect, useState } from "react";
import CategoryItems from "./categorry-item";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { getCategories } from "@/lib/RTK/slices/categories-slice";
import { InitCategoryState } from "../../../../../types";
interface CategoriesProps {
  categories:InitCategoryState[]
  loading:boolean
  
}
export default function Categorys({categories ,loading}:CategoriesProps) {

  return <CategoryItems categories={categories} />;
}
