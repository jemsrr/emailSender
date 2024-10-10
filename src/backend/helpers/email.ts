import nodemailer from "nodemailer";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.SMTP_EMAIL,
    pass: process.env.SMTP_PASSWORD,
  },
});

interface Attachment {
  filename: string;
  path: string;
  contentType?: string;
}

interface SendEmailOptions {
  email: string;
  EmailSubject: string;
  EmailText?: string;
  EmailHTML?: string;
  attachment?: Attachment[]; // Adding a better type for attachments
}

const EmailHelper = {
  sendEmail: async ({
    email,
    EmailSubject,
    EmailText,
    EmailHTML,
    attachment = [],
  }: SendEmailOptions): Promise<unknown> => {
    try {
      if (!email) {
        throw new Error("No recipients defined");
      }

      if (!emailRegex.test(email)) {
        throw new Error("Invalid email format");
      }

      const mailOptions = {
        from: process.env.SMTP_EMAIL,
        to: email,
        subject: EmailSubject,
        text: EmailText,
        html: EmailHTML,
        attachments: attachment.length > 0 ? attachment : undefined, // Conditionally add attachments
      };

      const info = await transporter.sendMail(mailOptions);
      console.log("Email sent: ", info);
      return info;
    } catch (error) {
      console.error("Error sending email: ", error);
      throw error; // Re-throw the error to be handled by the caller
    }
  },
};

export default EmailHelper;
