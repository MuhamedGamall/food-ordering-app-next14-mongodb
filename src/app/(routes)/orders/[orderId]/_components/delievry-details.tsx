import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { ChevronDown } from "lucide-react";
export default function DelievryDetails({ row }: any) {
  return (
    <Menubar className="  border-none bg-slate-100 p-0.5 w-fit h-fit  flex items-center gap-1 justify-center hover:bg-slate-200 transition-all">
      <MenubarMenu>
        <MenubarTrigger className="flex  items-center gap-2">
          Address <ChevronDown size={"18px"} />
        </MenubarTrigger>
        <MenubarContent className="bg-white rounded-sm ">
          <MenubarItem className=" text-slate-600 cursor-text">
            Phone:
            <span className="text-slate-950 ml-1 pointer-events-none">
              {row.original?.phone}
            </span>
          </MenubarItem>
          <MenubarItem className=" text-slate-600 cursor-text">
            Postal code:
            <span className="text-slate-950 ml-1">
              {row.original?.postal_code}
            </span>
          </MenubarItem>
          <MenubarItem className=" text-slate-600 cursor-text">
            City:
            <span className="text-slate-950 ml-1">{row.original?.city}</span>
          </MenubarItem>
          <MenubarItem className=" text-slate-600 cursor-text">
            Country:
            <span className="text-slate-950 ml-1">{row.original?.country}</span>
          </MenubarItem>
          <MenubarItem className=" text-slate-600 cursor-text">
            Street address:
            <span className="text-slate-950 ml-1">
              {row.original?.street_address}
            </span>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}
