"use client";

import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import ScrollProgress from "@/components/ui/ScrollProgress";
import { Book, Github, MessageSquare } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function ResourcesPage() {
  const { t, lang } = useLanguage();

  const resources = [
    {
      titleKey: "resources_page.docs_title",
      descKey: "resources_page.docs_desc",
      btnKey: "resources_page.docs_btn",
      icon: <Book size={32} className="text-point group-hover:scale-110 transition-transform" />,
      link: "https://docs.openarm.dev/",
    },
    {
      titleKey: "resources_page.github_title",
      descKey: "resources_page.github_desc",
      btnKey: "resources_page.github_btn",
      icon: <Github size={32} className="text-point group-hover:scale-110 transition-transform" />,
      link: "https://github.com/enactic/OpenArm",
    },
    {
      titleKey: "resources_page.discord_title",
      descKey: "resources_page.discord_desc",
      btnKey: "resources_page.discord_btn",
      icon: <MessageSquare size={32} className="text-point group-hover:scale-110 transition-transform" />,
      link: "https://discord.gg/FsZaZ4z3We",
    }
  ];

  // This page must be a real developer hub, not an SEO landing (대표 지적).
  // Everything below is verified: spec values mirror the home page's confirmed
  // numbers, and every link points to a resource that actually exists
  // (docs.openarm.dev, enactic/openarm, enactic/openarm_teleop, the LeRobot
  // OpenArm integration page). FAQ topics follow real GSC query demand
  // (version diff · KER · price · spec).
  const steps: { n: string; title: string; desc: string; link: string; label: string }[] = lang === "en" ? [
    { n: "01", title: "Read the docs", desc: "Hardware architecture, assembly, and bring-up — start here to understand how the system fits together.", link: "https://docs.openarm.dev/", label: "docs.openarm.dev" },
    { n: "02", title: "Clone the repository", desc: "CAD, BOM, firmware, and control software. Everything needed to build, modify, or repair the hardware.", link: "https://github.com/enactic/openarm", label: "github.com/enactic/openarm" },
    { n: "03", title: "Run teleoperation", desc: "The leader–follower teleop stack. Drive the follower from a leader arm and record trajectories.", link: "https://github.com/enactic/openarm_teleop", label: "enactic/openarm_teleop" },
    { n: "04", title: "Connect a learning pipeline", desc: "OpenArm is integrated with LeRobot — collect demonstrations and train imitation-learning policies on your data.", link: "https://huggingface.co/docs/lerobot/openarm", label: "LeRobot × OpenArm" },
  ] : [
    { n: "01", title: "문서 읽기", desc: "하드웨어 구조·조립·초기 구동. 시스템이 어떻게 구성되는지 여기서 먼저 파악하세요.", link: "https://docs.openarm.dev/", label: "docs.openarm.dev" },
    { n: "02", title: "저장소 클론", desc: "CAD·BOM·펌웨어·제어 소프트웨어. 하드웨어를 만들고 개조하고 수리하는 데 필요한 전부가 있습니다.", link: "https://github.com/enactic/openarm", label: "github.com/enactic/openarm" },
    { n: "03", title: "텔레오퍼레이션 실행", desc: "리더-팔로워 teleop 스택. 리더 암으로 팔로워를 구동하고 궤적을 기록합니다.", link: "https://github.com/enactic/openarm_teleop", label: "enactic/openarm_teleop" },
    { n: "04", title: "학습 파이프라인 연결", desc: "OpenArm은 LeRobot에 통합되어 있습니다. 시연 데이터를 수집해 모방학습 정책을 바로 학습시켜 보세요.", link: "https://huggingface.co/docs/lerobot/openarm", label: "LeRobot × OpenArm" },
  ];
  const stepsNote = lang === "en"
    ? "Libertron devkits ship pre-assembled and bring-up-tested with example code, so you start at step 03."
    : "리버트론 데브킷은 조립·초기 구동 테스트가 완료된 상태로 예제 코드와 함께 출고되므로, 03단계부터 시작하면 됩니다.";

  // Values mirror the home page spec section (single source of truth for copy).
  const specs: [string, string][] = lang === "en" ? [
    ["Configuration", "Bimanual, 7-DOF × 2"],
    ["Reach", "633 mm (CAD-measured)"],
    ["Payload (nominal / peak)", "4.1 / 6.0 kg per arm"],
    ["Weight", "5.5 kg per arm"],
    ["Control", "1 kHz CAN-FD"],
    ["Actuators", "DAMIAO, 24 V DC system"],
    ["Software", "ROS 2 · Python · C++"],
    ["Simulation", "MuJoCo · Isaac Sim"],
    ["Openness", "CAD · BOM · firmware public"],
  ] : [
    ["구성", "양팔, 7-DOF × 2"],
    ["도달 거리", "633mm (CAD 실측)"],
    ["가반하중 (정격/피크)", "암당 4.1 / 6.0kg"],
    ["무게", "암당 5.5kg"],
    ["제어", "1kHz CAN-FD"],
    ["액추에이터", "DAMIAO, 24V DC 시스템"],
    ["소프트웨어", "ROS 2 · Python · C++"],
    ["시뮬레이션", "MuJoCo · Isaac Sim"],
    ["공개 범위", "CAD · BOM · 펌웨어 공개"],
  ];

  const secH = {
    start: lang === "en" ? "Getting started" : "시작 가이드",
    spec: lang === "en" ? "Spec reference" : "핵심 스펙 레퍼런스",
    faqH: lang === "en" ? "Frequently asked questions" : "자주 묻는 질문",
    ext: lang === "en" ? "Community & support" : "커뮤니티 · 지원",
  };

  const intro = lang === "en"
    ? { h: "What is OpenArm 2.0?", p: "OpenArm is an open-source bimanual robot supplied by Libertron. 2.0 is the current generation: two 7-DoF arms, about 633 mm of reach, DAMIAO actuators, and CAN-FD / ROS 2 / Python control. It's used for teleoperation, imitation and reinforcement learning, manipulation research, data collection, and education. The earlier OpenArm 1.1 series is still offered, and both models ship with open CAD and BOM." }
    : { h: "OpenArm 2.0이란?", p: "OpenArm(오픈암)은 리버트론이 공급하는 오픈소스 양팔 로봇입니다. 2.0은 현재 세대 모델로 7자유도 팔 두 개, 약 633mm 리치, DAMIAO 액추에이터, CAN-FD·ROS 2·Python 제어를 갖췄습니다. 텔레오퍼레이션과 모방·강화학습, 매니퓰레이션 연구, 데이터 수집, 교육에 쓰입니다. 이전 세대인 OpenArm 1.1 시리즈도 계속 제공하며, 두 모델 모두 CAD와 BOM이 공개되어 있습니다." };

  const faq: [string, string][] = lang === "en" ? [
    ["How is OpenArm 1.1 different from 2.0?", "2.0 is the current-generation bimanual platform with the latest drivetrain and interfaces, and is the main product. 1.1 is the earlier series and is still available. Both are open-source; the full 1.1 spec and configurations are on its own page (top menu → OpenArm 1.1)."],
    ["What is KER?", "KER is the leader device used for leader–follower teleoperation. You move KER by hand and OpenArm (the follower) mirrors it, recording the trajectory as training data. It's used for remote operation and demonstration-based data collection."],
    ["How much does OpenArm cost?", "Pricing is quoted per configuration. Add the arm, cameras, KER, and other options in the store and request a quote — we reply with a price that includes delivery, installation, and a demo."],
    ["How do you teach the robot?", "You're not locked into one teaching method. Use leader–follower teleoperation with KER, kinesthetic teaching by moving the arm by hand, or direct control through the ROS 2, Python, and CAN-FD APIs. From a first encounter with physical AI to full development, every option stays open."],
    ["Can it run a real production process?", "OpenArm is a platform for learning, teleoperation, and data collection. For work that needs validated process performance, we pair it with an RB20-class industrial arm so the platform matches the job."],
    ["How open is it?", "The CAD, BOM, and control software are public, so you can extend the hardware and integrate the software yourself."],
  ] : [
    ["OpenArm 1.1과 2.0은 무엇이 다른가요?", "2.0은 최신 구동계와 인터페이스를 갖춘 현재 세대 양팔 플랫폼이자 메인 제품입니다. 1.1은 이전 세대 시리즈로 계속 제공됩니다. 두 모델 모두 오픈소스이며, 1.1의 상세 사양과 구성은 전용 페이지(상단 메뉴 → OpenArm 1.1)에서 확인할 수 있습니다."],
    ["KER은 무엇인가요?", "KER은 리더-팔로워 텔레오퍼레이션에 쓰는 리더 장치입니다. KER을 손으로 움직이면 OpenArm(팔로워)이 그 동작을 그대로 따라오고, 그 궤적을 학습용 데이터로 기록합니다. 원격 조작과 시연 기반 데이터 수집에 사용합니다."],
    ["OpenArm 가격은 얼마인가요?", "구성과 옵션에 따라 개별 견적으로 안내합니다. 스토어에서 본체·카메라·KER 등 원하는 구성을 담아 견적을 요청하면, 배송·설치·시연을 포함한 금액으로 회신드립니다."],
    ["로봇을 어떻게 가르치나요?", "정해진 티칭 방식에 갇히지 않습니다. KER을 이용한 리더-팔로워 텔레오퍼레이션, 로봇 팔을 손으로 직접 잡는 kinesthetic 티칭, ROS 2·Python·CAN-FD API를 통한 직접 제어까지, 원하는 방식으로 가르치고 제어할 수 있습니다. 피지컬 AI를 처음 접하는 단계부터 본격적인 개발까지 모든 가능성을 열어 둡니다."],
    ["실제 생산 공정에 바로 투입할 수 있나요?", "OpenArm은 학습·원격조작·데이터 수집을 위한 플랫폼입니다. 실제 공정 성능 검증이 필요한 작업은 RB20급 산업용 로봇암으로 함께 안내해, 용도에 맞는 플랫폼을 제안합니다."],
    ["오픈소스 범위는 어디까지인가요?", "CAD, BOM, 제어 소프트웨어가 공개되어 있어 하드웨어 확장과 소프트웨어 통합을 직접 진행할 수 있습니다."],
  ];

  return (
    <main className="min-h-screen bg-background-main flex flex-col pt-20">
      <ScrollProgress />
      <Navbar />

      <section className="flex-1 px-6 md:px-12 lg:px-24 py-16 md:py-24 max-w-[1400px] mx-auto w-full">
        <div className="text-center mb-16 md:mb-24">
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-black tracking-tighter text-foreground-main mb-6">
            {t("resources_page.title_1")} <span className="text-point">{t("resources_page.title_2")}</span>
          </h1>
          <p 
            className="text-foreground-sub text-lg md:text-xl max-w-2xl mx-auto font-medium leading-relaxed"
            dangerouslySetInnerHTML={{ __html: t("resources_page.subtitle") }}
          />
        </div>

        {/* A real developer hub: what OpenArm is → how to actually start (with
            working deep links) → spec reference an engineer can bookmark → FAQ →
            community. The 3 link cards from the home #resources section are NOT
            repeated up top — the steps deep-link them in context instead. */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-black tracking-tighter text-foreground-main mb-6">{intro.h}</h2>
          <p className="text-foreground-sub text-lg leading-relaxed">{intro.p}</p>
        </div>

        <div className="mt-16 md:mt-24 max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-black tracking-tighter text-foreground-main mb-8">{secH.start}</h2>
          <ol className="flex flex-col gap-3">
            {steps.map((s) => (
              <li key={s.n}>
                <a
                  href={s.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex gap-5 bg-background-sub border border-border-light rounded-2xl px-6 py-5 hover:border-point/50 hover:shadow-md transition-all"
                >
                  <span className="text-point font-black text-xl shrink-0 w-8">{s.n}</span>
                  <span className="flex-1 min-w-0">
                    <span className="block font-bold text-foreground-main text-lg">{s.title}</span>
                    <span className="block text-foreground-sub text-sm leading-relaxed mt-1">{s.desc}</span>
                    <span className="inline-block text-point text-sm font-semibold mt-2 group-hover:underline">{s.label} →</span>
                  </span>
                </a>
              </li>
            ))}
          </ol>
          <p className="text-foreground-sub text-sm leading-relaxed mt-4 px-2">💡 {stepsNote}</p>
        </div>

        <div className="mt-16 md:mt-24 max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-black tracking-tighter text-foreground-main mb-8">{secH.spec}</h2>
          <div className="bg-background-sub border border-border-light rounded-2xl overflow-hidden">
            {specs.map(([k, v], i) => (
              <div key={i} className={`flex px-6 py-4 ${i > 0 ? "border-t border-border-light" : ""}`}>
                <span className="w-2/5 text-foreground-sub text-sm font-medium">{k}</span>
                <span className="flex-1 text-foreground-main font-bold">{v}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 md:mt-24 max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-black tracking-tighter text-foreground-main mb-8">{secH.faqH}</h2>
          <div className="flex flex-col gap-3">
            {faq.map(([q, a], i) => (
              <details key={i} className="group bg-background-sub border border-border-light rounded-2xl px-6 py-5 open:shadow-md transition-shadow">
                <summary className="flex items-center justify-between cursor-pointer list-none font-bold text-foreground-main text-lg">
                  {q}
                  <span className="text-point text-2xl leading-none group-open:rotate-45 transition-transform shrink-0 ml-4">+</span>
                </summary>
                <p className="text-foreground-sub leading-relaxed mt-4">{a}</p>
              </details>
            ))}
          </div>
        </div>

        <div className="mt-16 md:mt-24 max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-black tracking-tighter text-foreground-main mb-8">{secH.ext}</h2>
          <div className="flex flex-col gap-3">
            {resources.map((resource, i) => (
              <a
                key={i}
                href={resource.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-5 bg-background-sub border border-border-light rounded-2xl px-6 py-5 hover:border-point/50 hover:shadow-md transition-all"
              >
                <div className="shrink-0">{resource.icon}</div>
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-foreground-main text-lg">{t(resource.titleKey)}</div>
                  <div className="text-foreground-sub text-sm leading-relaxed">{t(resource.descKey)}</div>
                </div>
                <span className="text-point font-bold shrink-0">→</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
