import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers"; // ✅ Correct way to access cookies in App Router

export async function GET(req: NextRequest) {
  const cookieStore = cookies(); 
  const currentUser = (await cookieStore).get("currentUser")?.value;

  if (!currentUser) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const user = JSON.parse(currentUser);
    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Invalid cookie format" },
      { status: 400 }
    );
  }
}
