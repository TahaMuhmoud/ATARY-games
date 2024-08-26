import { useQuery, useQueryClient } from "react-query";
import {
  getGamesInSameSeries,
  GetGamesInSameSeries,
} from "../../services/apiGame";

export function useGamesInSameSeries(params: GetGamesInSameSeries) {
  const qClient = useQueryClient();
  const { data: sameSeriesGames, isLoading: isLoadingSameSeriesGames } =
    useQuery(
      ["games-same-series", params.id, params.page],
      () => getGamesInSameSeries(params),
      {
        refetchOnWindowFocus: false,
        onSuccess: () => {
          qClient.prefetchQuery(
            ["games-same-series", params.id, params!.page! + 1],
            () => getGamesInSameSeries(params)
          );
        },
      }
    );
  return { sameSeriesGames, isLoadingSameSeriesGames };
}
