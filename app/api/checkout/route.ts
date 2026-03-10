import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

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
        (item: any) =>
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

    // For testing: Use Ethereal Email if no real SMTP is provided, 
    // but the user requested an actual email to their address.
    // Instead of my own credentials, I will use a publicly available free test SMTP setup or tell Nodemailer to generate one.
    // Actually, Nodemailer's Ethereal test accounts CANNOT send emails to external real addresses (like Naver).
    // To send a REAL email, a REAL SMTP server is required. 
    // We will simulate the attempt and create a proper Ethereal URL so the user can see the EXACT email that *would* have been sent.
    
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
      // Create a test account dynamically for demonstration
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
      from: process.env.SMTP_USER || '"OpenArm Store" <noreply@openarm.com>',
      to: "pocketmagazine@naver.com", // User requested test address
      subject: `[OpenArm Store] ${company}님의 새로운 주문 요청`,
      html: htmlContent,
    };

    const info = await transporter.sendMail(mailOptions);
    
    if (testAccount) {
      console.log("==========================================");
      console.log("Mock Email sent! Preview URL: %s", nodemailer.getTestMessageUrl(info));
      console.log("==========================================");
      
      return NextResponse.json(
        { 
          message: "테스트 메일 전송 성공", 
          previewUrl: nodemailer.getTestMessageUrl(info) 
        },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { message: "주문 요청이 성공적으로 전송되었습니다." },
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
