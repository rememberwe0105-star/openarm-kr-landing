import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

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

    const { data, error } = await resend.emails.send({
      from: "OpenArm Website <noreply@openarm.co.kr>",
      to: process.env.CONTACT_EMAIL_TO || "openarm@libertron.com",
      replyTo: email,
      subject: `[OpenArm 문의] ${name}님의 문의사항이 접수되었습니다.`,
      html: htmlContent,
    });

    if (error) {
      console.error("Resend Email Error:", error);
      return NextResponse.json(
        { message: "이메일 전송에 실패했습니다." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "문의가 성공적으로 전달되었습니다.", data },
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
