"use client";

import NewsService from "@/services/news.service";
import { useFeedsFilterStore } from "@/stores/news/feeds-filter.store";
import { useQueryClient } from "@tanstack/react-query";
import { Settings } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import TagList from "./tag-list";
import SettingSection from "./setting-section";

const NewsSettings = () => {
  const {
    groupByDate,
    isShownFavoriteOnly,
    setGroupByDate,
    resetFilters,
    setIsShownFavoriteOnly,
  } = useFeedsFilterStore();

  const queryClient = useQueryClient();

  const clearFilters = () => {
    resetFilters();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="items-center gap-2 max-sm:w-full"
          onMouseEnter={() =>
            queryClient.prefetchQuery({
              queryKey: ["tags"],
              queryFn: () => NewsService.getTagsNews(),
              staleTime: 1000 * 60 * 50,
              retry: 2,
              cacheTime: 1000 * 60 * 60 * 1,
            })
          }
        >
          <Settings className="h-4 w-4" />
          Cài đặt
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Cài đặt Feeds</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Category Section */}
          <SettingSection title="Danh mục" description="Chọn danh mục bài viết">
            <TagList />
          </SettingSection>
          <Separator className="m" />

          <SettingSection title="Khác" description="Cài đặt khác">
            {/* Group by Date Section */}
            <div className="mb-2 flex items-center space-x-2">
              <Checkbox
                id="group-by-date"
                checked={groupByDate}
                onCheckedChange={(checked) =>
                  setGroupByDate(checked as boolean)
                }
              />
              <Label
                htmlFor="group-by-date"
                className="cursor-pointer text-sm font-normal"
              >
                Nhóm theo ngày
              </Label>
            </div>
            {/* Favorite Only Section */}
            <div className="flex items-center space-x-2">
              <Checkbox
                id="favorite-only"
                checked={isShownFavoriteOnly}
                onCheckedChange={(checked) =>
                  setIsShownFavoriteOnly(checked as boolean)
                }
              />
              <Label
                htmlFor="favorite-only"
                className="cursor-pointer text-sm font-normal"
              >
                Chỉ hiển thị bài viết đã được thích
              </Label>
            </div>
          </SettingSection>
          <Separator className="my-2" />

          {/* Reset Filters Section */}
          <div className="flex w-full">
            <Button
              onClick={clearFilters}
              variant="destructive"
              className="ml-auto"
            >
              Đặt lại
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NewsSettings;
