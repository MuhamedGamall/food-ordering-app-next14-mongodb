import { NextRequest, NextResponse } from "next/server";
import { editUserAvatar } from "@/utils/cloudinary";

export async function POST(req: NextRequest) {
  try {
    const avatar = await req.json();
    if (!avatar) {
      return new NextResponse("Image not found", { status: 404 });
    }
    const result = await editUserAvatar(avatar.image, "food-ordering-users");
    return NextResponse.json(result);
  } catch (error) {
    console.log("error");
    return new NextResponse(error + "", { status: 401 });
  }
}
