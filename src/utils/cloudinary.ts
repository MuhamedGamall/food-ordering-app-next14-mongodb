import { v2 as cloudinaryV2 } from "cloudinary";

cloudinaryV2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
interface uploadImageToCloudinaryProps {
  file?: any;
  folderName?: string;
  existingPublicId?: string;
  isDeleting?: boolean;
}
export const uploadImageToCloudinary = async ({
  file,
  folderName,
  existingPublicId,
}: uploadImageToCloudinaryProps): Promise<object> => {
  try {
    const uploadOptions: any = {
      folder: folderName,
      public_id: existingPublicId,
      overwrite: true,
      inavlidate: true,
    };

    const result = await cloudinaryV2.uploader.upload(file, uploadOptions);
    return result;
  } catch (error) {
    console.error("Error Cloudinary: upload ", error);
    throw error;
  }
};

// interface DeleteUserAvatarProps {
//   existingPublicId: string;
//   folderName: string;
// }

// export const DeleteUserAvatar = async ({
//   existingPublicId,
//   folderName,
// }: DeleteUserAvatarProps): Promise<void> => {
//   try {
//     const uploadOptions: any = {
//       folder: folderName,
//       inavlidate: true,
//     };

//     await cloudinaryV2.uploader.destroy(existingPublicId, uploadOptions);
//   } catch (error) {
//     console.error("Error Cloudinary: delete ", error);
//     throw error;
//   }
// };
