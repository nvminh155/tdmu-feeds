"use client";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { ROUTE_PATH } from "@/constants";
import { useFavoriteProfilesQuery } from "@/features/news";
import { BookOpen, Heart, Home,  } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import EmptyFavorite from "./empty-favorite";
import { useSession } from "@/contexts/session-provider";

const navigationItems = [
  {
    label: "Trang chủ",
    icon: Home,
    href: "/feeds",
  },
  {
    label: "Thông tin các trang",
    icon: BookOpen,
    href: "/feeds/pages-info",

  },
];

export default function NewsAppSidebar({
  className,
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const { user } = useSession();
  const { data: favoriteProfiles } = useFavoriteProfilesQuery(user?.id ?? "");
  const pathname = usePathname();
  const router = useRouter();
  return (
    <Sidebar
      {...props}
      collapsible="icon"
      className={cn(
        "",
        className
      )}
    >
      <SidebarContent className="bg-white">
        <SidebarGroup>
          <SidebarGroupLabel className="flex items-center gap-2 text-black">
            <span className="text-sm font-medium">Điều hướng</span>
          </SidebarGroupLabel>

          <SidebarGroupContent className="mt-4">
            <SidebarMenu className="space-y-2">
              {navigationItems?.map((item) => {
                const isActive = pathname.endsWith(item.href);
                return (
                  <SidebarMenuItem key={item.href} className="">
                    <SidebarMenuButton
                      isActive={isActive}
                      onClick={() => router.push(item.href)}
                      className={cn("group/nav-item", {
                        "bg-primary/5! text-primary!": isActive,
                        "text-muted-foreground transition-all duration-200 hover:bg-primary/5":
                          !isActive,
                      })}
                    >
                      <item.icon className="size-4 group-hover/nav-item:text-primary" />
                      <span className="text-sm">{item.label}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <Separator />
        <SidebarGroup>
          <SidebarGroupLabel className="flex items-center gap-2">
            <Heart className="size-4 fill-red-400 text-red-400" />
            <span className="text-sm font-medium text-red-500">Yêu thích</span>
          </SidebarGroupLabel>
  
          <SidebarGroupContent className="mt-4">
            <SidebarMenu className="space-y-2">
              {favoriteProfiles?.map((profile) => {
                return (
                  <SidebarMenuItem
                    key={profile.profile_short_name}
                    className="group flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2">
                      <Image
                        src={
                          ROUTE_PATH.SB_STORAGE.public +
                          (profile.rss_profile.avatar ?? "")
                        }
                        alt={profile.rss_profile.name}
                        width={26}
                        height={26}
                        className="aspect-square rounded-full object-cover"
                      />
                      <div className="flex flex-1 flex-col items-start text-sm">
                        <Tooltip delayDuration={800}>
                          <TooltipTrigger asChild>
                            <span className="line-clamp-1 select-none text-sm font-medium">
                              {profile.rss_profile.name}
                            </span>
                          </TooltipTrigger>
                          <TooltipContent side="right">
                            <p>{profile.rss_profile.name}</p>
                          </TooltipContent>
                        </Tooltip>

                        <span className="text-xs text-gray-500">
                          @{profile.profile_short_name}
                        </span>
                      </div>
                    </div>
                    <Button className="group/heart relative h-max w-max bg-transparent p-1 hover:bg-transparent">
                      <Heart
                        className={cn(
                          "size-4 fill-red-400 text-red-400 transition-transform duration-200 group-hover/heart:scale-[1.4]",
                          {
                            "fill-none text-current": !profile.status,
                          }
                        )}
                      />
                    </Button>
                  </SidebarMenuItem>
                );
              })}


              {!favoriteProfiles?.length && <EmptyFavorite />}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
