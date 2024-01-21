"use client";
import Logo from "@/components/Logo";
import React from "react";
import SidebarItem from "./sidebar-item";
import { Layers3, LayoutList, LucideIcon, UserCog, Users } from "lucide-react";
import { TbShoppingCartCog } from "react-icons/tb";
import { usePathname } from "next/navigation";
import SidebarSheet from "./sidebar-sheet";
import Link from "next/link";

const dashboardRoutes: { title: string; href: string; icon: LucideIcon }[] = [
  {
    title: "Profile",
    href: "/profile",
    icon: UserCog,
  },
  {
    title: "Categories",
    href: "/dashboard/categories",
    icon: Layers3,
  },
  {
    title: "Menu products",
    href: "/dashboard/menu-products",
    icon: LayoutList,
  },
  {
    title: "Orders",
    href: "/orders",
    icon: TbShoppingCartCog,
  },
  {
    title: "Users",
    href: "/dashboard/users",
    icon: Users,
  },
];
export default function Sidebar() {
  const pathname = usePathname();

  const checkPath = (path: string) => pathname.includes(path);
  return (
    <>
      <div className="z-[200] flex bg-white lg:border-r-[2px] shadow-sm py-4 h-screen  w-[300px]  flex-col  gap-4 sticky top-0">
        <Link href={'/'} className="mx-auto ">
          <Logo color="red" />
        </Link>
        <ul className="flex flex-col justify-center gap-3">
          {dashboardRoutes.map((route, i) => (
            <SidebarItem {...route} key={i} checkPath={checkPath} />
          ))}
        </ul>
      </div>
    </>
  );
}
