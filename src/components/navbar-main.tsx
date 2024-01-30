"use client";
import Link from "next/link";
import { Button } from "./ui/button";
import { ShoppingCart } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { useEffect } from "react";
import { getCart } from "@/lib/RTK/slices/cart-slice";

import { MobileMenu } from "./mobile-menu";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

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
    href: "/#about",
  },
  {
    title: "Contact",
    href: "/#contact",
  },
];

export default function NavberMain() {
  const { cart } = useAppSelector((state) => state.productsCart);
  const session = useSession();
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const isLogin = session.status === "authenticated";
  useEffect(() => {
    dispatch(getCart());
  }, [dispatch]);
  console.log(pathname.includes("menu"));

  return (
    <nav className="px-4">
      <ul className="flex items-center justify-between ">
        <div className="hidden sm:flex gap-x-3 items-center justify-between ">
          {routes.map((route) => (
            <li key={route.title}>
              <Link href={route.href}>
                <Button
                  variant={"ghost"}
                  className={cn("text-[20px] rounded-full font-bold uppercase")}
                  size={"sm"}
                >
                  {route.title}
                </Button>
              </Link>
            </li>
          ))}
        </div>
        <MobileMenu routes={routes} />
        {isLogin && (
          <li className="">
            <Link className="relative" href={"/cart"}>
              <ShoppingCart strokeWidth="3" />
              <span className="absolute bg-red-600 leading-[0] rounded-[8px] top-[-13px] right-[-13px] w-fit h-fit py-3 px-2 text-white">
                {cart?.length}
              </span>
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}
