"use client";

import NewsService from "@/services/news.service";
import { useQuery } from "@tanstack/react-query";

import { Spinner } from "@/components/ui/spinner";

const PreFetchPage = ({ children }: { children: React.ReactNode }) => {
  const { data, isLoading } = useQuery({
    queryKey: ["rss_profiles"],
    queryFn: async () => {
      return await NewsService.getPageProfiles();
    },
    staleTime: 1000 * 60 * 60 * 24,
  });

  if (isLoading) {
    return (
      <div className="py-12 text-center">
        <Spinner />
        <p className="text-muted-foreground">Đang tải dữ liệu...</p>
      </div>
    );
  }

  if (data) return children;
};

export default PreFetchPage;
