import { Button } from "@/components/ui/button";
import React from "react";
import deleteSelected from "../../actions/table-delete-selected";
import { Trash2 } from "lucide-react";
import { deleteCategory } from "@/lib/RTK/slices/categories-slice";
interface DeleteActionsBtnsProps {
  dispatch: any;
  idsSelectedToDelete: string[];
  setIsLoading: any;
  table: any;
  isLoading: boolean;
  data:object[];
}
export default function DeleteActionsBtns({
  dispatch,
  table,
  setIsLoading,
  idsSelectedToDelete,
  data,
  isLoading,
}: DeleteActionsBtnsProps) {
  const allIdsToDelete =data.map((el:any)=>el._id)

  return (
    <>
      <Button
        className="flex items-center gap-1 text-[15px]"
        onClick={async () => {
          await deleteSelected({
            dispatch,
            table,
            setIsLoading,
            idsSelectedToDelete,
            allIdsToDelete
          });
        }}
        type="button"
        disabled={!(idsSelectedToDelete.length > 0) || isLoading}
      >
        <Trash2 className="w-4" />
        {"Delete " + idsSelectedToDelete.length + " select"}
      </Button>
      <Button
        className="flex items-center gap-1 text-[15px]"
        onClick={() => {
          dispatch(deleteCategory([""]));
        }}
        type="button"
        disabled={isLoading || !data.length}
      >
        <Trash2 className="w-4" />
        {"Delete all | " + data.length}
      </Button>
    </>
  );
}
