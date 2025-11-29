import { useMemo } from "react";
import { useSession } from "@/contexts/session-provider";
import newsQueries from "@/features/news/news.queries";
import NewsService from "@/services/news.service";
import { useFeedsFilterStore } from "@/stores/news/feeds-filter.store";
import { getEndOfDay, getStartOfDay } from "@/utils/date";
import { useInfiniteQuery } from "@tanstack/react-query";

import { TPost } from "@/types/post";

export const useFeeds = () => {
  const { user } = useSession();
  const {
    searchQuery,
    dateRange,
    starredOnly,
    groupByDate,
    type,
    isShownFavoriteOnly,
    lastId,
  } = useFeedsFilterStore();

  const queryKey = useMemo(() => {
    return [
      ...newsQueries.listKey(),
      searchQuery,
      dateRange,
      starredOnly,
      groupByDate,
      type,
      isShownFavoriteOnly,
      lastId,
    ];
  }, [
    searchQuery,
    dateRange,
    starredOnly,
    groupByDate,
    type,
    isShownFavoriteOnly,
    lastId,
  ]);

  const query = useInfiniteQuery({
    queryKey,
    queryFn: async ({ pageParam }) => {
      const payload = {
        type,
        dateRange: {
          from: dateRange.from
            ? getStartOfDay(dateRange.from).toISOString()
            : undefined,
          to: dateRange.to
            ? getEndOfDay(dateRange.to).toISOString()
            : undefined,
        },
        searchQuery,
        isShownFavoriteOnly,
        lastDateTime: pageParam,
      };

      let data = await NewsService.getNewsFeed(payload, user?.id);

      data = data ?? [];

      const result = data.map((item: TPost) => ({
        ...item,
        // page_info: pages?.[item.short_name],
      })) as TPost[];

      return result;
    },
    getNextPageParam: (lastPage) => {
      const lastItem = lastPage[lastPage.length - 1];
      if (!lastItem) return undefined;
      return new Date(lastItem.converted_time).toISOString();
    },
    staleTime: (1000 * 60 * 10) - (2 * 1000),
    retry: 2,
  });

  return query;
};
