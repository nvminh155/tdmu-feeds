"use client";

import Image from "next/image";
import { ROUTE_PATH } from "@/constants";
import { ExternalLink } from "lucide-react";
import { TPage } from "@/types/post";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import CopyLinkButton from "./copy-button";
import FavoriteProfileToggleButton from "./toggle-favorite-button";

const PageInfoCard = ({ page }: { page: TPage }) => {
  return (
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
  );
};

export default PageInfoCard;
