"use client";

import ImageForm from "./image-form";
import axios from "axios";
import toast from "react-hot-toast";
import { useState } from "react";

import useProfile from "@/hooks/user-profile";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import ProfileFormInputs from "./profile-form-inputs";

export default function EditProfileForm() {
  const router = useRouter();
  const [avatar64, setAvatar64] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { loading, data } = useProfile();

  const email = data?.email;
  const currentAvatar = avatar64 || data?.image || "/avatar/avatar.jpeg";

  async function onSubmit(value: any) {
    try {
      setIsSubmitting(true);

      // post avatar to cloudinary
      const { data: avatarUrl } = avatar64
        ? await axios.post("/api/upload-avatar", {
            image: { avatar64, publicId: email },
          })
        : { data: "" };

      const values = {
        ...value,
        ...(avatarUrl && { image: avatarUrl }),
      };

      // edit profile
      await axios.patch("/api/edit-profile", values);
      router.refresh();
      toast.success("Profile updated");
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
          {(loading || isSubmitting) && (
            <div className="absolute h-full w-full bg-slate-200/20 top-0 right-0 rounded-m flex items-center justify-center">
              <Loader className="animate-spin h-6 w-6 text-sky-700" />
            </div>
          )}
          <div className="space-y-2 ">
            <h1 className="text-[50px]">Profile</h1>
          </div>
          <div className="flex gap-5 sm:flex-nowrap flex-wrap">
            <ImageForm
              avatar64={avatar64}
              setAvatar64={setAvatar64}
              currentAvatar={currentAvatar}
              isSubmitting={isSubmitting}
            />
            <ProfileFormInputs onSubmit={onSubmit} />
          </div>
        </div>
      </div>
    </>
  );
}
