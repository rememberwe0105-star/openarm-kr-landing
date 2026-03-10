import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { message: "필수 정보가 누락되었습니다." },
        { status: 400 }
      );
    }

    const htmlContent = `
      <h2>새로운 문의사항이 접수되었습니다.</h2>
      <ul>
        <li><strong>이름/소속:</strong> ${name}</li>
        <li><strong>이메일:</strong> ${email}</li>
      </ul>
      <h3>문의 내용</h3>
      <p style="white-space: pre-wrap;">${message}</p>
    `;

    let transporter;
    let testAccount;

    if (process.env.SMTP_USER && process.env.SMTP_PASS) {
      transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || "smtp.gmail.com",
        port: Number(process.env.SMTP_PORT) || 587,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });
    } else {
      testAccount = await nodemailer.createTestAccount();
      transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false,
        auth: {
          user: testAccount.user,
          pass: testAccount.pass,
        },
      });
    }

    const mailOptions = {
      from: process.env.SMTP_USER || '"OpenArm Website" <noreply@openarm.com>',
      to: process.env.CONTACT_EMAIL_TO || "openarm@libertron.com",
      replyTo: email,
      subject: `[OpenArm 문의] ${name}님의 문의사항이 접수되었습니다.`,
      html: htmlContent,
    };

    const info = await transporter.sendMail(mailOptions);
    
    if (testAccount) {
      console.log("==========================================");
      console.log("Mock Contact Email sent! Preview URL: %s", nodemailer.getTestMessageUrl(info));
      console.log("==========================================");
    }

    return NextResponse.json(
      { message: "문의가 성공적으로 전달되었습니다." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact Submission Error:", error);
    return NextResponse.json(
      { message: "서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요." },
      { status: 500 }
    );
  }
}
