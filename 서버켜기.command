#!/bin/bash
# OpenArm 2.0 로컬 개발 서버 실행기 — 더블클릭하면 서버가 켜지고 브라우저가 열립니다.
cd "$(dirname "$0")"
clear
echo "================================================"
echo "  OpenArm 2.0 개발 서버를 시작합니다..."
echo "  잠시 후 브라우저에서 http://localhost:3000 이 자동으로 열립니다."
echo "  (서버 종료: 이 창에서 Control + C  /  창 닫기)"
echo "================================================"
echo ""
# node_modules 없으면 설치
if [ ! -d "node_modules/next" ]; then
  echo "의존성 설치 중... (처음 1회, 몇 분 소요될 수 있습니다)"
  npm install
fi
# 6초 뒤 브라우저 자동 오픈
( sleep 6 && open "http://localhost:3000" ) &
npm run dev
