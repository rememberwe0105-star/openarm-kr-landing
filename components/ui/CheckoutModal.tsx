"use client";

import { useState } from "react";
import { X, CheckCircle2 } from "lucide-react";
import { CartItem } from "./CartDrawer";

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onOrderComplete: () => void;
}

export default function CheckoutModal({ isOpen, onClose, items, onOrderComplete }: CheckoutModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    company: "",
    country: "",
    zipcode: "",
    email: "",
    phone: "",
    requests: ""
  });
  const [agreePrivacy, setAgreePrivacy] = useState(false);

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contactInfo: formData,
          cartItems: items,
          subtotal
        }),
      });

      if (!response.ok) throw new Error("Network response was not ok");
      
      setIsSuccess(true);

    } catch (error) {
      console.error("Failed to submit order:", error);
      alert("주문 접수 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center px-4">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative bg-background-main w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh]">
        
        {/* Left Side: Order Summary */}
        <div className="w-full md:w-5/12 bg-background-sub p-8 border-r border-border-light flex flex-col hidden md:flex">
          <h3 className="text-xl font-bold text-foreground-main mb-6">주문 요약 (Order Summary)</h3>
          
          <div className="flex-1 overflow-y-auto pr-2 flex flex-col gap-4">
            {items.map((item) => (
              <div key={item.id} className="flex gap-4 items-center">
                <div 
                  className="w-16 h-16 bg-white rounded-lg flex-shrink-0 bg-contain bg-center bg-no-repeat border border-border-light"
                  style={{ backgroundImage: `url('${item.imageUrl}')` }}
                />
                <div className="flex-1">
                  <h4 className="text-sm font-bold text-foreground-main leading-tight mb-1">{item.name}</h4>
                  <p className="text-xs text-foreground-sub">Qty: {item.quantity}</p>
                </div>
                <div className="text-sm font-bold font-mono text-point">
                  {item.displayPrice ? item.displayPrice : `$${(item.price * item.quantity).toLocaleString()}`}
                </div>
              </div>
            ))}
          </div>

          <div className="pt-6 mt-6 border-t border-border-light">
            <div className="flex justify-between items-center">
              <span className="font-medium text-foreground-sub">Total</span>
              <span className="text-2xl font-mono font-bold text-foreground-main">
                ${subtotal.toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="w-full md:w-7/12 p-8 overflow-y-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-black text-foreground-main">견적 및 주문 요청</h2>
            <button 
              onClick={onClose}
              className="p-2 text-foreground-sub hover:text-foreground-main transition-colors bg-background-sub rounded-full"
            >
              <X size={20} />
            </button>
          </div>

          {isSuccess ? (
            <div className="flex flex-col items-center justify-center py-20 text-center animate-in fade-in zoom-in duration-500">
              <CheckCircle2 size={64} className="text-green-500 mb-4" />
              <h3 className="text-2xl font-bold text-foreground-main mb-2">요청이 성공적으로 접수되었습니다.</h3>
              <p className="text-foreground-sub mb-8">담당자가 내용을 확인한 후 입력하신 연락처로 회신드리겠습니다.</p>
              <button
                onClick={() => {
                  setIsSuccess(false);
                  onOrderComplete();
                  onClose();
                }}
                className="w-full max-w-[200px] bg-point text-white py-3 rounded-xl text-[15px] font-bold hover:bg-point/90 transition-colors shadow-sm"
              >
                확인
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div>
                <label htmlFor="company" className="block text-sm font-bold text-foreground-sub mb-2">회사명 (또는 학교/연구소명)*</label>
                <input 
                  type="text" 
                  id="company"
                  name="company"
                  required
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full bg-background-sub border border-border-light rounded-xl px-4 py-3 text-foreground-main focus:outline-none focus:border-point focus:ring-1 focus:ring-point transition-all"
                  placeholder="리버트론"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="country" className="block text-sm font-bold text-foreground-sub mb-2">나라 (Country)*</label>
                  <input 
                    type="text" 
                    id="country"
                    name="country"
                    required
                    value={formData.country}
                    onChange={handleChange}
                    className="w-full bg-background-sub border border-border-light rounded-xl px-4 py-3 text-foreground-main focus:outline-none focus:border-point focus:ring-1 focus:ring-point transition-all"
                    placeholder="South Korea"
                  />
                </div>
                <div>
                  <label htmlFor="zipcode" className="block text-sm font-bold text-foreground-sub mb-2">우편번호 (Zip Code)*</label>
                  <input 
                    type="text" 
                    id="zipcode"
                    name="zipcode"
                    required
                    value={formData.zipcode}
                    onChange={handleChange}
                    className="w-full bg-background-sub border border-border-light rounded-xl px-4 py-3 text-foreground-main focus:outline-none focus:border-point focus:ring-1 focus:ring-point transition-all"
                    placeholder="07222"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="email" className="block text-sm font-bold text-foreground-sub mb-2">이메일 (Email)*</label>
                  <input 
                    type="email" 
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-background-sub border border-border-light rounded-xl px-4 py-3 text-foreground-main focus:outline-none focus:border-point focus:ring-1 focus:ring-point transition-all"
                    placeholder="example@libertron.com"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-bold text-foreground-sub mb-2">전화번호 (Phone)*</label>
                  <input 
                    type="tel" 
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full bg-background-sub border border-border-light rounded-xl px-4 py-3 text-foreground-main focus:outline-none focus:border-point focus:ring-1 focus:ring-point transition-all"
                    placeholder="010-0000-0000"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="requests" className="block text-sm font-bold text-foreground-sub mb-2">요청사항 (Requests)</label>
                <textarea 
                  id="requests"
                  name="requests"
                  rows={4}
                  value={formData.requests}
                  onChange={handleChange}
                  className="w-full bg-background-sub border border-border-light rounded-xl px-4 py-3 text-foreground-main focus:outline-none focus:border-point focus:ring-1 focus:ring-point transition-all resize-none"
                  placeholder="납기일정, 커스텀 옵션 등 추가로 궁금하신 사항을 남겨주세요."
                />
              </div>

              {/* Mobile Order Summary Preview */}
              <div className="md:hidden mt-2 p-4 bg-background-sub rounded-xl border border-border-light flex justify-between items-center">
                <span className="font-bold text-foreground-main">Total ({items.reduce((s,i)=>s+i.quantity,0)} items)</span>
                <span className="text-xl font-mono font-bold text-point">
                  ${subtotal.toLocaleString()}
                </span>
              </div>

              <div className="flex items-start gap-3 mt-4">
                <input 
                  type="checkbox" 
                  id="agreePrivacy" 
                  name="agreePrivacy"
                  required
                  checked={agreePrivacy}
                  onChange={(e) => setAgreePrivacy(e.target.checked)}
                  className="mt-1 w-4 h-4 rounded border-border-light text-point focus:ring-point bg-background-sub"
                />
                <label htmlFor="agreePrivacy" className="text-sm text-foreground-sub select-none cursor-pointer leading-tight">
                  <span className="font-bold text-foreground-main">개인정보 수집 및 이용 동의 (필수)</span><br/>
                  문의 및 견적 처리를 위해 이름, 연락처, 이메일 등의 개인정보를 수집하며, 목적 달성 시 즉시 파기합니다.
                </label>
              </div>

              <button 
                type="submit"
                disabled={isSubmitting || !agreePrivacy}
                className="mt-2 w-full bg-point text-white py-3 md:py-4 rounded-xl text-[15px] font-bold hover:bg-point/90 transition-colors shadow-sm disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "전송 중..." : "상담 및 견적 요청하기"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
