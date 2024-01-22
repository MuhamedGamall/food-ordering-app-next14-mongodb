"use client";
import { useAppDispatch } from "@/hooks/redux";
import Add_EditCategoryForm from "./add&edit-category-form";
import AllCategorios from "./all-categorios-form";
import { editCategory, postCategory } from "@/lib/RTK/slices/categories-slice";
import ImageForm from "@/components/image-form";
import { useState } from "react";
import { uploadImage } from "@/lib/RTK/slices/upload-image-slice";
import toast from "react-hot-toast";
import { InitCategoryState } from "../../../../../types";
import PageHeader from "@/components/page-header";
import HandleLoader from "@/components/loader";

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
    <div className="sm:w-[90%] max-w-[80rem] mx-auto mt-5 p-5 relative">
      {isSubmitting && <HandleLoader />}
      <div className="mx-auto">
        <div className="mb-5">
          <PageHeader title={isEditMood ? "EDIT CATEGORY" : "ADD CATEGORY"} className="my-5"/>
          <div className="flex sm:items-end items-center gap-5 sm:flex-row flex-col">
            <div className="w-[250px]">
              <ImageForm
                image64={image64}
                setImage64={setImage64}
                currentImage={currentImage}
                isSubmitting={isSubmitting}
              />
            </div>
            <Add_EditCategoryForm onAdd={onSubmit} editData={editMood} />
          </div>
        </div>
        <AllCategorios setEditMood={setEditMood} editMood={editMood} />
      </div>
    </div>
  );
}
