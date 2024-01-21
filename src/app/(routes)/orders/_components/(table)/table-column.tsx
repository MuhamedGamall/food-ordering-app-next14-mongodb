import * as React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

import formatDate from "@/utils/format/format-date";
import { cn } from "@/lib/utils";

import Link from "next/link";
import DelievryDetails from "../../[orderId]/_components/delievry-details";

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <div>
          <div
            className={cn(
              " rounded-md px-2 py-1 max-w-[180px] overflow-x-auto whitespace-nowrap "
            )}
          >
            {row.getValue("email")}
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Created at
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const createdAt: string = row.getValue("createdAt");
      return (
        <div className="text-right font-medium lowercase max-w-[150px] overflow-x-auto whitespace-nowrap">
          {formatDate(createdAt)}
        </div>
      );
    },
  },

  {
    accessorKey: "paid",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Is paid
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const isPaid = row.getValue("paid");
      return (
        <div>
          <div
            className={cn(
              isPaid
                ? "text-green-700"
                :  "text-red-700",
              " rounded-md px-2 py-1 max-w-[150px] overflow-x-auto whitespace-nowrap text-[18px] w-fit"
            )}
          >
            {isPaid ? "Paid" : "Not paid"}
          </div>
        </div>
      );
    },
  },

  {
    accessorKey: "address",
    header: ({ column }) => {
      return <Button variant="ghost">Address</Button>;
    },
    cell: ({ row }) => {
      return (
        <div className=" whitespace-nowrap ">
          <DelievryDetails row={row} />
        </div>
      );
    },
  },
  {
    accessorKey: "_id",
    header: ({ column }) => {
      return <div>ID</div>;
    },
    cell: ({ row }) => {
      return (
        <div>
          <div className="lowercase max-w-[150px] overflow-x-auto whitespace-nowrap">
            {row.getValue("_id")}
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "actions",
    header: ({ column }) => {
      return <Button variant="ghost">Actions</Button>;
    },
    cell: ({ row }) => {
      return (
        <div>
          <Button
            className="bg-slate-100 hover:bg-slate-200"
            size={"sm"}
            variant={"ghost"}
          >
            <Link
              href={"/orders/" + row.getValue("_id")}
              className="lowercase max-w-[150px] overflow-x-auto whitespace-nowrap"
            >
              More details
            </Link>
          </Button>
        </div>
      );
    },
  },
];
