import { useQuery, useQueryClient } from "react-query";
import { getGames } from "../../services/apiGames";
import { GetGamesParams } from "../../types/types";

function useSearchedGames(params: GetGamesParams) {
  const qClient = useQueryClient();
  const { search, page, page_size } = params;

  const { data, isLoading: isLoadingGames } = useQuery(
    ["searched-games", search, page, page_size],
    () => getGames(params),
    {
      refetchOnWindowFocus: false,
      onSuccess: () => {
        qClient.prefetchQuery(
          ["searched-games", search, page! + 1, page_size],
          () => getGames(params)
        );
      },
    }
  );
  return { data, isLoadingGames };
}

export default useSearchedGames;
