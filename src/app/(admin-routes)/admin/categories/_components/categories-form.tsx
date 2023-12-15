
import AddCategoryForm from "./add-category-form";
import AllCategorios from "./all-categorios-form";
import ForceRefresh from "./lol";
export default function CatigoiesForm() {
  return (
    <>

      <div className="">
        <div className="mx-auto relative max-w-full md:max-w-[80%]  flex gap-5 flex-col  sm:flex-nowrap flex-wrap">
          <div className="mb-5">
            <div className="space-y-2 ">
              <h1 className="text-[45px]">Add Category</h1>
            </div>
            <AddCategoryForm />
            <AllCategorios />
          </div>
        </div>
      </div>
    </>
  );
}
