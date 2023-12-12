import { NextRequest, NextResponse } from "next/server";
import { editUserAvatar } from "@/utils/cloudinary";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { User } from "@/models/User";

export async function POST(req: NextRequest) {
  try {
    const folderName = "food-ordering-users";
    const {
      image: { avatar64, publicId },
    } = await req.json();
    if (!avatar64) {
      return new NextResponse("Image not found", { status: 404 });
    }
    const session = await getServerSession(authOptions);
    const email = session?.user?.email;
    const user = await User.findOne({ email });

    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const uploadAvatar: any = await editUserAvatar({
      file: avatar64,
      existingPublicId:publicId,
      folderName,
    });
    const url = uploadAvatar.secure_url;
    return NextResponse.json(url);
  } catch (error) {
    console.log(error);
    return new NextResponse(error + "", { status: 500 });
  }
}
