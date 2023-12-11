import { v2 as cloudinaryV2 } from "cloudinary";

cloudinaryV2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
interface editUserAvatarProps {
  file: any;
  folderName: string;
  existingPublicId?: string;
}
export const editUserAvatar = async ({
  file,
  folderName,
  existingPublicId,
}: editUserAvatarProps): Promise<object> => {
  try {
    const uploadOptions: any = {
      folder: folderName,
      public_id: existingPublicId,
      overwrite: true,
      inavlidate: true,
    };

    // if (existingPublicId) {
    //   uploadOptions.public_id = existingPublicId;
    //   uploadOptions.overwrite = true;
    //   uploadOptions.inavlidate = true;
    // } else {
    //   // uploadOptions.folder = folderName;
    // }

    const result = await cloudinaryV2.uploader.upload(file, uploadOptions);
    return result;
    // {secure_url:''}
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);
    throw error;
  }
};
// ?
