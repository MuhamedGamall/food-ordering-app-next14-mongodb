"use client";
import Link from "next/link";
import { Button } from "./ui/button";
import { FaCartShopping } from "react-icons/fa6";
import { Menu, ShoppingCart } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { useEffect } from "react";
import { getCart } from "@/lib/RTK/slices/products-cart";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "./ui/menubar";

const routes: { title: string; href: string }[] = [
  {
    title: "Menu",
    href: "/menu/category/_",
  },
  {
    title: "About",
    href: "/about",
  },
  {
    title: "Contact",
    href: "/contact",
  },
];

export default function NavberMain() {
  const { cart } = useAppSelector((state) => state.productsCart);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getCart());
  }, [dispatch]);
  return (
    <header className="">
      <nav className="px-4">
        <ul className="flex items-center justify-between ">
          <div className="hidden sm:flex gap-x-3 items-center justify-between ">
            {routes.map((route) => (
              <li key={route.title}>
                <Link href={route.href}>
                  <Button
                    variant={"ghost"}
                    className="text-[25px] rounded-full"
                    size={"lg"}
                  >
                    {route.title}
                  </Button>
                </Link>
              </li>
            ))}
          </div>
          <Menubar className="sm:hidden block border-none bg-white">
            <MenubarMenu>
              <MenubarTrigger>
                <Menu />
              </MenubarTrigger>
              <MenubarContent className="bg-white rounded-sm">
                {routes.map((route) => (
                  <Link
                    key={route.title}
                    href={route.href}
                    className="block hover:text-[#2d5d2a] hover:border-b hover:border-[#2D5D2A] transition hover:bg-slate-300/20"
                  >
                    <MenubarItem className="cursor-pointer  hover:translate-x-2 transition ">
                      {route.title}
                    </MenubarItem>
                  </Link>
                ))}
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
          <li>
            <Link className="relative" href={"/cart"}>
              <ShoppingCart strokeWidth="3" />
              <span className="absolute bg-red-600 leading-[0] rounded-[8px] top-[-13px] right-[-13px] w-fit h-fit py-3 px-2 text-white">
                {cart?.length}
              </span>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
