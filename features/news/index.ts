import { useQuery } from "@tanstack/react-query";

import newsQueries from "./news.queries";

export const useFavoriteProfilesQuery = (userId?: string) =>
  useQuery({ ...newsQueries.favoriteProfiles(userId), staleTime: 5 * 60 * 1000 });
export const usePinnedQuery = () =>
  useQuery({ ...newsQueries.pinned(), staleTime: 5 * 60 * 1000 });
