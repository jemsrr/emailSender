import Emailstatus from "@/backend/models/emailStatus.model";
import connect from "@/backend/utils/database";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id?: string } }
) {
  try {
    await connect();
console.log(params)
    if (params?.id) {
      const email = await Emailstatus.findById(params.id);
      if (!email) {
        return NextResponse.json({ error: "Email not found" }, { status: 404 });
      }

      if (!email?.isEmailSeen) {
        console.log("object123456");
        const x = await Emailstatus.findByIdAndUpdate(params.id, { isEmailSeen: true });
        console.log(x,"Xxxxxxx")
      }

      return NextResponse.json({ message: "success", email });
    }
  } catch (error: unknown) {
    console.error("Error fetching emails:", error);
    return NextResponse.json(
      { message: "Failed to fetch emails", error },
      { status: 500 }
    );
  }
}
