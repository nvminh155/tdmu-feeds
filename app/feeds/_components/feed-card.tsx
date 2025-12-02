"use client";

import { Copy, ExternalLink, Flame, Globe, Pin } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import React from "react";
import { ROUTE_PATH } from "@/constants";
import { formatDate } from "date-fns";
import { vi } from "date-fns/locale";
import { toast } from "sonner";

import { TPost } from "@/types/post";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";

import { PostModal } from "./post-card";
import Link from "next/link";

const FeedCard = ({ item }: { item: TPost }) => {
  return (
    <Card
      className={cn(
        "mx-auto animate-[slideUp_0.4s_ease-out] border-border p-4 gap-2 transition-shadow hover:shadow-lg max-lg:max-w-full",
        {
          "border-primary/10 bg-gradient-to-br from-red-50/20 to-transparent shadow-primary/10":
            item.is_pinned,
        }
      )}
    >
      {item.is_pinned && (
        <Badge
          variant="default"
          className="mb-2 flex w-max items-center gap-1 bg-primary/10 text-primary"
        >
          <Pin className="h-3 w-3 fill-white" />
          Được ghim
        </Badge>
      )}
      <CardHeader className="px-0 py-0">
        {/* <CardTitle>Short title bài viết</CardTitle> */}
        <div className="flex flex-wrap items-center gap-2">
          {item.is_hot_news && (
            <Badge variant="destructive" className="flex items-center gap-1">
              <Flame className="h-3 w-3" />
              Hot
            </Badge>
          )}
        </div>

        <div className="flex w-full items-center gap-2 text-sm text-muted-foreground max-xs:flex-col max-xs">
          <Avatar className="h-12 w-12  max-xs:h-14! max-xs:w-14! max-sm:h-10 max-sm:w-10">
            <AvatarImage
              src={
                item.page_info?.avatar
                  ? `${ROUTE_PATH.SB_STORAGE.public}${item.page_info?.avatar}`
                  : "/placeholder.svg"
              }
              alt={item.page_info?.name}
              className="object-cover w-full h-full"
            />
            <AvatarFallback className="text-xs">
              {item.page_info?.name.charAt(0)}
            </AvatarFallback>
          </Avatar>

          <div className="flex flex-col gap-0.5">
            <h3 className="text-pretty text-base font-semibold text-primary max-sm:text-sm max-xs:text-center ">
              {item.page_info?.name}
            </h3>
            <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-300 max-sm:text-[10px] max-xs:text-xs! text-pretty max-xs:text-center">
              📅
              {formatDate(
                new Date(item.converted_time),
                "EEEE, dd 'Tháng' MM, yyyy 'lúc' HH:mm",
                {
                  locale: vi,
                }
              )}
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="mt-2 p-0">
        {item.title && (
          <h3 className="text-pretty text-lg font-semibold max-sm:text-base">
            {item.title}
          </h3>
        )}
        <div className="my-4 flex flex-wrap gap-2">
          {item.tags.map((tag) => (
            <Badge
              key={tag}
              variant="default"
              className="border-primary/10 bg-primary/5 capitalize text-primary hover:bg-primary/5"
            >
              {tag}
            </Badge>
          ))}
        </div>
        <p className="line-clamp-[10] max-h-[] overflow-x-hidden overflow-y-hidden text-sm leading-7 max-sm:text-sm">
          {item?.summarization || "Không có tóm tắt"}
        </p>
      </CardContent>
      <Separator className="my-4" />
      <CardFooter className="flex flex-col gap-3 p-0">
        <div className="flex w-full items-center justify-end gap-1 text-end text-xs text-muted-foreground!">
          <Globe size={12} className="text-" />
          <span className="text- text-xs font-medium">{item.source_from}</span>
        </div>

        <div className="flex w-full items-center gap-2">
          {item.url && (
            <Link
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block flex-1"
            >
              <Button
                size="sm"
                className="flex w-full items-center gap-1 text-sm outline-2 dark:border dark:text-primary-foreground max-sm:text-xs"
              >
                <ExternalLink className="mr-1 h-4 w-4 max-lg:h-4 max-lg:w-4" />
                Xem bài viết
              </Button>
            </Link>
          )}
          {item.content && <PostModal item={item} />}
          <CopyButton url={item.url} />
        </div>
      </CardFooter>
    </Card>
  );
};

const CopyButton = ({ url }: { url: string }) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(url);
    toast.info("Đã chép liên kết", {
      className: "max-md:bottom-[calc(var(--bottom-nav-height))]!",
    });
  };

  return (
    <Button
      size="sm"
      variant="secondary"
      className="gap-2 border border-border"
      onClick={handleCopy}
    >
      <Copy size={12} className="text-" />
      <span className="text-sm font-medium max-sm:hidden max-sm:text-xs">
        Sao chép
      </span>
    </Button>
  );
};

export default FeedCard;
