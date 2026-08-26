#!/bin/bash
cd "$(dirname "$0")"
clear
echo "════════════════════════════════════════════"
echo "  OpenArm 2.0 — Vercel 프로덕션(실서비스) 배포"
echo "  ⚠ 실제 라이브 사이트에 반영됩니다."
echo "════════════════════════════════════════════"
echo ""
read -p "정말 실서비스로 배포할까요? (y/N) " ok
[ "$ok" = "y" ] || { echo "취소했습니다."; read -p "엔터로 닫기..."; exit 0; }
npx vercel@latest --prod --scope pomas-projects-1bd0dd05
echo ""
read -p "완료. 엔터로 닫기..."
