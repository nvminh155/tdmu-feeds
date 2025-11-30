"use client";

import { Home, Newspaper, Heart, Bell } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FEEDS_NAV_ITEMS } from "@/config";
import { cn } from "@/lib/utils";

export default function MobileBottomNav() {
  const pathname = usePathname();

  const navItems = [
    {
      href: "/feeds",
      label: "Trang chủ",
      icon: Home,
      isActive: pathname === "/feeds",
      blank: false,
    },
    {
      href: "/feeds/pages-info",
      label: "Trang",
      icon: Newspaper,
      isActive: pathname === "/feeds/pages-info",
      blank: false,
    },
    ...FEEDS_NAV_ITEMS.map((item) => {
      return { ...item, isActive: pathname === item.href };
    }),
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border md:hidden h-(--bottom-nav-height)">
      <div className="flex items-center justify-around h-(--bottom-nav-height) px-2 pb-safe">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}  
              className={`flex flex-col items-center justify-center gap-1 flex-1 py-2 rounded-lg transition-colors ${
                item.isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              target={item.blank ? "_blank" : "_self"}
              scroll={false}
            >
              <div
                className={`p-1.5 rounded-full transition-colors ${
                  item.isActive ? "bg-primary/10" : ""
                }`}
              >
                <Icon
                  size={22}
                  className={cn("max-xs:size-4", {
                    "fill-current": item.isActive && item.icon === Heart,
                  })}
                />
              </div>
              <span className="text-xs font-medium text-center">
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
