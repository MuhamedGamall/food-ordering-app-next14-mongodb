import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Edit, MoreHorizontal, Trash2 } from "lucide-react";
import Link from "next/link";
import { DeleteConfirm } from "@/components/delete-confirm";
interface ItemActionsProps {
  handleDeleteClick: (id: string) => any;
  row: any;
}
export default function ItemActions({
  handleDeleteClick,
  row,
}: ItemActionsProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="bg-slate-100 hover:bg-slate-200">
        <Button type="button" variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem>
          <Link
            href={"/dashboard/menu-products/edit-product/" + row.original._id}
            className="flex items-center gap-1 text-[16px]"
          >
            <Edit className="w-4" />
            View & Edit product
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <DeleteConfirm
            title="Are you sure to delete all products"
            onDelete={() => handleDeleteClick(row.original._id)}
          >
            <div className="flex items-center gap-1 text-[16px]">
              <Trash2 className="w-4" />
              Delete
            </div>
          </DeleteConfirm>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
