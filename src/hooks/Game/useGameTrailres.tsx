import { useQuery, useQueryClient } from "react-query";
import { getGameTrailers, GetGameTrailersParams } from "../../services/apiGame";

export function useGameTrailres(params: GetGameTrailersParams) {
  const qClient = useQueryClient();
  const { data: gameTrailers, isLoading: isLoadingTrailers } = useQuery(
    ["trailers", params.id, params.page],
    () => getGameTrailers(params),
    {
      refetchOnWindowFocus: false,
      onSuccess: () => {
        qClient.prefetchQuery(["trailers", params.id, params!.page! + 1], () =>
          getGameTrailers(params)
        );
      },
    }
  );
  return { gameTrailers, isLoadingTrailers };
}
