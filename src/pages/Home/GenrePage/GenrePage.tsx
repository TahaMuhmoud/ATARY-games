import { useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import useGenreGames from "../../../hooks/Games/useGenreGames";
import useGenreData from "../../../hooks/Genre/useGenreData";
import FullPageLoader from "../../../components/FullPageLoader";
import LandingSection from "../../../features/Home/LandingPage/LandingSection";
import Title from "../../../components/Title";
import { GameCard } from "../../../features/Home/LandingPage/GameCard";
import Pagination from "../../../components/Pagination";
import DropDownText from "../../../components/DropDownText";
import { SORT_ARRAY } from "../../../utils/constants";
import SortSelect from "../../../components/SortSelect";
import { convertStringToOrdering } from "../../../utils/helpers";
import LoadingPage from "../../LoadingPage/LoadingPage";

const GenrePage = () => {
  const { name } = useParams();

  const id = name?.split("-")[1] || "";

  const [page, setPage] = useState<number>(1);

  const [URLSearchParams] = useSearchParams();

  const { data, isLoadingGenreGames } = useGenreGames({
    page: page,
    page_size: 12,
    genres: Number(id),
    ordering: convertStringToOrdering(URLSearchParams.get("sort")),
  });
  const genreGames = data?.results;

  const { genre, isLoadingGenre } = useGenreData(Number(id));

  if (isLoadingGenre) return <LoadingPage />;
  return (
    <div className="grid gap-10">
      {genre && (
        <>
          <LandingSection images={[genre["image_background"]]} interval={2000}>
            <div className="w-full h-full absolute top-0 left-0 bg-primary/30 flex flex-col justify-center items-center">
              <h1 className="text-5xl sm:text-7xl md:text-8xl font-black break-words text-center">
                {genre.name}
              </h1>

              <h6 className="text-2xl">Games Count: {genre.games_count}</h6>
            </div>
          </LandingSection>
          <DropDownText title="Details" text={genre.description} />
        </>
      )}

      <div className="flex flex-col gap-5">
        <div className="flex justify-between">
          <Title title={`${genre?.name} Games`} />
          <SortSelect options={SORT_ARRAY} />
        </div>
        {!isLoadingGenreGames ? (
          <div
            className={`flex-1 grid sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-5 sm:gap-5`}
          >
            {genreGames?.map((game) => (
              <GameCard
                key={game.id}
                game={game}
                size={{ width: "100%", height: "250px" }}
              />
            ))}
          </div>
        ) : (
          <div className="h-screen w-full">
            <FullPageLoader />
          </div>
        )}
        {data && <Pagination data={data!} changePage={setPage} />}
      </div>
    </div>
  );
};

export default GenrePage;
