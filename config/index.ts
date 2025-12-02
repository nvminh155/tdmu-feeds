import { Plus, Star } from "lucide-react";

export const port = process.env.PORT ?? 3000;
export const host = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : `http://localhost:${port}`;

export const localePrefix = "as-needed";

export type TLocaleSwitcher = {
  code: string;
  flag: string;
};

export const localeSwitcher: TLocaleSwitcher[] = [
  { code: "en", flag: "flagpack:gb-ukm" },
  { code: "vi", flag: "flagpack:vn" },
] as const;

export const locales = localeSwitcher.map((locale) => locale.code);
export const defaultLocale = localeSwitcher[0].code;

export const PUBLIC_ROUTES = {
  "/": ["/"],
  "/login": ["/login"],
  "/feeds": ["/feeds", "/feeds/pages-info"],
  "/sitemap": ["/sitemap", "/sitemap/sitemap.ts","/sitemap/sitemap.xml"],
} as const;

export type TPublicRoute = typeof PUBLIC_ROUTES;
export type TRoutePaths = keyof TPublicRoute;

export const defaultPaginationParams = {
  page: 1,
  pageSize: 10,
  keyword: "",
} as const;
export type TPaginationParams = typeof defaultPaginationParams;

// Use the default: `always`
export const FEEDS_NAV_ITEMS = [
  {
    href: "https://forms.gle/aKnC2yMKecaCXo8x8",
    label: "Đánh giá",
    icon: Star,
    blank: true,
  },
  {
    href: "https://forms.gle/r4WLXrsEYNzryjxy5",
    label: "Bổ sung trang",
    icon: Plus,
    blank: true,
  },
] ;