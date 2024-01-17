import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import React from "react";
import Sidebar from "./sidebar";
import { LayoutDashboard } from "lucide-react";

export default function SidebarSheet() {
  return (
    <Sheet>
      <SheetTrigger className="fixed flex items-center gap-1  z-50 bottom-[50px] shadow-lg left-[-1px] bg-sky-200 py-2  pl-1 pr-3 rounded-tr-full rounded-br-full text-white">
        DASHBOARD
        <LayoutDashboard />
      </SheetTrigger>
      <SheetContent side={"left"} className="p-0 w-[300px]">
        <Sidebar />
      </SheetContent>
    </Sheet>
  );
}
