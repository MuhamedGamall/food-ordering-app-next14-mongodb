import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { Menu } from "lucide-react";
import Link from "next/link";

export function MobileMenu({routes}:{routes:{title:string,href:string}[]}) {
  return (
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
  );
}
