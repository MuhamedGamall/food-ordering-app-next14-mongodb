
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
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
    <div className="flex items-center gap-1">
      <Button
        className="text-[16px] py-1 px-2"
        type="button"
        variant={"outline"}
        size={"sm"}
      >
        <Link
          href={"/dashboard/menu-products/edit-product/" + row.original._id}
          className="flex items-center gap-1 text-[16px]"
        >
          <Edit className="w-4 h-4" />
          Edit
        </Link>
      </Button>

      <Button
        className="text-[16px] py-1 px-2"
        type="button"
        variant={"destructive"}
        size={"sm"}
      >
        <DeleteConfirm
          title="Are you sure to delete this product"
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
