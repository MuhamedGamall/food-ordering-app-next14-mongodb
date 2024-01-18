"use client";

import ImageForm from "../../../../components/image-form";
import {  useState } from "react";

import ProfileFormInputs from "./profile-form-inputs";
import HandleLoader from "@/components/loader";
import { uploadImage } from "@/lib/RTK/slices/upload-image-slice";
import { useAppDispatch,  } from "@/hooks/redux";
import { editProfile,  } from "@/lib/RTK/slices/users-slice";
import useProfile from "@/hooks/user-profile";
import PageHeader from "@/components/page-header";

export default function EditProfileForm() {
  const dispatch = useAppDispatch();

  const [image64, setImage64] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data, loading } = useProfile();

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
      <div className=" flex gap-5 flex-col  sm:flex-nowrap flex-wrap relative">
        {(loading || isSubmitting) && <HandleLoader />}
        <PageHeader title="PROFILE" />
        <div className="flex gap-5 sm:flex-nowrap flex-wrap">
          <div className="w-[250px]">
            <ImageForm
              image64={image64}
              setImage64={setImage64}
              currentImage={currentImage}
              isSubmitting={isSubmitting}
            />
          </div>
          <ProfileFormInputs onSubmit={onSubmit} data={data} />
        </div>
      </div>
    </>
  );
}
