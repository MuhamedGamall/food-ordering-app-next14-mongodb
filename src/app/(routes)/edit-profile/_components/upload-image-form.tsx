import { useSession } from "next-auth/react";
import ImageForm from "./image-form";
import imageCompression from "browser-image-compression";
import toast from "react-hot-toast";
import axios from "axios";
export default function UploadImageForm() {
  const session = useSession();
  const avatarUrl = session.data?.user?.image || "/avatar/avatar.jpeg";

  async function onChange(event: any) {
    const imageFile = event.target.files[0];
    const options = {
      maxSizeMB: 30,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };
    try {
      if (imageFile) {
        const compressedFile = await imageCompression(imageFile, options);
        const data = new FormData();
        data.set("userImage", compressedFile);

        await axios.post("/api/upload", data);
        toast.success("Profile updated");
      }
    } catch (error: any) {
      if (
        !imageFile.type.startsWith("image") ||
        imageFile.type === "image/NEF"
      ) {
        toast.error("This type of file is not supported");
      }
      toast.error("Somethig went worng");
    }
  }

  return <ImageForm onChange={onChange} avatarUrl={avatarUrl} />;
}
