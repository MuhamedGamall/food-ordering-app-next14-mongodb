import Link from "next/link";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
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
  return (
    <header className="">
      <nav className="">
        <ul className="flex gap-x-3 items-center sm:justify-start justify-center overflow-x-auto">
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
        </ul>
      </nav>
    </header>
  );
}
