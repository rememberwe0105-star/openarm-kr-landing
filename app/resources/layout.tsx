import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resources - OpenArm | Libertron",
  description: "Official documentation, GitHub repositories, and community links for Libertron OpenArm.",
  openGraph: {
    title: "Resources - OpenArm | Libertron",
    description: "Documentation and resources for OpenArm.",
    url: "https://openarm.co.kr/resources",
  },
  alternates: {
    canonical: "/resources",
    languages: {
      "ko-KR": "/resources",
      "en-US": "/resources?lang=en",
      "x-default": "/resources",
    },
  },
};

export default function ResourcesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
