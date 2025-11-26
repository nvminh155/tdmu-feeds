// make store with zustand
import { create } from "zustand";

import { TPostType } from "@/types/post";

type TFilters = {
  searchQuery: string;
  dateRange: { from?: Date; to?: Date };
  starredOnly: boolean;
  groupByPage: boolean;
};

type TFeedsFilterStore = {
  searchQuery: string;
  dateRange: { from?: Date; to?: Date };
  starredOnly: boolean;
  groupByPage: boolean;
  groupByDate: boolean;
  type: string;
  isShownFavoriteOnly: boolean;
  lastId?: string;
  setIsShownFavoriteOnly: (isShownFavoriteOnly: boolean) => void;
  setSearchQuery: (searchQuery: string) => void;
  setDateRange: (dateRange: { from?: Date; to?: Date }) => void;
  setStarredOnly: (starredOnly: boolean) => void;
  setGroupByPage: (groupByPage: boolean) => void;
  setGroupByDate: (groupByDate: boolean) => void;
  setType: (type: string) => void;
  resetFilters: () => void;
};

export const useFeedsFilterStore = create<TFeedsFilterStore>((set, get) => ({
  searchQuery: "",
  dateRange: { from: undefined, to: undefined },
  starredOnly: false,
  groupByPage: false,
  groupByDate: true,
  type: "",
  isShownFavoriteOnly: false,
  lastId: undefined,
  setIsShownFavoriteOnly: (isShownFavoriteOnly: boolean) =>
    set({ isShownFavoriteOnly }),
  setType: (type: string) => set({ type }),
  setSearchQuery: (searchQuery: string) => set({ searchQuery }),
  setDateRange: (dateRange: { from?: Date; to?: Date }) => set({ dateRange }),
  setStarredOnly: (starredOnly: boolean) => set({ starredOnly }),
  setGroupByPage: (groupByPage: boolean) => set({ groupByPage }),
  setGroupByDate: (groupByDate: boolean) => set({ groupByDate }),
  resetFilters: () =>
    set({
      searchQuery: "",
      dateRange: { from: undefined, to: undefined },
      starredOnly: false,
      groupByPage: false,
      groupByDate: true,
      isShownFavoriteOnly: false,
      type: "",
    }),
}));
