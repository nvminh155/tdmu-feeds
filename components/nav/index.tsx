import Link from "next/link";
import { ROUTE_PATH } from "@/constants";
import { GraduationCap, Menu, Sparkle } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import AuthButton from "@/components/auth/auth-button";

import { NavItem, NavItemMobile } from "./nav-item";
import { Header } from "../layouts/header";

interface MenuItem {
  title: string;
  url: string;
}

const NAV_MENU_ITEMS: MenuItem[] = [
  { title: "Trang chủ", url: ROUTE_PATH.HOME },
  {
    title: "Về UniSup",
    url: ROUTE_PATH.ABOUT,
  },
  {
    title: "Cộng đồng",
    url: ROUTE_PATH.FORUM,
  },
  {
    title: "Liên hệ",
    url: ROUTE_PATH.CONTACT,
  },
];

export default function Nav() {
  return (
    <section className="fixed top-0 z-20 w-full border-b p-4 bg-white">
      <div className="container mx-auto">
        {/* Desktop Menu */}
        <nav className="flex justify-between lg:flex">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600">
                <GraduationCap className="h-5 w-5 text-white" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-lg font-bold text-gray-900">
                  TDMU News Feed
                </h1>
                <p className="text-xs text-gray-500">Thủ Dầu Một University</p>
              </div>
            </div>
          </div>

          <AuthButton />
        </nav>

      </div>
    </section>
  );
}

const Logo = () => {
  return (
    <Link href="/" className="flex items-center gap-1">
      <Sparkle className="size-5" />
      <span className="text-lg font-semibold tracking-tighter">UniSup</span>
    </Link>
  );
};
