"use client";

import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { getProducts } from "@/lib/RTK/slices/menu-products-slice";
import { useEffect, useState } from "react";
import FoodCard from "../../menu/_components/food-card";
import ProductDialog from "../../_comonents/product-dialog";
import PageHeader from "@/components/page-header";

export default function BestSelles() {
  const { products } = useAppSelector((state) => state.menuProducts);
  const dispatch = useAppDispatch();
  const [isClicked, setIsClicked] = useState({ check: false, id: "" });
  const dialogProduct = (products || []).filter(
    (el) => el._id === isClicked.id
  )[0];

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const bestSelles = (products || []).slice(0, 4);
  return (
    <section className="">
      <div className="w-fit mx-auto my-5 ">
        <PageHeader
          title="BEST OUR SELLES"
          className="text-[19px] sm:text-[25px] mb-1"
        />
        <span className="w-[70%] bg-black h-[2px] mx-auto block"></span>
      </div>
      {isClicked.check && (
        <div className="fixed z-[9999999999999999999999999] inset-0 bg-black/40 flex items-center justify-center ">
          <div
            className="flex items-center justify-center flex-col px-1 bg-white rounded-md"
            style={{ maxHeight: "calc(100vh - 100px)" }}
          >
            <ProductDialog item={dialogProduct} setIsClicked={setIsClicked} />
          </div>
        </div>
      )}
      <div className="overflow-x-auto pb-5 ">
        <div className="flex items-center mx-3 justify-center w-[1200px]   gap-5">
          {bestSelles.map((el) => (
            <div key={el?._id} className="w-[350px]">
              <FoodCard item={el} setIsClicked={setIsClicked} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
