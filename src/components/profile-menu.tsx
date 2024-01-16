import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import { ChevronDown, LogOut, Menu, MoreVertical } from "lucide-react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import FavoriteSheet from "./favorites-sheet";

export default function ProfileMenu({ name }: { name: string }) {
  const [open, setOpen] = useState(false);
  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <div className="mr-5">
          <Button type="button" variant="ghost" className=" px-1">
            <div className="flex items-center gap-1 ">
              HI,
              <span className="underline"> {name?.toUpperCase()}</span>
            </div>
            <span className="sr-only">Open menu</span>
            <ChevronDown className="h-5 w-6" />
          </Button>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          asChild
          className="text-[15px] leading-[1]  cursor-pointer"
        >
          <Link href={"/profile"}> Profile</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <FavoriteSheet />
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          asChild
          onClick={() => signOut()}
          className=" text-[15px] leading-[1] text-red-700   cursor-pointer"
        >
          <span className="flex items-center gap-1">
            Sign out
            <LogOut height={"15"} width={"15"} />
          </span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
