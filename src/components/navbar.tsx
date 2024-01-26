import NavbarTop from "@/components/navbar-top";
import NavberMain from "@/components/navbar-main";

export default function Navbar() {
  return (
    <header className="w-full  shadow-header-shadow bg-white ">
      <div className="mx-auto max-w-[100rem]  px-4  py-1 shadow-sm">
        <NavbarTop />
      </div>
      <div className="border-t">
        <div className="mx-auto max-w-[100rem] pr-4 py-2 ">
          <NavberMain />
        </div>
      </div>
    </header>
  );
}
