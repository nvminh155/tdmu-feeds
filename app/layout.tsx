import type { Metadata } from "next";
import "./globals.css";
import Providers from "./providers";
import { cn } from "@/lib/utils";
import { geistMono } from "@/styles/fonts";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL!),
  title: "TDMU Feeds | Nền tảng tổng hợp tin tức đến từ TDMU",
  description:
    "TDMU Feeds là nền tảng tổng hợp tin tức từ các câu lạc bộ và tổ chức thuộc Đại học Thủ Dầu Một. Giúp sinh viên cập nhật thông tin nhanh chóng và tiện lợi.",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "TDMU Feeds",
    description:
      "TDMU Feeds là nền tảng tổng hợp tin tức từ các câu lạc bộ và tổ chức thuộc Đại học Thủ Dầu Một.",
    url: process.env.NEXT_PUBLIC_SITE_URL ?? "",
    siteName: "TDMU Feeds",
    type: "website",
    locale: "vi_VN",
    images: '/og-img.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn(geistMono.variable)}>
      <body className={` h-full min-h-screen`}>
        <Providers>
          <div className="relative h-full">
            <main className="relative  flex-1">{children}</main>
          </div>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
