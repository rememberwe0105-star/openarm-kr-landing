import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { contactInfo, cartItems, subtotal } = body;
    const { email, phone, company, country, zipcode, requests } = contactInfo;

    // Validate request
    if (!email || !phone || !company || !country || !zipcode || !cartItems || cartItems.length === 0) {
      return NextResponse.json(
        { message: "필수 정보가 누락되었습니다." },
        { status: 400 }
      );
    }

    // Prepare email content
    const itemsHtml = cartItems
      .map(
        (item: { name: string; quantity: number; price: number }) =>
          `<li>
            <strong>${item.name}</strong> (x${item.quantity}) - $${(
            item.price * item.quantity
          ).toLocaleString()}
          </li>`
      )
      .join("");

    const htmlContent = `
      <h2>새로운 주문/견적 요청이 접수되었습니다.</h2>
      <h3>구매자 정보</h3>
      <ul>
        <li><strong>회사명:</strong> ${company}</li>
        <li><strong>나라 (Country):</strong> ${country}</li>
        <li><strong>우편번호 (Zip Code):</strong> ${zipcode}</li>
        <li><strong>이메일:</strong> ${email}</li>
        <li><strong>전화번호:</strong> ${phone}</li>
        <li><strong>요청사항:</strong> ${requests || "없음"}</li>
      </ul>
      
      <h3>주문 내역</h3>
      <ul>
        ${itemsHtml}
      </ul>
      <p><strong>총 결제 예상 금액:</strong> $${subtotal.toLocaleString()}</p>
    `;

    const { data, error } = await resend.emails.send({
      from: "OpenArm Store <noreply@openarm.co.kr>",
      to: process.env.CONTACT_EMAIL_TO || "openarm@libertron.com",
      replyTo: email,
      subject: `[OpenArm Store] ${company}님의 새로운 주문 요청`,
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
