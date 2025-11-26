export type TPostType = "training_point" | "event" | "other";

export type TPost = {
  id: string;
  url: string;
  images: string;
  content: string;
  original_time: string;
  converted_time: string;
  source_from: string;
  summarization: string;
  tags: string[];
  is_pinned?: boolean;
  short_name: string;
  page_info: TPage;
  uuid: string;
  type: TPostType;
  isStarred: boolean;
  title: string;
  is_hot_news: boolean;
};

export type TPage = {
  url: string;
  name: string;
  avatar?: string;
  short_name: string;
  favorite_status?: boolean;
  source_from: string;
};

export type TFavoriteProfile = {
  rss_profile: TPage;
  user_id: string;
  profile_short_name: string;
  created_at: string;
  status: boolean;
};

export type TPostTag = {
  id: string;
  name: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};
