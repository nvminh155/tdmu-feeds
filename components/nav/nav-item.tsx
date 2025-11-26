"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

import { cn } from "@/lib/utils";
import {
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";

interface NavItemProps {
  title: string;
  url: string;
}

const NavItem = ({ title, url }: NavItemProps) => {
  const pathname = usePathname();

  const isActive = pathname === url;
  return (
    <NavigationMenuItem>
      <NavigationMenuLink
        asChild
        className={cn(
          "group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors",
          isActive && "font-bold text-primary",
          !isActive && "hover:bg-primary/10 hover:text-primary"
        )}
      >
        <Link href={url}>{title}</Link>
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
};

const NavItemMobile = ({ title, url }: NavItemProps) => {
  const pathname = usePathname();
  const isActive = pathname === url;

  return (
    <Link
      key={title}
      href={url}
      className={cn(
        "text-md font-semibold",
        isActive && "text-primary",
        !isActive && "hover:text-primary"
      )}
    >
      {title}
    </Link>
  );
};
export { NavItem, NavItemMobile };
