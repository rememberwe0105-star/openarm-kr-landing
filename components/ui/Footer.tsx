import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-background-sub border-t border-border-light">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 py-12 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-center md:text-left">
          <h2 className="text-xl font-bold tracking-tighter mb-4">
            OpenArm<span className="text-point">.</span>
          </h2>
          <div className="text-foreground-sub text-sm space-y-1">
            <p className="font-semibold text-foreground-main mb-2">한국 공식 판매 및 지원 | (주)리버트론</p>
            <p>대표번호: 02-3486-5278</p>
            <p>사업자등록번호: 105-86-32887</p>
            <p>주소: 서울 영등포구 당산로41길 11 SK V1 Center W동 1111호</p>
          </div>
        </div>
        
        <div className="flex space-x-6 text-sm">
          <Link href="https://docs.openarm.dev/" target="_blank" rel="noopener noreferrer" className="hover:text-point transition-colors">Docs</Link>
          <Link href="https://github.com/enactic/OpenArm" target="_blank" rel="noopener noreferrer" className="hover:text-point transition-colors">GitHub</Link>
          <Link href="https://discord.gg/FsZaZ4z3We" target="_blank" rel="noopener noreferrer" className="hover:text-point transition-colors">Discord</Link>
        </div>
      </div>
      <div className="bg-foreground-main text-background-main/50 text-xs text-center py-4">
        &copy; {new Date().getFullYear()} Enactic AI & OpenArm Korea. All rights reserved.
      </div>
    </footer>
  );
}
