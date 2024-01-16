import Link from "next/link";
import React from "react";
import { InitCategoryState } from "../../../../../types";
import { cn } from "@/lib/utils";
import { useParams, usePathname, useSearchParams } from "next/navigation";
import Image from "next/image";

export default function CategoryItems({
  categories,
}: {
  categories: InitCategoryState[];
}) {
  const { id } = useParams();

  return (
    <div className="overflow-x-auto py-2  max-w-[80rem]  my-5">
      <ul className="flex mx-auto  items-center gap-3 relative max-w-full md:max-w-[90%]">
        {categories.map((item: InitCategoryState, i) => {
          return (
            <li
              key={item._id}
              className={cn(
                i == 0 && id === "#" && "bg-[#2d5d2a] text-white",
                id === item.title && "bg-[#2d5d2a] text-white",
                " hover:bg-[#2d5d2a] hover:text-white transition py-2 px-4 text-[27px] rounded-full "
              )}
            >
              <Link href={"/menu/category/" + item.title}>{item?.title}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
