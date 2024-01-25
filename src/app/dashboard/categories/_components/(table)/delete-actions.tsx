import { Button } from "@/components/ui/button";
import React from "react";
import {Trash2 } from "lucide-react";
import {
  deleteAllCategories,
  deleteCategory,
} from "@/lib/RTK/slices/categories-slice";
import toast from "react-hot-toast";

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
      <div className=" gap-2 items-center flex">
        <DeleteConfirm
          title="Are you sure to delete this product"
          onDelete={deleteSelected}
        >
          <Button
            className="flex items-center gap-1 text-[15px] h-[48px]  leading-[1]"
            type="button"
            disabled={!(idsSelectedToDelete.length > 0) || isLoading}
          >
            <Trash2 className="w-4 hidden sm:block" />
            <span>{"Delete | " + idsSelectedToDelete.length}</span>
          </Button>
        </DeleteConfirm>
        <DeleteConfirm
          title="Are you sure to delete all categories"
          onDelete={deleteAllData}
        >
          <Button
            className="flex items-center gap-1 text-[15px] h-[48px]   leading-[1]"
            type="button"
            disabled={isLoading || !data.length}
          >
            <Trash2 className="w-4 hidden sm:block" />
            <span>Delete all</span>
          </Button>
        </DeleteConfirm>
      </div>
    </>
  );
}
