import React from "react";

import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

import NewsAppSidebar from "./_components/news-app-sidebar";
import { TopBar } from "./_components/top-bar";
import MobileBottomNav from "./_components/mobile-bottom-nav";
// import NewsNav from "./_components/news-nav";

const NewsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider className="">
      <NewsAppSidebar className="fixed bg-white!" />

      <SidebarInset className="">
        <TopBar />
        {/* <SidebarTrigger className="fixed  z-30 top-(--header-height)   " /> */}

        <div className="flex-1 min-h-[calc(100vh-var(--header-height))]">{children}</div>
      </SidebarInset>
      <MobileBottomNav />
    </SidebarProvider>
  );
};

export default NewsLayout;
