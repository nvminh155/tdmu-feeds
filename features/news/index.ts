import { useQuery } from "@tanstack/react-query";

import newsQueries from "./news.queries";

export const useFavoriteProfilesQuery = (userId?: string) =>
  useQuery({
    ...newsQueries.favoriteProfiles(userId),
    staleTime: 5 * 60 * 1000,
    retry: 2,
  });
export const usePinnedQuery = () =>
  useQuery({ ...newsQueries.pinned(), staleTime: 30 * 60 * 1000, retry: 2 });
