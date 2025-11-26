"use client"

import { Home, Newspaper, Heart, Bell } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function MobileBottomNav() {
  const pathname = usePathname()

  const navItems = [
    {
      href: "/feeds",
      label: "Trang chủ",
      icon: Home,
      isActive: pathname === "/feeds",
    },
    {
      href: "/feeds/pages-info",
      label: "Trang yêu thích",
      icon: Newspaper,
      isActive: pathname === "/feeds/pages-info",
    },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border md:hidden">
      <div className="flex items-center justify-around h-16 px-2 pb-safe">
        {navItems.map((item) => {
          const Icon = item.icon
          return (
            <Link
              key={item.href}
              href={item.href}
              scroll={true}
              className={`flex flex-col items-center justify-center gap-1 flex-1 py-2 rounded-lg transition-colors ${
                item.isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <div className={`p-1.5 rounded-full transition-colors ${item.isActive ? "bg-primary/10" : ""}`}>
                <Icon size={22} className={item.isActive && item.icon === Heart ? "fill-current" : ""} />
              </div>
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
