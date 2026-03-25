"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="bg-background-sub border-t border-border-light">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 py-12 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-center md:text-left">
          <h2 className="text-xl font-bold tracking-tighter mb-4">
            OpenArm<span className="text-point">.</span>
          </h2>
          <div className="text-foreground-sub text-sm space-y-1">
            <p className="font-semibold text-foreground-main mb-2">{t("footer.corp")}</p>
            <p>{t("footer.addr_1")}</p>
            <p>{t("footer.addr_2")}</p>
            <p>{t("footer.addr_3")}</p>
          </div>
        </div>
        
        <div className="flex space-x-6 text-sm">
          <Link href="https://docs.openarm.dev/" target="_blank" rel="noopener noreferrer" className="hover:text-point transition-colors">Docs</Link>
          <Link href="https://github.com/enactic/OpenArm" target="_blank" rel="noopener noreferrer" className="hover:text-point transition-colors">GitHub</Link>
          <Link href="https://discord.gg/FsZaZ4z3We" target="_blank" rel="noopener noreferrer" className="hover:text-point transition-colors">Discord</Link>
        </div>
      </div>
      <div className="text-foreground-sub/60 text-xs text-center pb-8">
        {t("footer.copyright")}
      </div>
    </footer>
  );
}
