"use client";

import { useSession } from "@/contexts/session-provider";
import NewsService from "@/services/news.service";
import { useQuery } from "@tanstack/react-query";

import { PageInfoCardSkeletonList } from "./page-info-card-skeleton";
import PageInfoCard from "./page-info-card";


const PageInfoList = () => {
  const { user } = useSession();

  const { data, isLoading } = useQuery({
    queryKey: ["rss_profiles", user?.id],
    queryFn: async () => {
      return await NewsService.getPageProfiles(user?.id);
    },
    retry: 2,
    cacheTime: 1000 * 60 * 30,
    staleTime: 1000 * 60 * 15,
  });

  return (
    <div className="mx-auto mt-8 pb-8 px-6 max-md:pb-[calc(var(--bottom-nav-height)+8px)]">
      <h1 className="my-4 text-2xl font-bold">Thông tin các trang</h1>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3">
        {isLoading ? (
          <PageInfoCardSkeletonList count={6} />
        ) : (
          Object.values(data ?? {}).map((page) => (
            <PageInfoCard key={page.short_name} page={page} />
          ))
        )}
      </div>
    </div>
  );
}

export default PageInfoList;