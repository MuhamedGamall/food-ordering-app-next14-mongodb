import * as React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

import Image from "next/image";
import formatPrice from "@/utils/format/format-price";
import formatDate from "@/utils/format/format-date";
import { InitCategoryState } from "../../../../../../types";
import { cn } from "@/lib/utils";
export const columnsFnc = (categories: InitCategoryState[]) => {
  const columns: ColumnDef<any>[] = [
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
      accessorKey: "image",
      header: ({ column }) => {
        return <div className="">Image</div>;
      },
      cell: ({ row }) => {
        return (
          <div>
            <Image
              src={row.getValue("image")}
              alt="image"
              width={250}
              height={250}
              loading="lazy"
              className="w-[50px] max-w-full rounded-md aspect-[1] object-cover"
            />
          </div>
        );
      },
    },
    {
      accessorKey: "title",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            
          >
            Title
            <ArrowUpDown className="ml-2 h-4 w-4 " />
          </Button>
        );
      },
      cell: ({ row }) => {
        return (
          <div>
            <div className="lowercase whitespace-nowrap max-w-[150px] overflow-x-auto">
              {row.getValue("title")}
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "base_price",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Base price
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        return (
          <div>
            <div className="max-w-[100px] overflow-x-auto whitespace-nowrap">
              {formatPrice(row.getValue("base_price"))}
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "category",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Category
            <ArrowUpDown className="ml-2 h-4 w-4 " />
          </Button>
        );
      },
      cell: ({ row }: any) => {
        const catData = categories.map((el) => el._id);
        const cat = row.getValue("category");
        const check = catData.includes(cat?.category_id);

        return (
          <div>
            <div className="lowercase max-w-[100px] overflow-x-auto whitespace-nowrap">
              <div className={cn(!check && "text-red-700")}>
                {check ? cat?.title : "No category"}
              </div>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "description",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Description
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        return (
          <div>
            <div className="lowercase max-w-[200px] overflow-x-auto whitespace-nowrap">
              {row.getValue("description")}
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "_id",
      header: () => <div>ID</div>,
      cell: ({ row }) => {
        const id: string = row.getValue("_id");
        return <div className="font-medium">{id}</div>;
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
  ];
  return { columns };
};
