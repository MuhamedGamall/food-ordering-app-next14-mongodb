import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { ChevronDown } from "lucide-react";
export default function DelievryDetails({row}:any) {
  return (
    <Menubar className=" block border-none bg-white ">
    <MenubarMenu>
      <MenubarTrigger className="flex  items-center gap-2">
        Address <ChevronDown size={"18px"} />
      </MenubarTrigger>
      <MenubarContent className="bg-white rounded-sm ">
        <MenubarItem className=" text-slate-600  cursor-text">
          Phone:
          <span className="text-slate-950 ml-3 pointer-events-none">
            {row.original?.phone}
          </span>
        </MenubarItem>
        <MenubarItem className=" text-slate-600 cursor-text">
          Postal code:
          <span className="text-slate-950 ml-3">
            {row.original?.postal_code}
          </span>
        </MenubarItem>
        <MenubarItem className=" text-slate-600 cursor-text">
          City:
          <span className="text-slate-950 ml-3">
            {row.original?.city}
          </span>
        </MenubarItem>
        <MenubarItem className=" text-slate-600 cursor-text">
          Country:
          <span className="text-slate-950 ml-3">
            {row.original?.country}
          </span>
        </MenubarItem>
        <MenubarItem className=" text-slate-600 cursor-text">
          Street address:
          <span className="text-slate-950 ml-3">
            {row.original?.street_address}
          </span>
        </MenubarItem>
      </MenubarContent>
    </MenubarMenu>
  </Menubar>
  )
}
