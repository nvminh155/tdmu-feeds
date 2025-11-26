import { useMemo } from "react";
import { useSession } from "@/contexts/session-provider";
import newsQueries from "@/features/news/news.queries";
import NewsService from "@/services/news.service";
import { useFeedsFilterStore } from "@/stores/news/feeds-filter.store";
import { getEndOfDay, getStartOfDay, isToday, isYesterday } from "@/utils/date";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";

import { TPage, TPost } from "@/types/post";

const groupedData = (data: TPost[], groupByDate: boolean) => {
  if (!groupByDate) {
    return { ungrouped: data };
  }

  const groups: Record<string, TPost[]> = {};
  const formatDate = (date: Date) => {
    return (
      date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear()
    );
  };
  data.forEach((item) => {
    const date = new Date(item.converted_time);
    let formattedDate = formatDate(date);
    if (isToday(date)) {
      formattedDate = "Hôm nay";
    } else if (isYesterday(date)) {
      formattedDate = "Hôm qua";
    }

    if (!groups[formattedDate]) {
      groups[formattedDate] = [];
    }
    groups[formattedDate].push(item);
  });

  return groups;
};

const handleFilterData = (
  data: TPost[],
  filters: {
    searchQuery: string;
    dateRange: { from?: Date; to?: Date };
    starredOnly: boolean;
    groupByDate: boolean;
  }
) => {
  const { groupByDate } = filters;

  return groupedData(data, groupByDate);
};

export const useFeeds = () => {
  const queryClient = useQueryClient();
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

      // const pages = queryClient.getQueryData(["rss_profiles"]) as Record<
      //   string,
      //   TPage
      // >;

      const result = data.map((item: TPost) => ({
        ...item,
        // page_info: pages?.[item.short_name],
      })) as TPost[];

      // const ret: Record<string, TPost[]> = handleFilterData(result, {
      //   searchQuery,
      //   dateRange,
      //   starredOnly,
      //   groupByDate,
      // });

      return result;
    },
    getNextPageParam: (lastPage) => {
      // const data = Object.values(lastPage);
      const lastItem = lastPage[lastPage.length - 1];
      if (!lastItem) return undefined;
      return new Date(lastItem.converted_time).toISOString();
    },
  });

  // const query = useQuery({
  //   queryKey,
  //   queryFn: async () => {
  //     const payload = {
  //       type,
  //       dateRange: {
  //         from: dateRange.from
  //           ? getStartOfDay(dateRange.from).toISOString()
  //           : undefined,
  //         to: dateRange.to
  //           ? getEndOfDay(dateRange.to).toISOString()
  //           : undefined,
  //       },
  //       searchQuery,
  //       isShownFavoriteOnly,
  //       lastId,
  //     };

  //     return await NewsService.getNewsFeed(payload, user?.id);
  //   },
  //   select: (data) => {
  //     console.log("select dta", data);
  //     data = data ?? [];

  //     const pages = queryClient.getQueryData(["rss_profiles"]) as Record<
  //       string,
  //       TPage
  //     >;

  //     const result = data.map((item: TPost) => ({
  //       ...item,
  //       page_info: pages?.[item.short_name],
  //     })) as TPost[];

  //     return handleFilterData(result, {
  //       searchQuery,
  //       dateRange,
  //       starredOnly,
  //       groupByDate,
  //     });
  //   },
  // });
  return query;
};
