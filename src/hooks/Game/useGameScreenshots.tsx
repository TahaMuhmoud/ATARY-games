import { useQuery, useQueryClient } from "react-query";
import {
  getGameScreenShots,
  GetGameScreenShotsParams,
} from "../../services/apiGame";

export function useGameScreenshots(params: GetGameScreenShotsParams) {
  const qClient = useQueryClient();
  const { data: gameScreenshots, isLoading: isLoadingScreenshots } = useQuery(
    ["screenshots", params.id, params.page],
    () => getGameScreenShots(params),
    {
      refetchOnWindowFocus: false,
      onSuccess: () => {
        qClient.prefetchQuery(
          ["screenshots", params.id, params!.page! + 1],
          () => getGameScreenShots(params)
        );
      },
    }
  );
  return { gameScreenshots, isLoadingScreenshots };
}
