"use client";

import ImageForm from "../../../../components/image-form";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";
import ProfileFormInputs from "./profile-form-inputs";
import HandleLoader from "@/components/loader";
import { uploadImage } from "@/lib/RTK/slices/upload-image-slice";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { editProfile, getProfile } from "@/lib/RTK/slices/users-slice";
import { useSession } from "next-auth/react";
import useProfile from "@/hooks/user-profile";

export default function EditProfileForm() {
  const dispatch = useAppDispatch();

  const [image64, setImage64] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data, loading } = useProfile();
  console.log(data);

  const email = data?.email;
  const currentImage = image64 || data?.image || "/avatar/avatar.jpeg";

  async function onSubmit(value: any) {
    if (!!value?.name) {
      setIsSubmitting(true);
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
      await dispatch(editProfile(values));
    }
    setIsSubmitting(false);
  }

  return (
    <>
      <div className="">
        <div className=" mx-auto relative  max-w-full md:max-w-[80%]  flex gap-5 flex-col  sm:flex-nowrap flex-wrap">
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
            <ProfileFormInputs onSubmit={onSubmit} data={data} />
          </div>
        </div>
      </div>
    </>
  );
}
