import Link from "next/link";
import React from "react";

interface CategoryItemsProps {
  items: { title: string; href: string }[];
}
export default function CategoryItems({ items }: CategoryItemsProps) {
  return (
    <div className="overflow-x-auto flex items-center gap-3 px-1 py-2 border-b mb-5">
      {items.map((item) => (
        <Link
          key={item.title}
          href={item.href}
          className=" hover:bg-[#2d5d2a] hover:text-white transition py-2  px-4 text-[27px] rounded-full "
        >
          {item.title}
        </Link>
      ))}
    </div>
  );
}
