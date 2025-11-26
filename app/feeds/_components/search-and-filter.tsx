"use client";

import { useState } from "react";
import { useFeedsFilterStore } from "@/stores/news/feeds-filter.store";
import { Search } from "lucide-react";

import { useDebounceCallback } from "@/hooks/useDebounceCallback";
import { Input } from "@/components/ui/input";

import NewsSettings from "./news-settings";

export function SearchAndFilter() {
  const { setSearchQuery } = useFeedsFilterStore();
  const [search, setSearch] = useState("");
  const handleSearch = useDebounceCallback((search: string) => {
    setSearchQuery(search);
  }, 500);

  return (
    <div className="flex w-full flex-wrap gap-4">
      <div className="flex w-full items-center gap-2 max-sm:flex-col">
        <NewsSettings />

        {/* Search Bar */}
        <div className="relative w-full flex-1 max-md:max-w-full">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Tìm kiếm thông tin..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              handleSearch(e.target.value);
            }}
            maxLength={50}
            className="!max-md:w-full pl-10"
          />
        </div>
      </div>

      {/* Filter Controls */}
      <div className="flex flex-wrap items-center gap-3 max-md:w-full">
    
      </div>
    </div>
  );
}
