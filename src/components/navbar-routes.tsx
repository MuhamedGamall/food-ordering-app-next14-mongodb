import Link from "next/link";
import { Button } from "./ui/button";
import Logo from "./Logo";
const routes: { title: string; href: string }[] = [
  {
    title: "About",
    href: "/about",
  },
  {
    title: "Contact",
    href: "/contact",
  },
];

export default function NavberRoutes() {
  return (
    <header className="flex items-center justify-between w-full">
      <Link href={"/"}>
        <Logo />
      </Link>
      <nav className="flex gap-x-3 items-centr">
        <Link href={""}>
          <Button
            variant={"ghost"}
            className=" text-[25px] rounded-full"
            size={"lg"}
          >
            Menu
          </Button>
        </Link>
        {routes.map((route) => (
          <Link key={route.title} href={route.href}>
            <Button
              variant={"ghost"}
              className="text-[25px] rounded-full"
              size={"lg"}
            >
              {route.title}
            </Button>
          </Link>
        ))}
        <Link href={""}>
          <Button
            variant={"green"}
            className="rounded-full text-[25px]"
            size={"lg"}
          >
            Login
          </Button>
        </Link>
      </nav>
    </header>
  );
}
