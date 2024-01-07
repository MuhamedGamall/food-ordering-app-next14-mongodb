import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import React from "react";
import Sidebar from "./sidebar";
import { LayoutDashboard } from "lucide-react";

export default function SidebarSheet() {
  return (
      <Sheet>
        <SheetTrigger className="fixed  top-[150px] left-0 bg-sky-200 py-2 px-3 rounded-tr-full rounded-br-full text-white">
          <LayoutDashboard />
        </SheetTrigger>
        <SheetContent side={"left"} className="p-0 ">
          <Sidebar />
        </SheetContent>
      </Sheet>
 
  );
}
