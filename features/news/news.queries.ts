import NewsService from "@/services/news.service";
import { queryOptions } from "@tanstack/react-query";

const newsQueries = {
  allKey: () => ["all-news"],
  listKey: () => [...newsQueries.allKey(), "list"],
  favoriteProfilesKey: (userId?: string) => [
    ...newsQueries.allKey(),
    "favorite-profiles",
    userId,
  ],
  favoriteProfiles: (userId?: string) =>
    queryOptions({
      queryKey: newsQueries.favoriteProfilesKey(userId),
      queryFn: () => NewsService.getFavoriteProfiles(userId ?? ""),
    }),
  pinnedKey: () => [...newsQueries.allKey(), "pinned"],
  pinned: () =>
    queryOptions({
      queryKey: newsQueries.pinnedKey(),
      queryFn: () => NewsService.getPinned(),
    }),
};

export default newsQueries;
