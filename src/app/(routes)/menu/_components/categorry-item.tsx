import Link from "next/link";
import React from "react";

interface CategoryItemsProps {
  items: { title: string; href: string }[];
}
export default function CategoryItems({ items }: CategoryItemsProps) {
  return (
    <div className="overflow-x-auto  py-2 mb-5   max-w-[80rem]  ">
      <ul className="flex mx-auto  items-center gap-3 relative max-w-full md:max-w-[90%]">
        {items.map((item) => (
          <li key={item?.href} >
            <Link
              href={item?.href}
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
