import React from "react";
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

export default function ProfileMenu({ name }: { name: string }) {
  return (
    <DropdownMenu>
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
          className="flex items-center gap-1 text-[15px] leading-[1]  mb-1  cursor-pointer"
        >
          <Link href={"/profile"}>Profile</Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          asChild
          className="flex items-center gap-1 text-[15px] leading-[1] cursor-pointer"
        >
          <span>Favorites</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />

        <DropdownMenuItem
          asChild
          onClick={() => signOut()}
          className="flex items-center gap-1 text-[15px] leading-[1] text-red-700   cursor-pointer"
        >
          <span>
            Sign out
            <LogOut height={"15"} width={"15"} />
          </span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
