import NavberRoutes from "@/components/navbar-routes";
import { MobileMenu } from "./mobile-menu";

export default function Navbar() {
  return (
    <div className="w-full border-b">
      <div className="mx-auto max-w-[100rem]  px-4  py-2 flex items-center justify-between gap-4  shadow-sm ">
     
        <NavberRoutes />
      </div>
    </div>
  );
}
