import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  console.log('upload body',await req.formData());
  const data = await req.formData()
  const userImage = data.get('userImage')
  if (userImage) {
    // TODO: upload logic here
  }
  return NextResponse.json(true);
}
