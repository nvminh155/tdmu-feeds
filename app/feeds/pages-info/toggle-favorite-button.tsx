"use client";
import newsQueries from "@/features/news/news.queries";
import NewsService from "@/services/news.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Heart } from "lucide-react";
import { toast } from "sonner";

import { TPage } from "@/types/post";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useSession } from "@/contexts/session-provider";

const FavoriteProfileToggleButton = ({ page }: { page: TPage }) => {
  const queryClient = useQueryClient();
  const { user } = useSession();

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
      onClick={() => {
        if (!user) {
          toast.error("Đăng nhập để thêm vào yêu thích!");
          return;
        }


        toggleFavoriteProfile({
          profile_short_name: page.short_name,
          value: !page.favorite_status,
        });
      }}
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

export default FavoriteProfileToggleButton;
