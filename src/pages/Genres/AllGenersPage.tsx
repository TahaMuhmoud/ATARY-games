import { useState } from "react";
import useGenres from "../../hooks/Genres/useGenres";
import FullPageLoader from "../../components/FullPageLoader";
import Title from "../../components/Title";
import Pagination from "../../components/Pagination";
import { GenreCard } from "../../features/AllGenres/GenreCard";

interface Genre {
  id: number;
  name: string;
  image_background: string;
  games_count: number;
}
function AllGenersPage() {
  const [page, setPage] = useState<number>(1);
  const { data, isLoading: isLoadingGenres } = useGenres({
    page,
    page_size: 20,
  });
  const allGenres = data?.results;

  if (isLoadingGenres || !data)
    return (
      <div className="w-full h-screen">
        <FullPageLoader />
      </div>
    );
  return (
    <div className="w-full h-full">
      <div className="grid gap-5">
        <Title title="Genres" />
        <div
          className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-2 sm:gap-5`}
        >
          {allGenres?.map((genre: Genre) => (
            <GenreCard
              key={genre.id}
              id={genre.id}
              name={genre.name}
              image={genre.image_background}
              gamesCount={genre.games_count}
              size={{ width: "100%", square: true }}
            />
          ))}
        </div>
        <Pagination data={data} changePage={setPage} />
      </div>
    </div>
  );
}

export default AllGenersPage;
