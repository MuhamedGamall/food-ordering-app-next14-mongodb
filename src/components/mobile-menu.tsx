import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { Menu } from "lucide-react";
import Link from "next/link";
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
export function MobileMenu() {
  return (
    <Menubar className="md:hidden block border-none bg-white">
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
  );
}
