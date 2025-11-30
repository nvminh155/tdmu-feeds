import React from "react";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

import NewsAppSidebar from "./_components/news-app-sidebar";
import { TopBar } from "./_components/top-bar";
import MobileBottomNav from "./_components/mobile-bottom-nav";

const NewsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <TopBar />
      <SidebarProvider className="">
        <NewsAppSidebar className="fixed bg-white! min-h-[calc(100vh-var(--header-height))] top-(--header-height)" />

        <SidebarInset className="h-full">
          {/* <SidebarTrigger className="fixed  z-30 top-(--header-height)   " /> */}

          <div className="">
            {children}
          </div>
        </SidebarInset>
        <MobileBottomNav />
      </SidebarProvider>
    </div>
  );
};

export default NewsLayout;
