"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import UploadImageForm from "./upload-image-form";
import axios from "axios";
import toast from "react-hot-toast";
import {  useState } from "react";
import Username_EmailForm from "./username-email-form";
import { useProfile } from "@/hooks/user-profile";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
export default function EditProfileForm() {
  const [name, setName] = useState("");
  const [avatar64, setAvatar64] = useState("");

  const { loading, data } = useProfile();

  const router = useRouter();

  const email = data?.email;
  const currentName = data?.name || email?.split("@")[0];
  const currentAvatar = avatar64 || data?.image || '/avatar/avatar.jpeg'
  async function onSubmit() {
    try {
      const { data: avatarUrl } = avatar64
        ? await axios.post("/api/upload", {
            image: { avatar64, publicId: email },
          })
        : { data: "" };
      const values = {
        name: name || currentName,
        ...(avatarUrl && { image: avatarUrl }),
      };
      router.refresh();
      await axios.patch("/api/edit-profile", values);
      toast.success("Profile updated");
    } catch (error: any) {
      console.log(error);
    }
  }

  return (
    <>
      <div className="sm:w-[80%] max-w-[80rem] mx-auto  mt-5 p-5">
        <div className="space-y-1 mb-5">
          <h1 className="text-[40px] ">Profile</h1>
        </div>
        <div className=" mx-auto relative max-w-full md:max-w-[80%]  flex gap-5 flex-col  sm:flex-nowrap flex-wrap">
          {loading && (
            <div className="absolute h-full w-full bg-slate-200/20 top-0 right-0 rounded-m flex items-center justify-center">
              <Loader className="animate-spin h-6 w-6 text-sky-700" />
            </div>
          )}
          <div className="flex gap-5 sm:flex-nowrap flex-wrap">
            <UploadImageForm
              avatar64={avatar64}
              setAvatar64={setAvatar64}
              currentAvatar={currentAvatar}
            />
            <Username_EmailForm
              currentName={currentName}
              name={name}
              setName={setName}
            />
          </div>
          <Button
            type="button"
            variant={"green"}
            disabled={loading}
            onClick={onSubmit}
            className={cn("  text-2xl text-center rounded-full  mt-5 w-fit")}
          >
            Save
          </Button>
        </div>
      </div>
    </>
  );
}
