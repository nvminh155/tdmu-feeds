import HomeTabs from "./home-tabs";

import type { Metadata,  } from "next";

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export const metadata: Metadata = {
  title: "TDMU Feeds | Tin tức chính",
  description:
    "Nền tảng tổng hợp tin tức chính của Đại học Thủ Dầu Một được cập nhật từ 14 ngày trước đến hiện tại.",
};

export default function NewsHomePage({ params, searchParams }: Props) {
  return <HomeTabs />;
}
