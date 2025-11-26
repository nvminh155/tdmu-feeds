"use client";

import NewsService from "@/services/news.service";
import { useFeedsFilterStore } from "@/stores/news/feeds-filter.store";
import { useQuery } from "@tanstack/react-query";
import { Settings } from "lucide-react";

import { TPostType } from "@/types/post";
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

const NewsSettings = () => {
  const {
    groupByDate,
    isShownFavoriteOnly,
    setGroupByDate,
    resetFilters,
    setIsShownFavoriteOnly,
  } = useFeedsFilterStore();

  const clearFilters = () => {
    resetFilters();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="items-center gap-2 max-sm:w-full">
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
          <SettingsSection
            title="Danh mục"
            description="Chọn danh mục bài viết"
          >
            <TagList />
          </SettingsSection>
          <Separator className="m" />

          <SettingsSection title="Khác" description="Cài đặt khác">
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
          </SettingsSection>
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

const TagList = () => {
  const { type, setType } = useFeedsFilterStore();

  const all = {
    id: "all",
    value: "all",
    name: "tất cả",
  };
  const { data: tags } = useQuery({
    queryKey: ["tags"],
    queryFn: () => NewsService.getTagsNews(),
    staleTime: 1000 * 60 * 60 * 24,
  });

  const handleCategoryChange = (categoryValue: string, checked: boolean) => {
    categoryValue = categoryValue.toLowerCase();
    if (checked) {
      setType([...type.split(","), categoryValue].join(",") as TPostType);
    } else {
      setType(
        type
          .split(",")
          .filter((cat) => cat !== categoryValue)
          .join(",")
      );
    }
  };

  return (
    <div className="grid grid-cols-2 gap-2">
      {[all, ...(tags || [])].map((category) => (
        <div key={category.name} className="flex items-center space-x-2">
          <Checkbox
            id={"ck-category-" + category.id}
            checked={type.split(",").includes(category.name)}
            onCheckedChange={(checked) =>
              handleCategoryChange(category.name, checked as boolean)
            }
          />
          <Label
            htmlFor={"ck-category-" + category.id}
            className="cursor-pointer text-sm font-normal"
          >
            {category.name}
          </Label>
        </div>
      ))}
    </div>
  );
};
interface SettingsSectionProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

const SettingsSection = ({
  title,
  description,
  children,
}: SettingsSectionProps) => {
  return (
    <div>
      <div className="mb-4 flex flex-col">
        <Label className="text-lg font-semibold">{title}</Label>
        <Label className="text-xs font-normal text-muted-foreground">
          {description}
        </Label>
      </div>
      {children}
    </div>
  );
};
export default NewsSettings;
