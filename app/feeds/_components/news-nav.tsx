  "use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

const LINKS = [
  {
    label: "Tin tức",
    href: "/feeds",
  },
  {
    label: "Thông tin các trang",
    href: "/feeds/pages-info",
  },
];

const NewsNav = () => {
  const pathname = usePathname();
  return (
    <div className="my-4 flex flex-wrap items-center gap-2 px-2">
      {LINKS.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={cn(
            "text-sm text-gray-500 hover:text-primary",
            pathname.endsWith(link.href) &&
              "font-semibold text-primary underline"
          )}
        >
          {link.label}
        </Link>
      ))}
    </div>
  );
};

export default NewsNav;
