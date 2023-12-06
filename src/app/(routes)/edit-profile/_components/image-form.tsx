import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";

interface ImageFormProps {
  onChange: (e: any) => any;
  avatarUrl: string;
}

export default function ImageForm({ onChange, avatarUrl }: ImageFormProps) {
  return (
    <>
      <div className="w-fit flex flex-col gap-2">
        <div className="flex flex-col items-center justify-center gap-2  w-fit ">
          <Image
            src={avatarUrl}
            alt="avatar"
            width={250}
            height={250}
            className="w-[140px] max-w-full rounded-md"
          />
        </div>
        <form onChange={(e) => onChange(e)}>
          <Label
            htmlFor="upload"
            className="hover:bg-slate-200 bg-slate-100 flex justify-center items-center w-full p-2 transition text-center rounded-md"
          >
            Change photo
          </Label>
          <Input
            name="image"
            id="upload"
            type="file"
            className="hidden"
            accept="image/*"
          />
        </form>
      </div>
    </>
  );
}
