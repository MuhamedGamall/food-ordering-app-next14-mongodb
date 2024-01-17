import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import React from "react";
import Sidebar from "./sidebar";
import { LayoutDashboard } from "lucide-react";

export default function SidebarSheet() {
  return (
    <Sheet>
      <SheetTrigger
        className="fixed lg:hidden flex items-center justify-center gap-1  z-50  shadow-lg bottom-0 left-[50%] bg-green-700 py-2  p-3 rounded-tr-xl  rounded-tl-xl text-white"
        style={{ transform: "translate(-50%)" }}
      >
        DASHBOARD
        <LayoutDashboard />
      </SheetTrigger>
      <SheetContent side={"left"} className="p-0 w-[300px]">
        <Sidebar />
      </SheetContent>
    </Sheet>
  );
}
