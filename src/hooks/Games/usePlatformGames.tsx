import { useQuery, useQueryClient } from "react-query";
import { GetGamesParams } from "../../types/types";
import { getGames } from "../../services/apiGames";

function usePlatformGames(params?: GetGamesParams) {
  const qClient = useQueryClient();
  const { data, isLoading } = useQuery(
    [
      `platform-games-${params?.platforms}`,
      params?.page,
      params?.platforms,
      params?.ordering,
    ],
    () => getGames(params),
    {
      refetchOnWindowFocus: false,
      onSuccess: () => {
        qClient.prefetchQuery(
          [
            `platform-games-${params?.platforms}`,
            params!.page! + 1,
            params?.platforms,
            params?.ordering,
          ],
          () => getGames(params)
        );
      },
    }
  );
  return { data, isLoading };
}

export default usePlatformGames;
