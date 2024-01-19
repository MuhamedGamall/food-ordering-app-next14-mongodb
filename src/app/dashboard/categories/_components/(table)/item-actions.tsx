import React from "react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Edit, MoreHorizontal, Trash2, X } from "lucide-react";
import { InitProductState } from "../../../../../../types";
import { DeleteConfirm } from "@/components/delete-confirm";
interface ItemActionsProps {
  handleEditClick: (id: string, item: InitProductState) => void;
  isEditing: (id: string) => boolean;
  handleDeleteClick: (id: string) => void;
  row: any;
}
export default function ItemActions({
  handleDeleteClick,
  handleEditClick,
  isEditing,
  row,
}: ItemActionsProps) {
  return (
    <div className="flex items-center gap-1">
      <Button
        onClick={() => handleEditClick(row.id, row?.original)}
        className="text-[16px] py-1 px-2"
        type="button"
        variant={"outline"}
        size={"sm"}
      >
        {isEditing(row?.id) ? (
          <div className="flex items-center gap-1 ">
            <X className="w-4 h-4" />
            Leave
          </div>
        ) : (
          <div className="flex items-center gap-1 ">
            <Edit className="w-4 h-4" />
            Edit
          </div>
        )}
      </Button>

      <Button
        className="text-[16px] py-1 px-2"
        type="button"
        variant={"destructive"}
        size={"sm"}
        disabled={isEditing(row?.id)}
      >
        <DeleteConfirm
          title="Are you sure to delete this category"
          onDelete={() => handleDeleteClick(row.original._id)}
        >
          <div className="flex items-center gap-1 ">
            <Trash2 className="w-4 h-4" />
            Delete
          </div>
        </DeleteConfirm>
      </Button>
    </div>
  );
}
