"use client";

import { useState } from "react";
import { Copy } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { toast } from "sonner";

const CopyLinkButton = ({ url }: { url: string }) => {
  const [copied, setCopied] = useState(false);
  const isMobile = useIsMobile();

  const handleCopyLink = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast.info("Đã sao chép liên kết", {
      className: "max-md:bottom-[calc(var(--bottom-nav-height))]!",
    });
  };

  return (
    <Button
      variant="outline"
      size="sm"
      className="flex-1 gap-2 bg-transparent"
      onClick={handleCopyLink}
      title="Copy link to clipboard"
    >
      <Copy size={14} />
      <span className="hidden text-sm xs:inline">
        {copied ? "Copied!" : "Copy"}
      </span>
    </Button>
  );
};

export default CopyLinkButton;
