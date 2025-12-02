"use client";

import { Calendar } from "lucide-react";

import { Button } from "@/components/ui/button";

import "@/styles/reset-feed.css";

import { useEffect, useMemo, useRef } from "react";
import { isToday, isYesterday } from "@/utils/date";
import { formatDistanceToNowStrict } from "date-fns";
import { vi } from "date-fns/locale";

import { TPost } from "@/types/post";
import { useFeeds } from "@/hooks/queries/use-feeds";

import FeedCard from "./feed-card";
import ScrollToTopBtn from "./scroll-to-top-btn";
import { Spinner } from "@/components/ui/spinner";

const groupedData = (data: TPost[], groupByDate: boolean) => {
  if (!groupByDate) {
    return { ungrouped: data };
  }

  const groups: Record<string, TPost[]> = {};

  data.forEach((item) => {
    const date = new Date(item.converted_time);
    let formattedDate = "";
    if (isToday(date)) {
      formattedDate = "Hôm nay";
    } else if (isYesterday(date)) {
      formattedDate = "Hôm qua";
    } else {
      formattedDate = formatDistanceToNowStrict(date, {
        locale: vi,
        addSuffix: true,
      });
    }

    if (!groups[formattedDate]) {
      groups[formattedDate] = [];
    }
    groups[formattedDate].push(item);
  });

  return groups;
};

export function FeedList() {
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useFeeds();

  const observerRef = useRef(null);
  useEffect(() => {
    if (!observerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            fetchNextPage();
          }
        });
      },
      {
        threshold: 0.5,
      }
    );

    observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, [data?.pages]);

  const groupedPosts = useMemo(() => {
    const feedData = data?.pages.flatMap((page) => page);
    return groupedData(feedData ?? [], true);
  }, [data?.pages]);

  if (isLoading) {
    return (
      <div className="py-12 text-center flex items-center gap-2 px-6">
        <Spinner />
        <p className="text-muted-foreground">Đang tải dữ liệu...</p>
      </div>
    );
  }

  if (
    !groupedPosts ||
    Object.keys(groupedPosts).length === 0 ||
    groupedPosts["ungrouped"]?.length === 0
  ) {
    return (
      <div className="py-12 text-center px-6">
        <p className="text-muted-foreground">Không tìm thấy dữ liệu phù hợp.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-(--bottom-nav-height)">
      {Object.entries(groupedPosts || {}).map(([groupName, items], pidx) => (
        <div key={groupName} className="space-y-4">
          {groupName !== "ungrouped" && (
            <div className="flex items-center gap-3 px-6 sticky top-[calc(var(--header-height)+105px+8px)] max-xs:top-[calc(var(--header-height)+149px+8px)] py-4 bg-background z-2 w-full">
              <div className=" w-max px-4 py-1 h-max flex items-center gap-3 border-b bg-primary/10 text-primary rounded-full ">
                <Calendar className="h-4 w-4 text-lg text-primary dark:text-secondary-foreground" />
                <h3 className="text-sm font-semibold text-primary dark:text-secondary-foreground">
                  {groupName}
                </h3>
                {/* <Badge variant="outline">{items.length} bài viết</Badge> */}
              </div>
              <div className="flex-1 h-px bg-border" />
            </div>
          )}

          <div className="items grid grid-cols-1 gap-10 px-6">
            {items.map((item, idx) => (
              <div
                key={item.id}
                ref={
                  idx === items.length - 1 &&
                  pidx === Object.keys(groupedPosts).length - 1
                    ? observerRef
                    : null
                }
              >
                <FeedCard item={item} />
              </div>
            ))}
          </div>
        </div>
      ))}

      {groupedPosts && hasNextPage && data?.pages && (
        <Button
          size="sm"
          variant="secondary"
          className="gap-2 border border-border mx-5"
        >
          {isFetchingNextPage ? <Spinner /> : "Xem thêm"}
        </Button>
      )}
      <ScrollToTopBtn />
    </div>
  );
}
