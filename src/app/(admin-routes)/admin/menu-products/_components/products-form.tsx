"use client";

import axios from "axios";
import toast from "react-hot-toast";
import { useState } from "react";

import useProfile from "@/hooks/user-profile";

import { useRouter } from "next/navigation";
import HandleLoader from "@/components/loader";
import AddProductForm from "./add-product-form";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { postProduct } from "@/lib/RTK/slices/menu-products-slice";
import { uploadImage } from "@/lib/RTK/slices/upload-image-slice";
import ImageForm from "@/components/image-form";

export default function ProductForm() {
  const dispatch = useAppDispatch();
  // const { imageURL } = useAppSelector((state) => state);

  const [image64, setImage64] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { loading, data } = useProfile();

  const email = data?.email;
  const currentImage = image64;

  async function onSubmit(value: any) {
    try {
      if (!!image64 && Object.values({ value }).every((el) => !!el)) {
        setIsSubmitting(true);
        // && Object.values({ value }).every((el) => !!el)
        const data = await dispatch(
          uploadImage({
            image64,
            publicId: email,
            folderName: "food-ordering-products",
          })
        );
        const imageURL = await data?.payload;

        const values = {
          ...value,
          ...(imageURL && { image: imageURL }),
        };
        console.log(values);

        await dispatch(postProduct(values));
      } else {
        toast.error("Please fill all fields");
      }
    } catch (error: any) {
      toast.error("Somethig went wrong try again");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <div className="">
        <div className=" mx-auto relative max-w-full md:max-w-[80%]  flex gap-5 flex-col  sm:flex-nowrap flex-wrap">
          {(loading || isSubmitting) && <HandleLoader />}
          <div className="space-y-2 ">
            <h1 className="text-[50px]">Menu products</h1>
          </div>
          <div className="flex gap-5 sm:flex-nowrap flex-wrap">
            <ImageForm
              image64={image64}
              setImage64={setImage64}
              currentImage={currentImage}
              isSubmitting={isSubmitting}
            />
            <AddProductForm onSubmit={onSubmit} />
          </div>
        </div>
      </div>
    </>
  );
}
