import { NextResponse } from "next/server";
import { Resend } from "resend";
import { checkRateLimit } from "@/lib/rate-limit";

let _resend: Resend;
function getResend() {
  if (!_resend) _resend = new Resend(process.env.RESEND_API_KEY);
  return _resend;
}
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_MESSAGE_LENGTH = 5000;

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export async function POST(req: Request) {
  // Rate limiting
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { message: "요청이 너무 많습니다. 잠시 후 다시 시도해주세요." },
      { status: 429 }
    );
  }

  try {
    const body = await req.json();
    const { name, email, phone, country, message } = body;

    if (!name || !email || !country || !message || !phone) {
      return NextResponse.json(
        { message: "필수 정보가 누락되었습니다." },
        { status: 400 }
      );
    }

    // Validate email format
    if (!EMAIL_REGEX.test(email)) {
      return NextResponse.json(
        { message: "올바른 이메일 형식이 아닙니다." },
        { status: 400 }
      );
    }

    // Validate message length
    if (typeof message === "string" && message.length > MAX_MESSAGE_LENGTH) {
      return NextResponse.json(
        { message: `메시지는 ${MAX_MESSAGE_LENGTH}자 이내로 작성해주세요.` },
        { status: 400 }
      );
    }

    // All user inputs are HTML-escaped to prevent XSS
    const htmlContent = `
      <h2>새로운 문의사항이 접수되었습니다.</h2>
      <ul>
        <li><strong>이름/소속:</strong> ${escapeHtml(name)}</li>
        <li><strong>국가/지역:</strong> ${escapeHtml(country)}</li>
        <li><strong>이메일:</strong> ${escapeHtml(email)}</li>
        <li><strong>전화번호:</strong> ${escapeHtml(phone)}</li>
      </ul>
      <h3>문의 내용</h3>
      <p style="white-space: pre-wrap;">${escapeHtml(message)}</p>
    `;

    const { data, error } = await getResend().emails.send({
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
