import { Heart } from "lucide-react";
import React from "react";

const EmptyFavorite = () => {
  return (
    <div className="px-3 py-6 text-center">
      <div className="w-10 h-10 mx-auto mb-2 rounded-full bg-muted flex items-center justify-center">
        <Heart size={18} className="text-muted-foreground" />
      </div>
      <p className="text-xs text-muted-foreground">Chưa có mục yêu thích</p>
    </div>
  );
};

export default EmptyFavorite;
