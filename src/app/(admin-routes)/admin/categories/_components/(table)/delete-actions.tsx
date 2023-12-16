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
        <Button
          className="flex items-center gap-1 text-[13px] px-[7px]  leading-[1]"
          onClick={deleteSelected}
          type="button"
          disabled={!(idsSelectedToDelete.length > 0) || isLoading}
        >
          <Trash2 className="w-4" />
          <span>{"Delete | " + idsSelectedToDelete.length}</span>
        </Button>
        <Button
          className="flex items-center gap-1 text-[13px] px-[7px]   leading-[1]"
          onClick={deleteAllData}
          type="button"
          disabled={isLoading || !data.length}
        >
          <Trash2 className="w-4" />
          <span>Delete all</span>
        </Button>
      </div>
      <div className="bg-white sm:hidden">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button type="button" variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="flex items-center gap-1 text-[15px] leading-[1]  bg-slate-200 mb-1  cursor-pointer"
              disabled={!(idsSelectedToDelete.length > 0) || isLoading}
              onClick={deleteSelected}
            >
              <Trash2 className="w-4" />
              <span>{"Delete | " + idsSelectedToDelete.length}</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="flex items-center gap-1 text-[15px] leading-[1]  bg-slate-200 cursor-pointer"
              disabled={isLoading || !data.length}
              onClick={deleteAllData}
            >
              <Trash2 className="w-4 " />
              <span>{"Delete all | " + data.length}</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  );
}
