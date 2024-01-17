import { Button } from "@/components/ui/button";
import React from "react";
import { MoreHorizontal, MoreVertical, Trash2 } from "lucide-react";
import {
  deleteAllCategories,
  deleteCategory,
} from "@/lib/RTK/slices/categories-slice";
import toast from "react-hot-toast";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { DeleteConfirm } from "@/components/delete-confirm";

interface DeleteActionsBtnsProps {
  dispatch: any;
  idsSelectedToDelete: string[];
  setIsLoading: any;
  table: any;
  isLoading: boolean;
  data: object[];
}
export default function DeleteActionsBtns({
  dispatch,
  table,
  setIsLoading,
  idsSelectedToDelete,
  data,
  isLoading,
}: DeleteActionsBtnsProps) {
  async function deleteSelected() {
    if (idsSelectedToDelete.length > 0) {
      setIsLoading(true);
      await dispatch(deleteCategory(idsSelectedToDelete));
      setIsLoading(false);
    } else {
      toast.error("No rows selected for deletion");
    }
    table.resetRowSelection(false);
    table.toggleAllRowsSelected(false);
  }

  async function deleteAllData() {
    if (data.length > 0) {
      setIsLoading(true);
      await dispatch(deleteAllCategories());
      setIsLoading(false);
    } else toast.error("No categories for deletion");
  }

  return (
    <>
      <div className="hidden gap-2 items-center sm:flex">
        <DeleteConfirm
          title="Are you sure to delete this product"
          onDelete={deleteSelected}
        >
          <Button
            className="flex items-center gap-1 text-[15px] h-[48px] leading-[1]"
            type="button"
            disabled={!(idsSelectedToDelete.length > 0) || isLoading}
          >
            <Trash2 className="w-4" />
            <span>{"Delete | " + idsSelectedToDelete.length}</span>
          </Button>
        </DeleteConfirm>
        <DeleteConfirm
          title="Are you sure to delete all products"
          onDelete={deleteAllData}
        >
          <Button
            className="flex items-center gap-1 text-[15px] h-[48px]   leading-[1]"
            type="button"
            disabled={isLoading || !data.length}
          >
            <Trash2 className="w-4" />
            <span>Delete all</span>
          </Button>
        </DeleteConfirm>
      </div>
      <div className="bg-slate-100 rounded-md px-2 py-1 sm:hidden">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="py-1 px-2 bg-white rounded-md flex items-center cursor-pointer">
              <span className="text-[12px]">Actions</span>
              <Button type="button" variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreVertical className="h-4 w-4" />
              </Button>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DeleteConfirm
              title="Are you sure to delete this product"
              onDelete={deleteSelected}
            >
              <DropdownMenuItem
                className="flex items-center gap-1 text-[15px] leading-[1]  bg-slate-200 mb-1  cursor-pointer"
                disabled={!(idsSelectedToDelete.length > 0) || isLoading}
              >
                <Trash2 className="w-4" />
                <span>{"Delete | " + idsSelectedToDelete.length}</span>
              </DropdownMenuItem>
            </DeleteConfirm>
            <DeleteConfirm
              title="Are you sure to delete all products"
              onDelete={deleteAllData}
            >
              <DropdownMenuItem
                className="flex items-center gap-1 text-[15px] leading-[1]  bg-slate-200 cursor-pointer"
                disabled={isLoading || !data.length}
              >
                <Trash2 className="w-4 " />
                <span>{"Delete all | " + data.length}</span>
              </DropdownMenuItem>
            </DeleteConfirm>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  );
}
