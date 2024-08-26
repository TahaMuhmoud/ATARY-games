import { useQuery } from "react-query";
import { GetGamesParams } from "../../types/types";
import { getGames } from "../../services/apiGames";

export function useGamesBeforeDays(params: GetGamesParams) {
  const { data: trendingGames, isLoading: isLoadingGames } = useQuery(
    [`trending-${params.beforeNumDays}`, params.beforeNumDays, params.page],
    () => getGames(params)
  );
  return { trendingGames, isLoadingGames };
}
