
import * as React from "react";
import {
  ColumnDef,
} from "@tanstack/react-table";
import {
  ArrowUpDown,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

export type Catygory = {
  title: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  _id: string;
};
export const columns: ColumnDef<Catygory>[] = [
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
    header: () => <div className="text-right">ID</div>,
    cell: ({ row }) => {
      const id: string = row.getValue("_id");
      return <div className="text-right font-medium">{id}</div>;
    },
  },
];
