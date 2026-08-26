#!/bin/bash
cd "$(dirname "$0")"
clear
echo "════════════════════════════════════════════"
echo "  OpenArm 2.0 — Vercel 미리보기 배포"
echo "  · 처음이면 브라우저로 로그인 창이 열립니다 (직접 로그인)"
echo "  · 몇 가지 질문(프로젝트 연결 등)에 답하면 됩니다"
echo "  · 완료되면 '미리보기 URL'이 출력됩니다 (실서비스 영향 없음)"
echo "════════════════════════════════════════════"
echo ""
npx vercel@latest --scope pomas-projects-1bd0dd05
echo ""
echo "▶ 위 Preview URL에서 확인하세요. 문제 없으면 '배포_실서비스.command' 를 실행하세요."
read -p "엔터를 누르면 창을 닫습니다..."
