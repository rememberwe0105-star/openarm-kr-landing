import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resources - OpenArm | Libertron",
  description: "Official documentation, GitHub repositories, and community links for Libertron OpenArm.",
  openGraph: {
    title: "Resources - OpenArm | Libertron",
    description: "Access official OpenArm documentation, GitHub source code, CAD files, and join the developer community on Discord.",
    url: "https://openarm.co.kr/resources",
    type: "website",
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
