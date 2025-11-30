"use client";

import AuthButton from "@/components/auth/auth-button";
import { LoaderCircle } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import Image from "next/image";
import { FEEDS_NAV_ITEMS } from "@/config";

export function TopBar() {
  return (
    <div className="border-b border-border bg-card sticky top-0 z-30 h-(--header-height)">
      {/* Header with logo and login */}
      <div className="px-6 py-3 flex items-center justify-between ">
        <Link href="/feeds" className="flex items-center gap-3">
          <Image
            src="/og-img.png"
            alt="TDMU News Feed"
            width={50}
            height={50}
          />
          {/* <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-sm">
            <span className="text-primary-foreground text-lg font-bold">T</span>
          </div> */}
          <div className="hidden sm:block">
            <h1 className="text-lg font-bold bg-gradient-to-r from-primary via-blue-600 to-indigo-600 bg-clip-text text-transparent">
              TDMU Feed
            </h1>
            <p className="text-xs text-muted-foreground">
              Thu Dau Mot University
            </p>
          </div>
        </Link>

        <NavList items={FEEDS_NAV_ITEMS} />

        <div className="flex items-center gap-4">
          <Suspense fallback={<LoaderCircle className="size-5 animate-spin" />}>
            <AuthButton />
          </Suspense>
        </div>
      </div>
    </div>
  );
}

const NavList = ({
  items,
}: {
  items: { href: string; label: string; icon: any }[];
}) => {
  return (
    <ul className="flex items-center gap-4 max-md:hidden px-2">
      {items.map((item) => (
        <NavItem
          key={item.href}
          href={item.href}
          label={item.label}
          icon={item.icon}
        />
      ))}
    </ul>
  );
};

const NavItem = ({
  href,
  label,
  icon,
}: {
  href: string;
  label: string;
  icon: any;
}) => {
  const Icon = icon;
  return (
    <Link
      href={href}
      target="_blank"
      className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-2 transition-colors"
    >
      <Icon className="size-4" />
      {label}
    </Link>
  );
};
