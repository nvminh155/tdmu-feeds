"use client";

import { TabsContent } from "@/components/ui/tabs";
import { usePinnedQuery } from "@/features/news";
import FeedCard from "./feed-card";

const PinnedTab = () => {
  const { data, isLoading } = usePinnedQuery();
  return (
    <TabsContent value="pinned">
      <div className="space-y-4">
        {!isLoading && data?.length === 0 && (
          <div className="text-center text-sm text-muted-foreground">
            Không có tin tức nào được ghim
          </div>
        )}
        {data?.map((item) => (
          <FeedCard key={item.id} item={item} />
        ))}
      </div>
    </TabsContent>
  );
};

export default PinnedTab;
