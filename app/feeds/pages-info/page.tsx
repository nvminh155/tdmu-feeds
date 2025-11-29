import { Metadata } from "next";
import PageInfoList from "./page-info-list";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "TDMU Feeds | Thông tin về các trang",
  description:
    "Thông tin về các trang, câu lạc bộ, tổ chức thuộc Đại học Thủ Dầu Một nơi có đăng các bài viết liên quan đến trường.",
};

const PagesInfo = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PageInfoList />
    </Suspense>
  );
};

export default PagesInfo;
