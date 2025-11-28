import {
  TFavoriteProfile,
  TPage,
  TPost,
  TPostTag,
  TPostType,
} from "@/types/post";
import { kyApi, kyAuthApi } from "@/lib/ky/ky-instance";

type TGetNewsFeedParams = {
  type: string | TPostType;
  dateRange: { from?: string; to?: string };
  searchQuery?: string;
  isShownFavoriteOnly?: boolean;
  lastId?: string;
};

const NewsService = {
  getNewsFeed: async (payload: TGetNewsFeedParams, userId?: string) => {
    if (userId) {
      return await kyAuthApi.post<TPost[]>("news/with-favorite", {
        json: payload,
      });
    } else {
      return await kyApi.post<TPost[]>("news", {
        json: payload,
      });
    }
  },
  getPageProfiles: async (userId?: string) => {
    if (userId) {
      return await kyAuthApi.get<Record<string, TPage>>(
        `news/page-profiles/with-favorite`
      );
    } else {
      return await kyApi.get<Record<string, TPage>>("news/page-profiles");
    }
  },
  getPostImages: async (post_id: string) => {
    return await kyApi.get<string[]>(`news/post-images/${post_id}`, {});
  },
  getFavoriteProfiles: async () => {
    return await kyAuthApi.get<TFavoriteProfile[]>("news/favorite-profiles");
  },
  addFavoriteProfile: async (profile_short_name: string) => {
    return await kyAuthApi.post<string[]>(
      "news/favorite-profiles/" + profile_short_name
    );
  },
  removeFavoriteProfile: async (profile_id: string) => {
    return await kyAuthApi.delete<string[]>(
      `news/favorite-profiles/${profile_id}`
    );
  },
  getTagsNews: async () => {
    return await kyApi.get<TPostTag[]>("news/tags");
  },
  getPinned: async () => {
    try {
      return await kyApi.get<TPost[]>("news/pinned");
    } catch (error) {
      console.error(error);
      return [];
    }
  },
};

export default NewsService;
