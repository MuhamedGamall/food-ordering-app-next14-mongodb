import useActiveLink from "@/hooks/active-link";
import useProfile from "@/hooks/user-profile";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

import React from "react";

interface AdminMenuBarRoutesProps {
  routes: { title: string; href: string }[];
  path: string;
}
export default function AdminMenuBarItems({
  routes,
  path,
}: AdminMenuBarRoutesProps) {
  const { data } = useProfile();
  const isActive = useActiveLink(path);

  return (
    <div className="overflow-x-auto  py-3 mb-5   max-w-[80rem]  ">
      <ul className="flex mx-auto  items-center gap-3 relative max-w-full md:max-w-[90%]">
        <li>
          <Link
            href={"/profile"}
            className={cn(
              isActive && "profile".includes(path) && "bg-[#2d5d2a] text-white",
              "hover:bg-[#2d5d2a] hover:text-white transition py-2 px-4 text-[27px] rounded-full "
            )}
          >
            <span className="whitespace-nowrap">Profile</span>
          </Link>
        </li>
        {routes.map((item) => (
          <li key={item?.href}>
            <Link
              href={item?.href}
              className={cn(
                isActive &&
                  item.href.includes(path) &&
                  "bg-[#2d5d2a] text-white",
                " hover:bg-[#2d5d2a] hover:text-white transition py-2 px-4 text-[27px] rounded-full "
              )}
            >
              <span className="whitespace-nowrap">{item?.title}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
