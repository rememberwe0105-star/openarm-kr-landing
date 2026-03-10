"use client";

import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import ScrollProgress from "@/components/ui/ScrollProgress";
import { Book, Github, MessageSquare } from "lucide-react";

export default function ResourcesPage() {
  const resources = [
    {
      title: "Official Documentation",
      description: "Learn how to build, deploy, and configure OpenArm from scratch.",
      icon: <Book size={32} className="text-point group-hover:scale-110 transition-transform" />,
      link: "https://docs.openarm.dev/",
      buttonText: "Read Docs",
    },
    {
      title: "GitHub Repository",
      description: "Access all source code, CAD files, and issues to start contributing.",
      icon: <Github size={32} className="text-point group-hover:scale-110 transition-transform" />,
      link: "https://github.com/enactic/OpenArm",
      buttonText: "View Source",
    },
    {
      title: "Discord Community",
      description: "Join the conversation with developers, share projects, and get help.",
      icon: <MessageSquare size={32} className="text-point group-hover:scale-110 transition-transform" />,
      link: "https://discord.gg/FsZaZ4z3We",
      buttonText: "Join Discord",
    }
  ];

  return (
    <main className="min-h-screen bg-background-main flex flex-col pt-20">
      <ScrollProgress />
      <Navbar />

      <section className="flex-1 px-6 md:px-12 lg:px-24 py-16 md:py-24 max-w-[1400px] mx-auto w-full">
        <div className="text-center mb-16 md:mb-24">
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-black tracking-tighter text-foreground-main mb-6">
            Developer <span className="text-point">Resources</span>
          </h1>
          <p className="text-foreground-sub text-lg md:text-xl max-w-2xl mx-auto font-medium leading-relaxed">
            오픈소스의 진정한 가치는 커뮤니티에서 나옵니다.<br />
            오픈암의 모든 기술 문서, 도면, 그리고 개발자 포럼에 자유롭게 참여하세요.
          </p>
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
              <h3 className="text-2xl font-bold text-foreground-main mb-4">{resource.title}</h3>
              <p className="text-foreground-sub font-medium leading-relaxed mb-8 flex-1">
                {resource.description}
              </p>
              <a 
                href={resource.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-full bg-foreground-main text-background-main px-6 py-4 rounded-xl text-md font-bold hover:bg-point hover:text-white transition-all duration-300"
              >
                {resource.buttonText}
              </a>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
