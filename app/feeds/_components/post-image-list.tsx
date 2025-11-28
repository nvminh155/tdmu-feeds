"use client";

import Image from "next/image";
import NewsService from "@/services/news.service";
import { useQuery } from "@tanstack/react-query";

import { TPost } from "@/types/post";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const PostImageList = ({ item }: { item: TPost }) => {
  const {
    data: images,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["images", item.uuid],
    queryFn: async () => {
      return await NewsService.getPostImages(item.uuid);
    },
    enabled: !!item.uuid,
    retry: 1,
  });
  // Show loading state
  if (isLoading) {
    return (
      <div className="overflow-x-auto p-5">
        <div className="flex items-center justify-center p-4">
          <div className="text-sm text-muted-foreground">
            Đang tải hình ảnh...
          </div>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return null;
  }

  return (
    <div>
      <h3 className="text-lg mb-2 font-medium text-muted-foreground">
        Hình ảnh liên quan
      </h3>
      <div className="flex w-full gap-2 overflow-x-auto"></div>

      <Carousel className="w-full relative">
        <CarouselContent>
          {images &&
            images.length > 0 &&
            images.map((imageUrl, index) => (
              <CarouselItem
                key={`image-${index + 1}`}
                className="flex justify-center items-center w-full h-full"
              >
                <Image
                  src={imageUrl}
                  alt={`Post content ${index + 1}`}
                  className="aspect-auto rounded-lg object-cover w-full h-full"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                  width={400}
                  height={400}
                />
              </CarouselItem>
            ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2" />
        <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2" />
      </Carousel>
    </div>
  );
};

export default PostImageList;
