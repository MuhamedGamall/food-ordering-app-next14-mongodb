import * as React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import Image from "next/image";
import { InitCategoryState } from "../../../../../../types";

export const columns: ColumnDef<InitCategoryState>[] = [
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
      return <div className="text-right">Image</div>;
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
          Catygory
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <div>
          <div className="lowercase">{row.getValue("title")}</div>
        </div>
      );
    },
  },
  {
    accessorKey: "_id",
    header: () => <div >ID</div>,
    cell: ({ row }) => {
      const id: string = row.getValue("_id");
      return <div className=" font-medium">{id}</div>;
    },
  },
];
