import { useQuery, useQueryClient } from "react-query";
import { GetPlatformsParams } from "../../types/types";
import { getPlatforms } from "../../services/apiPlatforms.ts";

export function usePlatforms(params: GetPlatformsParams) {
  const qClient = useQueryClient();
  const { data: platforms, isLoading: isLoadingPlatforms } = useQuery(
    ["platforms", params.page],
    () => getPlatforms(params),
    {
      refetchOnWindowFocus: false,
      onSuccess: () => {
        qClient.prefetchQuery(["platforms", params.page! + 1], () =>
          getPlatforms(params)
        );
      },
    }
  );
  return { platforms, isLoadingPlatforms };
}
