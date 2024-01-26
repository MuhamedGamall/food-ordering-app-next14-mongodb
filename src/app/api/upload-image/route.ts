import { NextRequest, NextResponse } from "next/server";
import { uploadImageToCloudinary } from "@/utils/cloudinary";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-option";
export async function POST(req: NextRequest) {
  try {
    const {
      image: { image64, publicId,folderName},
    } = await req.json();

    if (!image64) {
      return new NextResponse("Image not found", { status: 404 });
    }
    const session = await getServerSession(authOptions);
    const user = session?.user;

    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const uploadImage: any = await uploadImageToCloudinary({
      file: image64,
      existingPublicId:publicId,
      folderName,
    });
    const url = uploadImage.secure_url;
    return NextResponse.json(url);
  } catch (error) {
    console.log(error);
    return new NextResponse(error + "", { status: 500 });
  }
}
