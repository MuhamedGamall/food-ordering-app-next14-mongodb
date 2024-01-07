import React from "react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import { ChevronDown } from "lucide-react";
import SearchInputsOrders from "@/app/(routes)/orders/_components/search-inputs";
import SearchInputsUsers from "@/app/dashboard/users/_components/search-inputs";
export default function TableTopHeader({ data, table, pageName }: any) {
  return (
    <>
      <div className="flex items-center gap-1">
        {pageName === "orders" ? (
          <SearchInputsOrders dataLength={data?.length} table={table} />
        ) : (
          <SearchInputsUsers dataLength={data?.length} table={table} />
        )}
      </div>
      <div className="bg-slate-100 rounded-md p-1">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button type="button" variant="outline" className="ml-auto">
              Columns <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              ?.getAllColumns()
              .filter((column: any) => column?.getCanHide())
              .map((column: any) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column?.id}
                    className="capitalize"
                    checked={column?.getIsVisible()}
                    onCheckedChange={(value) =>
                      column?.toggleVisibility(!!value)
                    }
                  >
                    {column?.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  );
}
