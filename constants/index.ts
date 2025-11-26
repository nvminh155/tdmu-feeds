export const API_PATH = {
  LOGOUT: "/api/auth/logout",
};

export const ROUTE_PATH = {
  HOME: "/",
  ABOUT: "/about",
  FORUM: "/forum",
  CONTACT: "/contact",
  LOGIN: "/login",
  REGISTER: "/register",
  SB_STORAGE: {
    public: process.env.NEXT_PUBLIC_SUPABASE_URL + "/storage/v1/object/public/",
  },
};  

export const BUCKET_NAME = {
  rss_info: "rss_info",
};
