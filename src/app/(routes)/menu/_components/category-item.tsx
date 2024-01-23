import Link from "next/link";
import React from "react";
import { InitCategoryState } from "../../../../../types";
import { cn } from "@/lib/utils";
import { useParams } from "next/navigation";

export default function CategoryItems({
  categories,
}: {
  categories: InitCategoryState[];
}) {
  const { id }: { id: string } = useParams();
  return (
    <div className="overflow-x-auto py-2  max-w-[80rem]  my-5">
      <ul className="flex mx-auto  items-center gap-3 relative max-w-full md:max-w-[90%]">
        {categories.map((item: InitCategoryState, i) => {
          return (
            <li
              key={item._id}
              className={cn(
                i == 0 && id === "_" && "bg-[#2d5d2a] text-white",
                id?.replaceAll("%20", " ") === item?.title &&
                  "bg-[#2d5d2a] text-white",
                " whitespace-nowrap hover:bg-[#2d5d2a] hover:text-white transition py-2 px-4 text-[22px] rounded-full uppercase font-bold"
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
