import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Products - OpenArm Devkits | Libertron",
  description: "Browse OpenArm robotics devkits, bimanual systems, and accessories. Assembled in Korea.",
  openGraph: {
    title: "Products - OpenArm Devkits | Libertron",
    description: "Browse OpenArm robotics devkits, bimanual systems, and accessories. Pre-assembled 14DOF robot arms shipped globally from South Korea.",
    url: "https://openarm.co.kr/products",
    type: "website",
  },
  alternates: {
    canonical: "/products",
    languages: {
      "ko-KR": "/products",
      "en-US": "/products?lang=en",
      "x-default": "/products",
    },
  },
};

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
