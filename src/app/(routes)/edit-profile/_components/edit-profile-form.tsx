"use client";

import ImageForm from "../../../../components/image-form";
import axios from "axios";
import toast from "react-hot-toast";
import { useState } from "react";

import useProfile from "@/hooks/user-profile";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import ProfileFormInputs from "./profile-form-inputs";
import HandleLoader from "@/components/loader";
import { uploadImage } from "@/lib/RTK/slices/upload-image-slice";
import { postProduct } from "@/lib/RTK/slices/menu-products-slice";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { PayloadAction } from "@reduxjs/toolkit";

export default function EditProfileForm() {
  const router = useRouter();

  const dispatch = useAppDispatch();

  const [image64, setImage64] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { loading, data } = useProfile();

  const email = data?.email;
  const currentImage = image64 || data?.image || "/avatar/avatar.jpeg";

  async function onSubmit(value: any) {
    try {
      if (!!value?.name) {
        setIsSubmitting(true);
        // && Object.values({ value }).every((el) => !!el)
        let imageURL = "";
        if (!!image64) {
          const data = await dispatch(
            uploadImage({
              image64,
              publicId: email,
              folderName: "food-ordering-users",
            })
          );
          imageURL = await data?.payload;
        }

        const values = {
          ...value,
          ...(imageURL && { image: imageURL }),
        };
        console.log(values);
        
        // if (Object.values({ values }).every((el) => !!el)) {
        // }
        (await axios.patch("/api/edit-profile", values)).data;
        toast.success("Product added");
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
            <h1 className="text-[50px]">Profile</h1>
          </div>
          <div className="flex gap-5 sm:flex-nowrap flex-wrap">
            <ImageForm
              image64={image64}
              setImage64={setImage64}
              currentImage={currentImage}
              isSubmitting={isSubmitting}
            />
            <ProfileFormInputs onSubmit={onSubmit} />
          </div>
        </div>
      </div>
    </>
  );
}
