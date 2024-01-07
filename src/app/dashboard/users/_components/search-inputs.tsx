import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { MoreVertical, Search, Trash2 } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
export default function SearchInputsUsers({
  dataLength,
  table,
}: {
  dataLength: number;
  table: any;
}) {
  const [searchBy, setSearchBy] = useState("name");
  return (
    <div className=" px-2 py-1 bg-slate-100 rounded-md flex items-center">
      <Input
        placeholder={`Search by ${searchBy}...`}
        value={(table?.getColumn(searchBy)?.getFilterValue() as string) ?? ""}
        onChange={(event) => {
          table?.getColumn(searchBy)?.setFilterValue(event.target.value);
        }}
        type="text"
        disabled={!dataLength}
        className="grow"
      />
      <div className="">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button type="button" variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="flex flex-col gap-1">
            <DropdownMenuLabel className="flex items-center gap-2">
              <Search />
              Search By
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className=" text-[15px]  cursor-pointer"
              onClick={() => {
                table?.getColumn(searchBy)?.setFilterValue("");
                setSearchBy("name");
              }}
            >
              name
            </DropdownMenuItem>
            <DropdownMenuItem
              className=" text-[15px]  cursor-pointer"
              onClick={() => {
                setSearchBy("email");
                table?.getColumn(searchBy)?.setFilterValue("");
              }}
            >
              email
            </DropdownMenuItem>
            <DropdownMenuItem
              className=" text-[15px]  cursor-pointer"
              onClick={() => {
                table?.getColumn(searchBy)?.setFilterValue("");
                setSearchBy("_id");
              }}
            >
              _id
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
