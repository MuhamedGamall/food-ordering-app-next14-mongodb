import Link from "next/link";
import React from "react";
import { InitCategoryState } from "../../../../../types";

export default function CategoryItems({
  categories,
}: {
  categories: InitCategoryState[];
}) {
  return (
    <div className="overflow-x-auto  py-2   max-w-[80rem]  my-5">
      <ul className="flex mx-auto  items-center gap-3 relative max-w-full md:max-w-[90%]">
        {categories.map((item: InitCategoryState) => (
          <li key={item?._id}>
            <Link
              href={item?._id}
              className=" hover:bg-[#2d5d2a] hover:text-white transition py-2 px-4 text-[27px] rounded-full "
            >
              {item?.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
