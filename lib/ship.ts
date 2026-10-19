// 배송 안내 문구("지금 주문 시 N월 중 배송")의 월을 날짜로 자동 계산한다.
//
// 규칙 (한국 시간 기준):
//   - 매달 1~19일  → 이번 달 배송
//   - 매달 20일부터 → 다음 달 배송 (20일이 그달 납품 마감)
//   - 단, SHIP_MIN_MONTH보다 이른 달은 표시하지 않는다.
//     마감이 20일보다 일찍 끝났을 때 이 값을 다음 달로 올리고 배포하면 반영된다.
//     (2026-10-19: 10월 납품분이 일찍 마감되어 "2026-11"로 설정)
//
// 두 겹으로 반영된다.
//   1) 서버: app/[lang]/layout.tsx가 계산해 HTML에 굽고, 1시간마다 ISR로 다시 만든다.
//      단 ISR은 만료된 페이지를 첫 요청에 한 번 그대로 내보내고 뒤에서 재생성한다.
//   2) 브라우저: 페이지가 뜬 직후 latestShipMonth()로 서버 값과 브라우저 시계 중
//      더 늦은 달을 골라 문구 텍스트만 고친다. 1)의 첫 요청 지연을 메운다.
//      더 이른 달로는 절대 되돌리지 않는다.

export const SHIP_CUTOFF_DAY = 20;
export const SHIP_MIN_MONTH = "2026-11"; // "YYYY-MM"

const KST_OFFSET_MS = 9 * 60 * 60 * 1000;

const EN_MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

/** 배송월 키("YYYY-MM"). now는 테스트용으로만 넘긴다. */
export function shipMonthKey(now: Date = new Date()): string {
  const kst = new Date(now.getTime() + KST_OFFSET_MS);
  let y = kst.getUTCFullYear();
  let m = kst.getUTCMonth() + 1; // 1~12
  if (kst.getUTCDate() >= SHIP_CUTOFF_DAY) {
    m += 1;
    if (m > 12) { m = 1; y += 1; }
  }
  const key = `${y}-${String(m).padStart(2, "0")}`;
  return key < SHIP_MIN_MONTH ? SHIP_MIN_MONTH : key; // "YYYY-MM"은 문자열 비교로 순서가 맞다
}

/** 서버가 준 값과 지금 시각 기준 값 중 더 늦은 달. 이른 달로는 되돌리지 않는다. */
export function latestShipMonth(serverKey: string, now: Date = new Date()): string {
  const local = shipMonthKey(now);
  return /^\d{4}-(0[1-9]|1[0-2])$/.test(serverKey) && serverKey > local ? serverKey : local;
}

/** 화면에 나가는 배송 안내 한 줄. key가 이상하면 SHIP_MIN_MONTH로 대신한다. */
export function shipLine(lang: "ko" | "en", key: string): string {
  const m = /^\d{4}-(0[1-9]|1[0-2])$/.test(key) ? Number(key.slice(5)) : Number(SHIP_MIN_MONTH.slice(5));
  return lang === "en"
    ? `Order now — delivery in ${EN_MONTHS[m - 1]}, limited first batch`
    : `지금 주문 시 ${m}월 중 배송 — 초기 물량 한정`;
}
