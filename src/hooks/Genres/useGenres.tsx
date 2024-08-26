import { useQuery, useQueryClient } from "react-query";
import { GetGenresParams } from "../../types/types";
import { getGeners } from "../../services/apiGeners";

const useGenres = (params?: GetGenresParams) => {
  const qClient = useQueryClient();
  const { data, isLoading, isError } = useQuery(
    ["genres", params?.page, params?.page_size],
    () => getGeners(params),
    {
      refetchOnWindowFocus: false,
      onSuccess: () => {
        qClient.prefetchQuery(
          ["genres", params!.page! + 1, params?.page_size],
          () => getGeners(params)
        );
      },
    }
  );

  return { data, isLoading, isError };
};

export default useGenres;
