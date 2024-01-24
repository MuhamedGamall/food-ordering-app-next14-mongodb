"use client";

import PageHeader from "@/components/page-header";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { getCategories } from "@/lib/RTK/slices/categories-slice";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

export default function CategorySection() {
  const { categories } = useAppSelector((state) => state.catygories);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  return (
    <section>
      <div className="w-fit mx-auto my-8 ">
        <PageHeader
          title="EXPLORE OUR MENU"
          className="text-[19px] sm:text-[25px] mb-1 "
        />
        <span className="w-[70%] bg-black h-[2px] mx-auto block"></span>
      </div>
      <ul className="grid  grid-cols-3  sm:flex  flex-wrap justify-center mx-auto gap-5 ">
        {categories?.map((el) => (
          <li key={el?._id}>
            <Link
              href={"/menu/category/" + el?.title}
              className="flex items-center justify-center flex-col gap-2 "
            >
              <Image
                src={el?.image}
                alt="category image"
                width={100}
                height={100}
                className="rounded-full shadow-sm  w-[80px] h-[80px] object-cover"
              />
              <span className=" text-[13px]  uppercase font-semibold">
                {el?.title}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
