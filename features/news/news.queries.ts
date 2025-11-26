import NewsService from "@/services/news.service";
import { queryOptions } from "@tanstack/react-query";

const newsQueries = {
  allKey: () => ["all-news"],
  listKey: () => [...newsQueries.allKey(), "list"],
  favoriteProfilesKey: () => [...newsQueries.allKey(), "favorite-profiles"],
  favoriteProfiles: () =>
    queryOptions({
      queryKey: newsQueries.favoriteProfilesKey(),
      queryFn: () => NewsService.getFavoriteProfiles(),
    }),
  pinnedKey: () => [...newsQueries.allKey(), "pinned"],
  pinned: () =>
    queryOptions({
      queryKey: newsQueries.pinnedKey(),
      queryFn: () => NewsService.getPinned(),
    }),
};

export default newsQueries;
