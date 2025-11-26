import { useQuery } from "@tanstack/react-query";

import newsQueries from "./news.queries";

export const useFavoriteProfilesQuery = () =>
  useQuery({ ...newsQueries.favoriteProfiles(), staleTime: 5 * 60 * 1000 });
export const usePinnedQuery = () =>
  useQuery({ ...newsQueries.pinned(), staleTime: 5 * 60 * 1000 });
