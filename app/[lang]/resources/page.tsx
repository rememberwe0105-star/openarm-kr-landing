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

  // Indexable content aimed at REAL search demand. GSC query data (90d) shows
  // demand is entirely branded/version/component: "openarm", "오픈암",
  // "openarm 2.0 / v2 / v1", "openarm ker", "openarm mini". Visitors already
  // know OpenArm and want version diff · KER · price · spec — so the FAQ answers
  // exactly those, truthful and on-strategy (two-track). Generic robotics terms
  // ("bimanual robot", "physical-AI data collection") had ~0 demand → dropped.
  const intro = lang === "en"
    ? { h: "What is OpenArm 2.0?", p: "OpenArm is an open-source bimanual robot supplied by Libertron. 2.0 is the current generation: two 7-DoF arms, about 633 mm of reach, DAMIAO actuators, and CAN-FD / ROS 2 / Python control. It's used for teleoperation, imitation and reinforcement learning, manipulation research, data collection, and education. The earlier OpenArm 1.1 series is still offered, and both models ship with open CAD and BOM. The questions below are the ones people actually ask." }
    : { h: "OpenArm 2.0이란?", p: "OpenArm(오픈암)은 리버트론이 공급하는 오픈소스 양팔 로봇입니다. 2.0은 현재 세대 모델로 7자유도 팔 두 개, 약 633mm 리치, DAMIAO 액추에이터, CAN-FD·ROS 2·Python 제어를 갖췄습니다. 텔레오퍼레이션과 모방·강화학습, 매니퓰레이션 연구, 데이터 수집, 교육에 쓰입니다. 이전 세대인 OpenArm 1.1 시리즈도 계속 제공하며, 두 모델 모두 CAD와 BOM이 공개되어 있습니다. 아래는 실제로 많이 묻는 질문을 모은 것입니다." };

  const faq: [string, string][] = lang === "en" ? [
    ["How is OpenArm 1.1 different from 2.0?", "2.0 is the current-generation bimanual platform with the latest drivetrain and interfaces, and is the main product. 1.1 is the earlier series and is still available. Both are open-source; the full 1.1 spec and configurations are on its own page (top menu → OpenArm 1.1)."],
    ["What is KER?", "KER is the leader device used for leader–follower teleoperation. You move KER by hand and OpenArm (the follower) mirrors it, recording the trajectory as training data. It's used for remote operation and demonstration-based data collection."],
    ["How much does OpenArm cost?", "Pricing is quoted per configuration. Add the arm, cameras, KER, and other options in the store and request a quote — we reply with a price that includes delivery, installation, and a demo."],
    ["What are the specs?", "OpenArm 2.0 has two 7-DoF arms (bimanual), about 633 mm of reach, DAMIAO actuators, and a 24 V DC system. Control is over ROS 2, Python, and the CAN-FD API."],
    ["How do you teach the robot?", "No traditional teach pendant. You teach motions with KER-based leader–follower teleoperation and by moving the arm by hand (kinesthetic teaching), or drive it directly through ROS 2, Python, and CAN-FD."],
    ["Can it run a real production process?", "OpenArm is a platform for learning, teleoperation, and data collection. For work that needs validated process performance, we pair it with an RB20-class industrial arm so the platform matches the job."],
    ["How open is it?", "The CAD, BOM, and control software are public, so you can extend the hardware and integrate the software yourself."],
  ] : [
    ["OpenArm 1.1과 2.0은 무엇이 다른가요?", "2.0은 최신 구동계와 인터페이스를 갖춘 현재 세대 양팔 플랫폼이자 메인 제품입니다. 1.1은 이전 세대 시리즈로 계속 제공됩니다. 두 모델 모두 오픈소스이며, 1.1의 상세 사양과 구성은 전용 페이지(상단 메뉴 → OpenArm 1.1)에서 확인할 수 있습니다."],
    ["KER은 무엇인가요?", "KER은 리더-팔로워 텔레오퍼레이션에 쓰는 리더 장치입니다. KER을 손으로 움직이면 OpenArm(팔로워)이 그 동작을 그대로 따라오고, 그 궤적을 학습용 데이터로 기록합니다. 원격 조작과 시연 기반 데이터 수집에 사용합니다."],
    ["OpenArm 가격은 얼마인가요?", "구성과 옵션에 따라 개별 견적으로 안내합니다. 스토어에서 본체·카메라·KER 등 원하는 구성을 담아 견적을 요청하면, 배송·설치·시연을 포함한 금액으로 회신드립니다."],
    ["스펙이 어떻게 되나요?", "OpenArm 2.0은 7자유도 팔 두 개(양팔), 약 633mm 리치, DAMIAO 액추에이터, 24V DC 시스템으로 구성됩니다. 제어는 ROS 2, Python, CAN-FD API를 지원합니다."],
    ["로봇을 어떻게 가르치나요?", "전통적 티칭 펜던트를 쓰지 않습니다. KER을 이용한 리더-팔로워 텔레오퍼레이션과, 로봇 팔을 직접 손으로 잡는 kinesthetic 티칭으로 동작을 가르칩니다. 필요하면 ROS 2·Python·CAN-FD로 직접 제어할 수 있습니다."],
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
