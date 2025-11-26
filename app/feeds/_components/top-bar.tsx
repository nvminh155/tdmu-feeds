"use client";

import AuthButton from "@/components/auth/auth-button";
import { Search, Bell } from "lucide-react";
import Link from "next/link";


export function TopBar() {
  return (
    <div className="border-b border-border bg-card sticky top-0 z-30 h-(--header-height)">
      {/* Header with logo and login */}
      <div className="px-6 py-3 flex items-center justify-between ">
        <Link href="/feeds" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-sm">
            <span className="text-primary-foreground text-lg font-bold">T</span>
          </div>
          <div className="hidden sm:block">
            <h1 className="text-lg font-bold text-foreground">
              TDMU News Feed
            </h1>
            <p className="text-xs text-muted-foreground">
              Thu Dau Mot University
            </p>
          </div>
        </Link>

        <div className="flex items-center gap-4">

          <AuthButton />
        </div>
      </div>

    </div>
  );
}
