import * as React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

import formatDate from "@/utils/format/format-date";
import { cn } from "@/lib/utils";

import Link from "next/link";
import DelievryDetails from "./delievry-details";

export const columns: ColumnDef<any>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value: any) =>
          table.toggleAllPageRowsSelected(!!value)
        }
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value: any) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
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
              " rounded-md px-2 py-1 max-w-[100px] overflow-x-auto whitespace-nowrap "
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
        <div className="text-right font-medium lowercase max-w-[100px] overflow-x-auto whitespace-nowrap">
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
              isPaid ? "bg-green-600/70" : "bg-red-600/70",
              " rounded-md px-2 py-1 max-w-[100px] overflow-x-auto whitespace-nowrap text-slate-800 text-[18px] w-fit"
            )}
          >
            {isPaid ? "Paid" : "Not paid"}
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "received",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Is received
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const isReceived = row.getValue("received");
      // const isPaid = row.getValue("paid");
      // const isAdmin = row.getValue("admin");

      return (
        <div>
          <div
            className={cn(
              isReceived ? "bg-green-600/80" : "bg-red-600/80",
              " rounded-md px-2 py-1 max-w-[100px] overflow-x-auto whitespace-nowrap text-[18px] text-slate-800 w-fit"
            )}
          >
            {isReceived ? "received" : "Not received"}
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
        <div className="max-w-[100px] overflow-x-auto whitespace-nowrap">
          <DelievryDetails row={row} />
        </div>
      );
    },
  },
  {
    accessorKey: "_id",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          ID
          <ArrowUpDown className="ml-2 h-4 w-4 " />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <div>
          <div className="lowercase max-w-[100px] overflow-x-auto whitespace-nowrap">
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
          <Link
            href={"/orders/" + row.getValue("_id")}
            className="lowercase max-w-[100px] overflow-x-auto whitespace-nowrap"
          >
            More details
          </Link>
        </div>
      );
    },
  },
];
