// import { NextRequest, NextResponse } from "next/server";

// import { getServerSession } from "next-auth";
// import { authOptions } from "../auth/[...nextauth]/route";
// import { User } from "@/models/User";
// import { DeleteUserAvatar } from "@/utils/cloudinary";

// export async function DELETE(req: NextRequest) {
//   try {
//     const session = await getServerSession(authOptions);
//     const email: any = session?.user?.email;
//     const user = await User.findOne({ email });
//     const folderName = "food-ordering-users";

//     if (!user) {
//       return new NextResponse("Unauthorized", { status: 401 });
//     }
//     if (user?.image?.length === 0) {
//       return new NextResponse("Image not found", { status: 404 });
//     } else {
//       await DeleteUserAvatar({
//         folderName: folderName,
//         existingPublicId: email,
//       });
//       return NextResponse.json(true);
//     }
//   } catch (error) {
//     console.log(error);
//     return new NextResponse(error + "", { status: 500 });
//   }
// }
