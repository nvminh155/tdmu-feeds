"use client";

import  { useState } from "react";
import Image from "next/image";
import { ROUTE_PATH } from "@/constants";
import { useSession } from "@/contexts/session-provider";
import newsQueries from "@/features/news/news.queries";
import NewsService from "@/services/news.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Copy, ExternalLink, Heart,  } from "lucide-react";
import { toast } from "sonner";

import { TPage } from "@/types/post";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";


import { PageInfoCardSkeletonList } from "./page-info-card-skeleton";


const PagesInfo = () => {
  const { user } = useSession();

  const { data, isLoading } = useQuery({
    queryKey: ["rss_profiles", user?.id],
    queryFn: async () => {
      return await NewsService.getPageProfiles(user?.id);
    },
    staleTime: 1000 * 60 * 60 * 24,
  });

  return (
    <div className="mx-auto mt-8 pb-8 px-6">
      <h1 className="my-4 text-2xl font-bold">Thông tin các trang</h1>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3">
        {isLoading ? (
          <PageInfoCardSkeletonList count={6} />
        ) : (
          Object.values(data ?? {}).map((page) => (
            <Card
              key={page.short_name}
              className={cn(
                "group relative flex max-h-[350px] min-h-[250px] flex-col overflow-hidden rounded-lg border border-border bg-card p-0 px-6 py-6 transition-all duration-300 hover:border-primary/50 hover:shadow-lg",
                {
                  "border-red-500": page.favorite_status,
                }
              )}
            >
              <div
                className={cn(
                  "absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100",
                  {
                    "border-red-500 from-red-500/5 to-transparent opacity-100":
                      page.favorite_status,
                  }
                )}
              />
              {/* Header */}
              <CardHeader className="flex items-start justify-between p-0">
                <div className="flex items-start gap-3">
                  <div>
                    <Image
                      src={ROUTE_PATH.SB_STORAGE.public + (page.avatar ?? "")}
                      className="aspect-square rounded-full object-cover max-md:size-10"
                      alt={page.name}
                      width={50}
                      height={50}
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="line-clamp-2 text-lg font-semibold text-foreground max-lg:text-sm">
                      {page.name}
                    </h3>
                    <span className="mt-1 inline-block rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
                      {page.source_from}
                    </span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="relative mt-auto flex flex-1 flex-col p-0 py-4">
                {/* URL */}
                <div className="mt-auto h-max rounded border border-border bg-muted/50 p-3 py-1">
                  <p className="truncate font-mono text-sm text-muted-foreground">
                    {page.url}
                  </p>
                </div>
              </CardContent>

              <CardFooter className="relative mt-auto flex flex-wrap items-center gap-2 p-0">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 gap-2 bg-transparent"
                  onClick={() => window.open(page.url, "_blank")}
                  title="Open in new tab"
                >
                  <ExternalLink size={14} />
                  <span className="hidden text-sm xs:inline">Open</span>
                </Button>
                <CopyLinkButton url={page.url} />
                <FavoriteProfileToggleButton page={page} />
              </CardFooter>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

const CopyLinkButton = ({ url }: { url: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Button
      variant="outline"
      size="sm"
      className="flex-1 gap-2 bg-transparent"
      onClick={handleCopyLink}
      title="Copy link to clipboard"
    >
      <Copy size={14} />
      <span className="hidden text-sm xs:inline">
        {copied ? "Copied!" : "Copy"}
      </span>
    </Button>
  );
};
const FavoriteProfileToggleButton = ({ page }: { page: TPage }) => {
  const queryClient = useQueryClient();

  const { mutate: toggleFavoriteProfile, isPending: isLoading } = useMutation({
    mutationFn: async ({
      profile_short_name,
      value,
    }: {
      profile_short_name: string;
      value: boolean;
    }) => {
      if (value === true)
        return await NewsService.addFavoriteProfile(profile_short_name);
      else return await NewsService.removeFavoriteProfile(profile_short_name);
    },
    onSuccess: (_, { value }) => {
      queryClient.invalidateQueries({
        queryKey: ["rss_profiles"],
      });
      queryClient.invalidateQueries({
        queryKey: newsQueries.favoriteProfilesKey(),
      });
      toast.success(
        value
          ? "Thêm vào yêu thích thành công"
          : "Xóa khỏi yêu thích thành công"
      );
    },
    onError: (error) => {
      toast.error((error as Error)?.message ?? "Lỗi khi thêm vào yêu thích");
    },
  });

  return (
    <Button
      variant="outline"
      size="sm"
      className="group/heart-action flex-1 gap-2 bg-transparent hover:bg-destructive/5"
      onClick={() =>
        toggleFavoriteProfile({
          profile_short_name: page.short_name,
          value: !page.favorite_status,
        })
      }
      title="Toggle favorite"
      disabled={isLoading}
    >
      <Heart
        size={14}
        className={`transition-all duration-200 ${
          page.favorite_status
            ? "fill-destructive stroke-destructive group-hover/heart-action:fill-none"
            : "stroke-muted-red-500 group-hover/heart-action:scale-125 group-hover/heart-action:fill-red-500 group-hover/heart-action:stroke-red-500"
        }`}
      />
      <span
        className={cn(
          "hidden text-sm group-hover/heart-action:text-red-500 xs:inline",
          {
            "text-red-500": page.favorite_status,
          }
        )}
      >
        Yêu thích
      </span>
    </Button>
  );
};
export default PagesInfo;
