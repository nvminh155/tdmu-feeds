"use client";

import NewsService from "@/services/news.service";
import { useFeedsFilterStore } from "@/stores/news/feeds-filter.store";
import { useQuery } from "@tanstack/react-query";

import { TPostType } from "@/types/post";
import { Checkbox } from "@/components/ui/checkbox";

import { Label } from "@/components/ui/label";

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
    staleTime: 1000 * 60 * 50,
    retry: 2,
    cacheTime: 1000 * 60 * 60 * 1,
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
            {category.name.replaceAll(';#', ', ')}
          </Label>
        </div>
      ))}
    </div>
  );
};

export default TagList;
