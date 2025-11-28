"use client";

import { useState } from "react";
import { Copy } from "lucide-react";

import { Button } from "@/components/ui/button";

const CopyLinkButton = ({ url }: { url: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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