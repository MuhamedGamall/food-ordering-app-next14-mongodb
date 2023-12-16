import { User } from "@/models/User";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

import { MenuProduct } from "@/models/MenuProducts";

export async function POST(req: NextRequest) {
  mongoose.connect(process.env.MONGO_URL!);
  try {
    const product = await req.json();

    const session = await getServerSession(authOptions);
    const email = session?.user?.email;
    const user = await User.findOne({ email });

    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    // if ([...product].every((el) => !!el)) {
    //   return new NextResponse("Not Found", { status: 404 });
    // }
    const createProduct = await MenuProduct.create(product);
    return NextResponse.json(createProduct);
  } catch (error) {
    console.log("[ADD-PRODUCTT]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

// export async function GET(req: NextRequest) {
//   mongoose.connect(process.env.MONGO_URL!);
//   try {
//     const session = await getServerSession(authOptions);
//     const email = session?.user?.email;

//     const user: any = await User.findOne({ email }).lean();
//     const userInfos = await UserInfos.findOne({ email }).lean();
//     const fullData = { ...user, ...userInfos };

//     if (!fullData) {
//       return new NextResponse("Unauthorized", { status: 401 });
//     }

//     return NextResponse.json(fullData);
//   } catch (error) {
//     console.log("[EDIT-PROFILE]", error);
//     return new NextResponse("Internal Error", { status: 500 });
//   }
// }
