"use client";

import { useState } from "react";
import { useSession } from "@/contexts/session-provider";
import {
  Bell,
  GraduationCap,
  Home,
  LogOut, 
  Menu,
  Settings,
  User,
  Users,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export function Header() {
  const { user, session } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  const navigationItems = [
    { name: "Trang chủ", href: "/", icon: Home },
    { name: "Cộng đồng", href: "/forum", icon: Users },
  ];

  return (
    <header className="fixed top-0 z-50 w-full border-b backdrop-blur-sm supports-[backdrop-filter]:bg-white/60">
      <div className="container flex h-16 items-center justify-between px-4">
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

        {/* Desktop Navigation */}
        <nav className="hidden items-center space-x-6 md:flex">
          {navigationItems.slice(0, 4).map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-sm font-medium text-gray-600 transition-colors hover:text-blue-600"
            >
              {item.name}
            </a>
          ))}
        </nav>

        {/* Right side - Auth and Mobile Menu */}
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          {session && (
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="h-4 w-4" />
              <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-red-500 text-xs"></span>
            </Button>
          )}

          {/* Authentication */}
          {session ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-8 w-8 rounded-full"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src={user?.user_metadata.avatar_url || ""}
                      alt={user?.email || ""}
                    />
                    <AvatarFallback>
                      {user?.email?.charAt(0) || "U"}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {user?.email}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {session.user?.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Hồ sơ cá nhân</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Cài đặt</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => {}}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Đăng xuất</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button
              onClick={() => {}}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Đăng nhập với Google
            </Button>
          )}

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="mt-4 flex flex-col space-y-4">
                <div className="flex items-center space-x-2 border-b pb-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600">
                    <GraduationCap className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold">TDMU Portal</h2>
                    <p className="text-xs text-gray-500">
                      Thủ Dầu Một University
                    </p>
                  </div>
                </div>

                {session && (
                  <div className="flex items-center space-x-3 rounded-lg bg-gray-50 p-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={user?.user_metadata.avatar_url || ""} />
                      <AvatarFallback>{user?.email?.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{user?.email}</p>
                      <p className="text-sm text-gray-500">
                        {session.user?.email}
                      </p>
                    </div>
                  </div>
                )}

                <nav className="flex flex-col space-y-2">
                  {navigationItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <a
                        key={item.name}
                        href={item.href}
                        className="flex items-center space-x-3 rounded-lg px-3 py-2 text-gray-600 transition-colors hover:bg-gray-100 hover:text-blue-600"
                        onClick={() => setIsOpen(false)}
                      >
                        <Icon className="h-5 w-5" />
                        <span>{item.name}</span>
                      </a>
                    );
                  })}
                </nav>

                {session && (
                  <div className="space-y-2 border-t pt-4">
                    <Button variant="ghost" className="w-full justify-start">
                      <Settings className="mr-2 h-4 w-4" />
                      Cài đặt
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-red-600 hover:bg-red-50 hover:text-red-700"
                      onClick={() => {}}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Đăng xuất
                    </Button>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
