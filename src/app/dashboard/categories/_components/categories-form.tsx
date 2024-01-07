import { useAppDispatch } from "@/hooks/redux";
import Add_EditCategoryForm from "./add&edit-category-form";
import AllCategorios from "./all-categorios-form";
import { editCategory, postCategory } from "@/lib/RTK/slices/categories-slice";
import ImageForm from "@/components/image-form";
import { useState } from "react";
import { uploadImage } from "@/lib/RTK/slices/upload-image-slice";
import toast from "react-hot-toast";
import { InitCategoryState } from "../../../../../types";

export default function CatigoiesForm() {
  const dispatch = useAppDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editMood, setEditMood] = useState<InitCategoryState | null>(null);
  const [image64, setImage64] = useState("");

  const currentImage =
    image64 || editMood?.image || "/product-placeholder/th.jpeg";

  const isEditMood = Boolean(editMood);
  const check = (value: { title: string }) => {
    return isEditMood
      ? Object.values({ value, image64 }).some(Boolean)
      : Object.values({ value, image64 }).every(Boolean);
  };
  async function onSubmit(value: { title: string }, form: any) {
    if (check(value)) {
      setIsSubmitting(true);

      const data =
        image64 &&
        (await dispatch(
          uploadImage({
            image64: image64,
            publicId: "category",
            folderName: "food-ordering-categories",
          })
        ));

      const imageURL = (await data?.payload) || editMood?.image;
      const values = {
        ...value,
        ...(imageURL && { image: imageURL }),
        _id: editMood?._id,
      };

      Boolean(editMood)
        ? await dispatch(editCategory(values))
        : await dispatch(postCategory(values));

      form.setValue("title", "");
      setIsSubmitting(false);
      setEditMood(null);
      setImage64("");
    } else toast.error("Please full fill the form");
  }
  return (
    <>
      <section className="mx-auto  max-w-full md:max-w-[80%]  ">
        <div className="mb-5">
          <div className="space-y-2 ">
            <h1 className="text-[45px]">
              {isEditMood ? "Edit category" : "Add categories"}
            </h1>
          </div>
          <div className="flex items-center flex-col-reverse">
            <Add_EditCategoryForm onAdd={onSubmit} editData={editMood} />
            <div className="w-[250px]">
              <ImageForm
                image64={image64}
                setImage64={setImage64}
                currentImage={currentImage}
                isSubmitting={isSubmitting}
              />
            </div>
          </div>
        </div>
        <AllCategorios setEditMood={setEditMood} editMood={editMood} />
      </section>
    </>
  );
}