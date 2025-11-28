"use client";

import { usePinnedQuery } from "@/features/news";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import FeedCard from "../_components/feed-card";
import { FeedTabs } from "../_components/feed-tabs";
import { SearchAndFilter } from "../_components/search-and-filter";

const HomeTabs = () => {
  return (
    <Tabs defaultValue={"all"}>
    <div className="w-full bg-white  sticky top-(--header-height) border-b border-border z-20 px-6">
      <div className="max-w-4xl mx-auto w-full flex flex-col items-start   ">
        <TabsList className="mb-4 w-full  justify-start flex  bg-inherit text-primary pb-0 p-0 ">
          <TabsTrigger
            value="all"
            className="border-t-0 shadow-none! max-w-fit border-l-0 border-r-0 data-[state=active]:text-primary data-[state=active]:border-b! rounded-none ring-0 data-[state=active]:border-primary"
          >
            Tin tức
          </TabsTrigger>
          <TabsTrigger
            value="pinned"
            className="border-t-0 max-w-fit shadow-none!  border-l-0 border-r-0 data-[state=active]:text-primary data-[state=active]:border-b! rounded-none ring-0 data-[state=active]:border-primary"
          >
            Được ghim
          </TabsTrigger>
        </TabsList>

        {/* Filter and Search Row */}
        <SearchAndFilter />
      </div>
    </div>

    <div className="w-full max-w-4xl mx-auto scroll-smooth">
      <TabsContent value="all">
        <FeedTabs />
      </TabsContent>
      <PinnedTab />
    </div>
  </Tabs>
  )
}



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
export default HomeTabs