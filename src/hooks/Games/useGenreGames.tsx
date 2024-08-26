import { useQueryClient, useQuery } from "react-query";
import { GetGamesParams } from "../../types/types";
import { getGames } from "../../services/apiGames";

function useGenreGames(params?: GetGamesParams) {
  const qClient = useQueryClient();
  const { data, isLoading: isLoadingGenreGames } = useQuery(
    ["genre-games", params?.page, params?.genres, params?.ordering],
    () => getGames(params),
    {
      refetchOnWindowFocus: false,

      onSuccess: () => {
        qClient.prefetchQuery(
          ["genre-games", params!.page! + 1, params?.genres, params?.ordering],
          () => getGames(params)
        );
      },
    }
  );
  return { data, isLoadingGenreGames };
}

export default useGenreGames;
