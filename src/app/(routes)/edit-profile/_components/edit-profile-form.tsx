"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";
import UploadImageForm from "./upload-image-form";
import axios from "axios";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import Username_EmailForm from "./username-email-form";
import { Ibarra_Real_Nova } from "next/font/google";

export default function EditProfileForm() {
  const session = useSession();
  const email = session.data?.user?.email as string;
  const currentUsername = session.data?.user?.name || email?.split("@")[0];
  const currentAvatar = session.data?.user?.image;
  const [name, setName] = useState("");

  const [avatar64, setAvatar64] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");

  const values = {
    name: name || currentUsername,
    image: avatarUrl || "",
  };
  async function onSubmit() {
    try {
      if (avatar64) {
        console.log("avatar64", typeof avatar64);
        const result: any = await axios.post("/api/upload", {
          image: avatar64,
        });
        const url = await result.data;

        setAvatarUrl(url);
        //
      }

      await axios.put("/api/edit-profile", values);
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
          {/* {isSubmitting && (
            <div className="absolute h-full w-full bg-slate-200/20 top-0 right-0 rounded-m flex items-center justify-center">
              <Loader className="animate-spin h-6 w-6 text-sky-700" />
            </div>
          )} */}
          <div className="flex gap-5 sm:flex-nowrap flex-wrap">
            <UploadImageForm avatar64={avatar64} setAvatar64={setAvatar64} />
            <Username_EmailForm name={name} setName={setName} />
          </div>
          <Button
            type="button"
            variant={"green"}
            // disabled={isSubmitting || !isValid || loading}
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
