"use client";

import { useRef, useState } from "react";
import { useGSAPAnimation } from "@/hooks/useGSAPAnimation";
import { useGSAP } from "@gsap/react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function ContactSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { fadeIn } = useGSAPAnimation();
  const { t } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      if (response.ok) {
        alert(t("contact.success"));
        setFormData({ name: "", email: "", message: "" });
      } else {
        alert(data.message || t("contact.error"));
      }
    } catch (error) {
      console.error(error);
      alert(t("contact.error"));
    } finally {
      setIsSubmitting(false);
    }
  };

  useGSAP(() => {
    fadeIn(".contact-content", {
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
      }
    });
  }, { scope: containerRef });

  return (
    <section id="contact" className="section-padding bg-background-main border-t border-border-light relative">
      <div ref={containerRef} className="max-w-4xl mx-auto flex flex-col md:flex-row gap-12 contact-content">
        
        <div className="md:w-1/2 flex flex-col justify-center">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-foreground-main mb-6" dangerouslySetInnerHTML={{ __html: t("contact.title") }} />
          <p className="text-foreground-sub text-lg mb-8 whitespace-pre-line" dangerouslySetInnerHTML={{ __html: t("contact.subtitle") }} />
          <div className="flex flex-col gap-4 mt-8">
            <div className="flex items-center gap-4 text-foreground-main font-semibold">
              <svg className="w-6 h-6 text-point shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <a href="mailto:openarm@libertron.com" className="hover:text-point transition-colors">
                openarm@libertron.com
              </a>
            </div>
            <div className="flex items-center gap-4 text-foreground-main font-semibold">
              <svg className="w-6 h-6 text-point shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <a href="tel:+82-2-3486-5278" className="hover:text-point transition-colors">
                +82(02)3486-5278
              </a>
            </div>
          </div>
        </div>

        <div className="md:w-1/2 bg-background-sub p-8 rounded-3xl border border-border-light shadow-sm">
          <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-foreground-sub mb-1">{t("contact.form.name_label")}</label>
              <input 
                type="text" 
                id="name" 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-4 py-3 rounded-xl border border-border-light bg-background-main focus:outline-none focus:ring-2 focus:ring-point/50 focus:border-point transition-all disabled:opacity-50"
                placeholder={t("contact.form.name_placeholder")}
                required
                disabled={isSubmitting}
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-foreground-sub mb-1">{t("contact.form.email_label")}</label>
              <input 
                type="email" 
                id="email" 
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full px-4 py-3 rounded-xl border border-border-light bg-background-main focus:outline-none focus:ring-2 focus:ring-point/50 focus:border-point transition-all disabled:opacity-50"
                placeholder={t("contact.form.email_placeholder")}
                required
                disabled={isSubmitting}
              />
            </div>
            
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-foreground-sub mb-1">{t("contact.form.message_label")}</label>
              <textarea 
                id="message" 
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                className="w-full px-4 py-3 rounded-xl border border-border-light bg-background-main focus:outline-none focus:ring-2 focus:ring-point/50 focus:border-point transition-all resize-none disabled:opacity-50"
                placeholder={t("contact.form.message_placeholder")}
                required
                disabled={isSubmitting}
              />
            </div>

            <button 
              type="submit" 
              disabled={isSubmitting}
              className="mt-2 w-full py-4 rounded-xl bg-foreground-main text-background-main font-bold text-lg hover:bg-point hover:text-white transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg disabled:opacity-70 disabled:hover:translate-y-0 disabled:hover:shadow-none"
            >
              {isSubmitting ? t("contact.button_sending") : t("contact.button")}
            </button>
          </form>
        </div>

      </div>
    </section>
  );
}
