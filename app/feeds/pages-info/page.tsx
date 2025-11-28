import { Metadata } from "next";
import PageInfoList from "./page-info-list";

export const metadata: Metadata = {
  title: "TDMU Feeds | Thông tin về các trang",
  description:
    "Thông tin về các trang, câu lạc bộ, tổ chức thuộc Đại học Thủ Dầu Một nơi có đăng các bài viết liên quan đến trường.",
};

const PagesInfo = () => {
  return <PageInfoList />;
};

export default PagesInfo;
