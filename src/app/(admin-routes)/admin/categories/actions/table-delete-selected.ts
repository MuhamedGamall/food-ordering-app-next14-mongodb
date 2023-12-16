import { deleteCategory } from "@/lib/RTK/slices/categories-slice";
import toast from "react-hot-toast";

interface DeleteSelectedProps {
  dispatch: any;
  idsSelectedToDelete: string[];
  setIsLoading: any;
  table: any;

}
export default async function deleteSelected({
  dispatch,
  idsSelectedToDelete,
  setIsLoading,
  table,

}: DeleteSelectedProps) {
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
