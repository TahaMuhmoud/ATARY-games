import { useQuery } from "react-query";
import { getGameDetails } from "../../services/apiGame";

export function useGame(id: number) {
  const { data: game, isLoading: isLoadingGame } = useQuery(["game", id], () =>
    getGameDetails(id)
  );
  return { game, isLoadingGame };
}
