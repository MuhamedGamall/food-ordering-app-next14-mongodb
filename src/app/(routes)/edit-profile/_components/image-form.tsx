import imageCompression from "browser-image-compression";
import toast from "react-hot-toast";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

import Image from "next/image";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "../../../../lib/utils";

// import deleteAvatar from "../actions/delete-avatar";

interface UploadImageFormProps {
  avatar64: any;
  setAvatar64: Dispatch<SetStateAction<any>>;
  currentAvatar: string;
  isSubmitting: boolean;
}
export default function ImageForm({
  avatar64,
  setAvatar64,
  currentAvatar,
  isSubmitting,
}: UploadImageFormProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    setIsDeleting(false);
  }, [avatar64]);

  const avatarUrl = !isDeleting ? currentAvatar : "/avatar/avatar.jpeg";
  async function onChange(event: any) {
    const imageFile = event.target.files?.[0];
    const options = {
      maxSizeMB: 3,
      maxWidthOrHeight: 2000,
      useWebWorker: true,
    };

    if (imageFile) {
      try {
        const compressedFile = await imageCompression(imageFile, options);

        // reader image
        const reader = new FileReader();
        reader.readAsDataURL(compressedFile);
        reader.onloadend = () => {
          setAvatar64(reader.result);
        };
      } catch (error) {
        if (
          !imageFile.type.startsWith("image") ||
          imageFile.type === "image/NEF"
        ) {
          toast.error("This type of file is not supported");
        } else {
          toast.error("Something went wrong while uploading");
        }
        console.log(error);
      }
    }
  }
  function onDelete(e: any) {
    e.preventDefault();
    setIsDeleting(true);
    setAvatar64('')
  }
  return (
    <div className="relative w-[140px] flex flex-col gap-2">
      <div className="flex flex-col items-center justify-center gap-2  w-fit ">
        <Image
          src={avatarUrl}
          alt="avatar"
          width={250}
          height={250}
          className="w-[140px] max-w-full rounded-md aspect-[1] object-cover"
        />
      </div>
      <form onChange={(e) => onChange(e)}>
        <div className="flex items-center gap-2  sm:flex-nowrap flex-wrap-reverse ">
          <Button
            onClick={onDelete}
            className={cn(
              !isDeleting
                ? " hover:bg-red-200 bg-slate-100 text-red-800 w-full  sm:p-3 p-2 transition text-center rounded-md h-full"
                : "hidden"
            )}
          >
            Delete
          </Button>
          <Label
            htmlFor="upload"
            className="cursor-pointer   hover:bg-slate-200 bg-slate-100 flex justify-center items-center w-full sm:p-2 p-5  transition text-center rounded-md"
          >
            Change photo
          </Label>
        </div>
        <Input
          disabled={isSubmitting}
          name="image"
          id="upload"
          type="file"
          className="hidden"
          accept="image/*"
        />
      </form>
    </div>
  );
}
