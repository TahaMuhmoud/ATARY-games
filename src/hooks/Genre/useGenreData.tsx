import { useQuery } from "react-query";
import { getGenreData } from "../../services/apiGeners";

function useGenreData(id: number) {
  const { data: genre, isLoading: isLoadingGenre } = useQuery(
    [`genre-${id}`, id],
    () => getGenreData(id),
    {
      refetchOnWindowFocus: false,
    }
  );
  return { genre, isLoadingGenre };
}

export default useGenreData;
