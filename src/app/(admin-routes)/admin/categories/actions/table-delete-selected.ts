import { deleteCategory } from "@/lib/RTK/slices/categories-slice";
import toast from "react-hot-toast";

interface DeleteSelectedProps {
  dispatch: any;
  idsSelectedToDelete: string[];
  setIsLoading: any;
  table: any;
  allIdsToDelete: string[];
}
export default async function deleteSelected({
  dispatch,
  idsSelectedToDelete,
  setIsLoading,
  table,
  allIdsToDelete,
}: DeleteSelectedProps) {
  if (idsSelectedToDelete.length > 0) {
    try {
      setIsLoading(true);
      //delete single
      if (idsSelectedToDelete.length === 1) {
        dispatch(deleteCategory(idsSelectedToDelete?.[0]));
      }
      //delete all data
      if (allIdsToDelete.length === idsSelectedToDelete.length) {
        dispatch(deleteCategory(allIdsToDelete));
      }
      //delete all selected
      dispatch(deleteCategory(idsSelectedToDelete));

      // );
    } catch (error) {
      console.error("[CATEGORIES]", error);
      toast.error("Error deleting selected rows");
    } finally {
      setIsLoading(false);
    }
    table.resetRowSelection(false);
    table.toggleAllRowsSelected(false);
  } else {
    toast.error("No rows selected for deletion");
  }
}
