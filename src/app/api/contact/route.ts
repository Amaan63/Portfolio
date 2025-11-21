import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Create a transporter
    // Note: You need to set these environment variables in .env.local
    const transporter = nodemailer.createTransport({
      service: "gmail", // Or your preferred service
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Email to Owner (You)
    const mailOptionsOwner = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // Send to yourself
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">New Portfolio Contact</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin-top: 10px;">
            <p style="margin: 0;">${message}</p>
          </div>
        </div>
      `,
    };

    // Email to User (Confirmation)
    const mailOptionsUser = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Thanks for reaching out! | Amaan's Portfolio",
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
          <div style="text-align: center; padding: 20px 0;">
            <h1 style="color: #4F46E5;">Hello ${name}! 👋</h1>
          </div>
          <div style="background-color: #ffffff; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px;">
            <p style="font-size: 16px; line-height: 1.5;">
              Thank you for visiting my portfolio and getting in touch. I've received your message and will get back to you as soon as possible.
            </p>
            <p style="font-size: 16px; line-height: 1.5;">
              In the meantime, feel free to check out my <a href="https://github.com/Amaan63" style="color: #4F46E5;">GitHub</a> for more updates.
            </p>
            <hr style="border: 0; border-top: 1px solid #e5e7eb; margin: 20px 0;" />
            <p style="font-size: 14px; color: #666;">
              Best regards,<br>
              <strong>Amaan</strong>
            </p>
          </div>
        </div>
      `,
    };

    // Send emails
    await Promise.all([
      transporter.sendMail(mailOptionsOwner),
      transporter.sendMail(mailOptionsUser),
    ]);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
