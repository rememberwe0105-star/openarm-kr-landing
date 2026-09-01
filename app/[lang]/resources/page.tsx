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

  // Real, indexable content — an OpenArm definition + FAQ targeting Korean
  // long-tail queries ("오픈암 가격", "오픈암이란", teleoperation, 오픈소스). Kept
  // truthful and on-strategy (two-track: OpenArm for learning/teleop, RB20 for
  // validated process work) so it doubles as accurate customer info.
  const intro = lang === "en"
    ? { h: "What is OpenArm 2.0?", p: "OpenArm is an open-source bimanual robot supplied by Libertron. It pairs two 7-DoF arms with a 633 mm reach, DAMIAO actuators, and CAN-FD / ROS 2 / Python interfaces. Teams use it for teleoperation, imitation and reinforcement learning, manipulation research, data collection, and education. The CAD and BOM are open, so a lab can extend it directly." }
    : { h: "OpenArm 2.0이란?", p: "OpenArm은 리버트론이 공급하는 오픈소스 양팔 로봇입니다. 7자유도 암 두 개와 633mm 리치, DAMIAO 액추에이터, CAN-FD·ROS 2·Python 인터페이스를 갖췄습니다. 텔레오퍼레이션과 모방·강화학습, 매니퓰레이션 연구, 데이터 수집, 교육에 사용합니다. CAD와 BOM이 공개되어 있어 연구실이 직접 확장할 수 있습니다." };

  const faq: [string, string][] = lang === "en" ? [
    ["What is OpenArm?", "An open-source bimanual robot platform from Libertron, built as a devkit for physical-AI development, robot learning, and teleoperation research."],
    ["How much does it cost?", "Pricing is quoted per configuration. Add a build in the store and request a quote — we reply with a price that includes delivery, installation, and a demo."],
    ["How do you teach the robot?", "No traditional teach pendant. You use leader–follower teleoperation (KER) and kinesthetic teaching, or drive it directly through the ROS 2, Python, and CAN-FD APIs."],
    ["Can it run a real production process?", "OpenArm is a platform for learning, teleoperation, and data collection. For work that needs validated process performance, we pair it with an RB20-class industrial arm."],
    ["How open is it?", "The CAD, BOM, and control software are public, so you can extend the hardware and integrate the software yourself."],
  ] : [
    ["오픈암(OpenArm)은 무엇인가요?", "리버트론이 공급하는 오픈소스 양팔 로봇 플랫폼입니다. 피지컬 AI 개발과 로봇 학습, 원격조작 연구를 위한 데브킷으로 설계됐습니다."],
    ["가격은 얼마인가요?", "구성과 옵션에 따라 개별 견적으로 안내합니다. 스토어에서 구성을 담아 견적을 요청하면 배송·설치·시연을 포함해 회신드립니다."],
    ["로봇을 어떻게 가르치나요?", "전통적 티칭 펜던트 없이 리더-팔로워 텔레오퍼레이션(KER)과 손으로 직접 잡는 kinesthetic 티칭을 씁니다. ROS 2, Python, CAN-FD API로 직접 제어할 수도 있습니다."],
    ["실제 생산 공정에 바로 투입할 수 있나요?", "OpenArm은 학습·원격조작·데이터 수집용 플랫폼입니다. 실제 공정 검증이 필요한 작업은 RB20급 산업용 로봇암으로 함께 안내합니다."],
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {resources.map((resource, i) => (
            <div 
              key={i} 
              className="group bg-background-sub p-10 rounded-[2rem] border border-border-light hover:border-point/50 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 flex flex-col h-full"
            >
              <div className="w-16 h-16 bg-background-main rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                {resource.icon}
              </div>
              <h3 className="text-2xl font-bold text-foreground-main mb-4">{t(resource.titleKey)}</h3>
              <p className="text-foreground-sub font-medium leading-relaxed mb-8 flex-1">
                {t(resource.descKey)}
              </p>
              <a 
                href={resource.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-full bg-foreground-main text-background-main px-6 py-4 rounded-xl text-md font-bold hover:bg-point hover:text-white transition-all duration-300"
              >
                {t(resource.btnKey)}
              </a>
            </div>
          ))}
        </div>

        <div className="mt-20 md:mt-28 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-black tracking-tighter text-foreground-main mb-6">{intro.h}</h2>
          <p className="text-foreground-sub text-lg leading-relaxed mb-14">{intro.p}</p>
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
      </section>

      <Footer />
    </main>
  );
}
