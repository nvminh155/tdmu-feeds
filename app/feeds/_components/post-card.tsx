
"use client";

import { Eye } from "lucide-react";

import { TPost } from "@/types/post";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";


import PostImageList from "./post-image-list";

const PostModal = ({ item }: { item: TPost }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          size="sm"
          variant="secondary"
          className="border-secondary/ border text-sm max-sm:text-xs"
        >
          <Eye className="mr-1 h-4 w-4 max-sm:h-3 max-sm:w-3" />
          <span className="text-sm font-medium max-sm:hidden max-sm:text-xs">
            Xem nội dung
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[80vh] max-w-[50vw] overflow-y-auto overflow-x-hidden max-sm:max-w-[95vw]">
        <DialogTitle></DialogTitle>
        <p
          dangerouslySetInnerHTML={{ __html: item.content }}
          className="content-font mb-4 overflow-x-hidden text-pretty feed-detail-content py-4"
        />
        <div>
          <PostImageList item={item} /> 
        </div>
      </DialogContent>
    </Dialog>
  );
};

export { PostModal, PostImageList };
