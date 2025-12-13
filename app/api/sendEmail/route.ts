import { NextRequest, NextResponse } from "next/server";
import FormData from "form-data";
import Mailgun from "mailgun.js";

const API_KEY = process.env.MAILGUN_API_KEY || "";
const DOMAIN = process.env.MAILGUN_DOMAIN || "";

export async function POST(req: NextRequest) {
  try {
    const { name, email, message } = await req.json();
    const mailgun = new Mailgun(FormData);
    const client = mailgun.client({ username: "api", key: API_KEY });

    const messageData = {
      from: "Contact Form <contact@mg.jocelynxu.com>",
      to: "joce.xxt22@gmail.com",
      subject: "New Contact Form Message!",
      text: `Hello,\n\nYou have a new form entry from: ${name} (${email}).\n\n${message}`,
    };

    await client.messages.create(DOMAIN, messageData);

    return NextResponse.json(
      { submitted: true, message: "Email sent successfully!" },
      { status: 200 },
    );
  } catch (err: any) {
    console.log(err);
    return NextResponse.json(
      {
        submitted: false,
        message: "Email sent unsuccessfully",
        error: err.message || "Failed to send email",
      },
      { status: err.status || 500 },
    );
  }
}
