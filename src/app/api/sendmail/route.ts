import EmailHelper from "@/backend/helpers/email";
import Emailstatus from "@/backend/models/emailStatus.model";
import connect from "@/backend/utils/database";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Connect to the database
    await connect();

    // Fetch all users
    const email = await Emailstatus.find();

    // Return the users as a JSON response
    return NextResponse.json(email);
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { message: "Failed to fetch users" },
      { status: 500 }
    );
  }
}

export const POST = async (req: Request) => {
  await connect();

  const { to, subject, description } = await req.json();

  interface SendEmailOptions {
    email: string;
    EmailSubject: string;
    EmailText?: string;
    EmailHTML?: string;
  }

  interface createEmail {
    EmailSubject: string;
  }

  const createEmail: createEmail = {
    EmailSubject: subject,
  };

  const email = await Emailstatus.create(createEmail);
  const x = description.concat(
    "",
    `<img src="${"http://localhost:3000"}/api/sendmail/${
      email?._id
    }" style="display:none;" alt="" />`
  );
  const emailOptions: SendEmailOptions = {
    email: to,
    EmailSubject: subject,
    EmailHTML: x,
  };

  EmailHelper.sendEmail(emailOptions)
    .then(async () => {
      await Emailstatus.findByIdAndUpdate(email?._id, {
        isEmailSent: true,
      });
    })
    .catch((err) => {
      console.log(err);
    });

  return NextResponse.json({ success: true });
};
