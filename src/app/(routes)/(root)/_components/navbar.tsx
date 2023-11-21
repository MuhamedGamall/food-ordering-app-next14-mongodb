import NavbarTop from "@/components/navbar-top";
import { MobileMenu } from "./mobile-menu";
import NavberMain from "@/components/navbar-main";

export default function Navbar() {
  return (
    <header className="w-full">
      <div className="mx-auto max-w-[100rem]  px-4  py-2 shadow-sm">
        <NavbarTop />
      </div>
      <div className="border-t">
        <div className="mx-auto max-w-[100rem]  px-4  py-2  ">
          <NavberMain />
        </div>
      </div>
    </header>
  );
}
