import Link from "next/link";
import React from "react";
import { InitCategoryState } from "../../../../../types";
import { cn } from "@/lib/utils";
import { usePathname, useSearchParams } from "next/navigation";

export default function CategoryItems({
  categories,

}: {
  categories: InitCategoryState[];

}) {
  const pathname = usePathname();


  return (
    <div className="overflow-x-auto  py-2   max-w-[80rem]  my-5">
      <ul className="flex mx-auto  items-center gap-3 relative max-w-full md:max-w-[90%]">
        {categories.map((item: InitCategoryState, i) => (
          <li
            key={item._id}
            className={cn(
              i == 0 &&  pathname.includes('_') && "bg-[#2d5d2a] text-white",
              pathname.includes(item.title) && "bg-[#2d5d2a] text-white",
              " hover:bg-[#2d5d2a] hover:text-white transition py-2 px-4 text-[27px] rounded-full "
            )}
          >
            <Link href={"/menu/category/" + item.title}>{item?.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
