import EmailHelper from "@/backend/helpers/email";
import Emailstatus from "@/backend/models/emailStatus.model";
import connect from "@/backend/utils/database";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Connect to the database
    await connect();

    // Fetch all email statuses
    const emails = await Emailstatus.find();

    // Return the email statuses as a JSON response
    return NextResponse.json(emails);
  } catch (error) {
    console.error("Error fetching emails:", error);
    return NextResponse.json(
      { message: "Failed to fetch emails" },
      { status: 500 }
    );
  }
}

export const POST = async (req: Request) => {
  try {
    await connect();

    const { to, subject, description } = await req.json();

    interface SendEmailOptions {
      email: string;
      EmailSubject: string;
      EmailText?: string;
      EmailHTML?: string;
    }

    interface CreateEmail {
      EmailSubject: string;
    }

    const createEmail: CreateEmail = {
      EmailSubject: subject,
    };

    // Create a new email status entry
    const emailStatus = await Emailstatus.create(createEmail);
    
    // Construct the email body with tracking image
    const emailHTML = `${description}<img src="https://email-sender-lac-five.vercel.app/api/sendmail/${emailStatus._id}" style="display:none;" alt="" />`;

    const emailOptions: SendEmailOptions = {
      email: to,
      EmailSubject: subject,
      EmailHTML: emailHTML,
    };

    // Send the email
    await EmailHelper.sendEmail(emailOptions);
    
    // Update the email status as sent
    await Emailstatus.findByIdAndUpdate(emailStatus._id, {
      isEmailSent: true,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { message: "Failed to send email" },
      { status: 500 }
    );
  }
};
