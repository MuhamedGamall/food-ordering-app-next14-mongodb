"use client";
import Link from "next/link";
import { Button } from "./ui/button";
import { FaCartShopping } from "react-icons/fa6";
import { Menu, ShoppingCart } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { useEffect } from "react";
import { getCart } from "@/lib/RTK/slices/cart-slice";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "./ui/menubar";
import { MobileMenu } from "./mobile-menu";

const routes: { title: string; href: string }[] = [
  {
    title: "Menu",
    href: "/menu/category/_",
  },
  {
    title: "Orders",
    href: "/orders",
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
    <div className="">
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
          <MobileMenu routes={routes}/>
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
    </div>
  );
}
