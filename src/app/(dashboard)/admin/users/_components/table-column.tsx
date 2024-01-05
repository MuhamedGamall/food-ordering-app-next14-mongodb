import * as React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Edit } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

import Image from "next/image";
import formatPrice from "@/utils/format/format-price";
import formatDate from "@/utils/format/format-date";
import { cn } from "@/lib/utils";
import Link from "next/link";

export const columns: ColumnDef<any>[] = [
  // {
  //   id: "select",
  //   header: ({ table }) => (
  //     <Checkbox
  //       checked={
  //         table.getIsAllPageRowsSelected() ||
  //         (table.getIsSomePageRowsSelected() && "indeterminate")
  //       }
  //       onCheckedChange={(value: any) =>
  //         table.toggleAllPageRowsSelected(!!value)
  //       }
  //       aria-label="Select all"
  //     />
  //   ),
  //   cell: ({ row }) => (
  //     <Checkbox
  //       checked={row.getIsSelected()}
  //       onCheckedChange={(value: any) => row.toggleSelected(!!value)}
  //       aria-label="Select row"
  //     />
  //   ),
  //   enableSorting: false,
  //   enableHiding: false,
  // },
  {
    accessorKey: "image",
    header: ({ column }) => {
      return <div className="text-right">Image</div>;
    },
    cell: ({ row }) => {
      return (
        <div>
          <Image
            src={row.getValue("image") || "/avatar/avatar.jpeg"}
            alt="image"
            width={250}
            height={250}
            className="w-[50px] max-w-full rounded-md aspect-[1] object-cover"
          />
        </div>
      );
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4 " />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <div>
          <div className="lowercase whitespace-nowrap max-w-[150px] overflow-x-auto">
            {row.getValue("name") || "No name"}
          </div>
        </div>
      );
    },
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
          <div className="max-w-[100px] overflow-x-auto whitespace-nowrap">
            {row.getValue("email")}
          </div>
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
    accessorKey: "admin",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Is admin
          <ArrowUpDown className="ml-2 h-4 w-4 " />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <div>
          <div
            className={cn(
              row.getValue("admin") ? "text-green-700" : "text-red-700",
              "lowercase max-w-[100px] overflow-x-auto whitespace-nowrap "
            )}
          >
            {row.getValue("admin") ? "admin" : "not admin"}
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
    accessorKey: "updatedAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Updated at
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const updatedAt: string = row.getValue("updatedAt");
      return (
        <div className="text-right font-medium lowercase max-w-[100px] overflow-x-auto whitespace-nowrap">
          {formatDate(updatedAt)}
        </div>
      );
    },
  },
  {
    accessorKey: "actions",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Actions
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="text-right font-medium lowercase max-w-[100px] overflow-x-auto whitespace-nowrap">
          <Link
            href={"/admin/users/" + row.getValue("_id")}
            className="flex items-center gap-1 text-[16px]"
          >
            <Edit className="w-4" />
            View user
          </Link>
          ;
        </div>
      );
    },
  },
];
