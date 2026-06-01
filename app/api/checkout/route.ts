import { NextResponse } from "next/server";
import { Resend } from "resend";
import { checkRateLimit } from "@/lib/rate-limit";

let _resend: Resend;
function getResend() {
  if (!_resend) _resend = new Resend(process.env.RESEND_API_KEY);
  return _resend;
}
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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
    const { contactInfo, cartItems } = body;
    const { email, phone, name, country, requests } = contactInfo;

    // Validate required fields
    if (!email || !phone || !name || !country || !cartItems || !Array.isArray(cartItems) || cartItems.length === 0) {
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

    // Validate cartItems structure
    for (const item of cartItems) {
      if (
        typeof item.name !== "string" ||
        !Number.isInteger(item.quantity) ||
        item.quantity <= 0 ||
        typeof item.price !== "number" ||
        item.price < 0
      ) {
        return NextResponse.json(
          { message: "장바구니 항목이 올바르지 않습니다." },
          { status: 400 }
        );
      }
    }

    // Recalculate subtotal server-side instead of trusting client value
    const subtotal = cartItems.reduce(
      (sum: number, item: { price: number; quantity: number }) =>
        sum + item.price * item.quantity,
      0
    );

    // Prepare email content (all user inputs are HTML-escaped to prevent XSS)
    const itemsHtml = cartItems
      .map(
        (item: { name: string; quantity: number; price: number }) =>
          `<li>
            <strong>${escapeHtml(item.name)}</strong> (x${item.quantity}) - $${(
            item.price * item.quantity
          ).toLocaleString()}
          </li>`
      )
      .join("");

    const htmlContent = `
      <h2>새로운 주문/견적 요청이 접수되었습니다.</h2>
      <h3>구매자 정보</h3>
      <ul>
        <li><strong>이름/소속 (Name / Company):</strong> ${escapeHtml(name)}</li>
        <li><strong>나라 (Country):</strong> ${escapeHtml(country)}</li>
        <li><strong>이메일 (Email):</strong> ${escapeHtml(email)}</li>
        <li><strong>전화번호 (Phone):</strong> ${escapeHtml(phone)}</li>
        <li><strong>요청사항 (Requests):</strong> ${escapeHtml(requests || "없음")}</li>
      </ul>
      
      <h3>주문 내역</h3>
      <ul>
        ${itemsHtml}
      </ul>
      <p><strong>총 결제 예상 금액:</strong> $${subtotal.toLocaleString()}</p>
    `;

    const { data, error } = await getResend().emails.send({
      from: "OpenArm Store <noreply@openarm.co.kr>",
      to: process.env.CONTACT_EMAIL_TO || "openarm@libertron.com",
      replyTo: email,
      subject: `[OpenArm Store] ${name}님의 새로운 주문 요청`,
      html: htmlContent,
    });

    if (error) {
      console.error("Resend Checkout Email Error:", error);
      return NextResponse.json(
        { message: "이메일 전송에 실패했습니다." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "주문 요청이 성공적으로 전송되었습니다.", data },
      { status: 200 }
    );
  } catch (error) {
    console.error("Checkout Request Error:", error);
    return NextResponse.json(
      { message: "서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요." },
      { status: 500 }
    );
  }
}
