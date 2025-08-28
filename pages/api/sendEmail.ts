import type { NextApiRequest, NextApiResponse } from "next";
import FormData from "form-data";
import Mailgun from "mailgun.js";

const API_KEY = process.env.MAILGUN_API_KEY || "";
const DOMAIN = process.env.MAILGUN_DOMAIN || "";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { name, email, message } = req.body;
  const mailgun = new Mailgun(FormData);
  const client = mailgun.client({ username: "api", key: API_KEY });

  const messageData = {
    from: "Contact Form <contact@mg.jocelynxu.com>",
    to: "joce.xxt22@gmail.com",
    subject: "New Contact Form Message!",
    text: `Hello,\n\nYou have a new form entry from: ${name} (${email}).\n\n${message}`,
  };
  try {
    await client.messages.create(DOMAIN, messageData);
    res
      .status(200)
      .json({ submitted: true, message: "Email sent successfully!" });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    console.log(err);
    res.status(err.status || 500).json({
      submitted: false,
      message: "Email sent unsuccessfully",
      error: err.message || "Failed to send email",
    });
  }
}
