import imageCompression from "browser-image-compression";
import toast from "react-hot-toast";
import { Dispatch, SetStateAction } from "react";

import Image from "next/image";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface UploadImageFormProps {
  image64: any;
  setImage64: Dispatch<SetStateAction<any>>;
  currentImage: string;
  isSubmitting: boolean;
}
export default function ImageForm({
  image64,
  setImage64,
  currentImage,
  isSubmitting,
}: UploadImageFormProps) {
  async function onChange(event: any) {
    const imageFile = event.target.files?.[0];
    const options = {
      maxSizeMB: 1,
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
          setImage64(reader.result);
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

  return (
    <div className="relative w-full flex flex-col gap-2">
      <div className="flex flex-col items-center justify-center gap-2  w-fit ">
        <Image
          src={currentImage}
          alt="image"
          width={250}
          height={250}
          loading="lazy"
          className="w-full rounded-md aspect-[1] object-cover"
        />
      </div>
      <form onChange={(e) => onChange(e)}>
        <div className="flex items-center gap-2  sm:flex-nowrap flex-wrap-reverse ">
          <Label
            htmlFor="upload"
            className="cursor-pointer max-w-[250px]   hover:bg-slate-200 bg-slate-100 flex justify-center items-center w-full  p-2  transition text-center rounded-md"
          >
            Edit photo
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
