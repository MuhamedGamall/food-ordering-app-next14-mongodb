import { useAppDispatch } from "@/hooks/redux";
import AddCategoryForm from "./add-category-form";
import AllCategorios from "./all-categorios-form";
import { postCategory } from "@/lib/RTK/slices/categories-slice";

export default function CatigoiesForm() {
  const dispatch = useAppDispatch();
  async function onAdd(value: string,form:any) {
    if (value?.length !== 0) {
      await dispatch(postCategory(value));
      form.setValue("title", "");
    }
  }
  return (
    <>
      <div className="mx-auto  max-w-full md:max-w-[80%]  ">
        <div className="mb-5">
          <div className="space-y-2 ">
            <h1 className="text-[45px]">Add Category</h1>
          </div>
          <AddCategoryForm onAdd={onAdd} />
          <AllCategorios />
        </div>
      </div>
    </>
  );
}
