import NewsService from "@/services/news.service";
import { queryOptions } from "@tanstack/react-query";

const newsQueries = {
  allKey: () => ["all-news"],
  listKey: () => [...newsQueries.allKey(), "list"],
  favoriteProfilesMasterKey: () => [...newsQueries.listKey(), "favorite-profiles"],
  favoriteProfilesKey: (userId?: string) => [
    ...newsQueries.favoriteProfilesMasterKey(),
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
