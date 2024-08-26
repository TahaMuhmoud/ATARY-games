import { useParams, useSearchParams } from "react-router-dom";
import FullPageLoader from "../../../components/FullPageLoader";
import LandingSection from "../../../features/Home/LandingPage/LandingSection";
import usePlatfromData from "../../../hooks/Platform/usePlatfromData";
import { useState } from "react";
import usePlatformGames from "../../../hooks/Games/usePlatformGames";
import Title from "../../../components/Title";
import { GameCard } from "../../../features/Home/LandingPage/GameCard";
import Pagination from "../../../components/Pagination";
import DropDownText from "../../../components/DropDownText";
import { SORT_ARRAY } from "../../../utils/constants";
import SortSelect from "../../../components/SortSelect";
import { convertStringToOrdering } from "../../../utils/helpers";
import LoadingPage from "../../LoadingPage/LoadingPage";

const PlatformPage = () => {
  const { name } = useParams();
  const id = name?.split("-")[1] || "";
  const { platform, isLoadingPlatform } = usePlatfromData(Number(id));

  const [URLSearchParams] = useSearchParams();

  const [page, setPage] = useState<number>(1);

  const { data, isLoading: isLoadingPlatformGames } = usePlatformGames({
    page: page,
    page_size: 12,
    platforms: Number(id),
    ordering: convertStringToOrdering(URLSearchParams.get("sort")),
  });

  const platformGames = data?.results || [];

  if (isLoadingPlatform) return <LoadingPage />;
  return (
    <div className="grid gap-10">
      {platform && (
        <>
          <LandingSection
            images={[platform["image_background"]]}
            interval={2000}
          >
            <div className="w-full h-full absolute top-0 left-0 bg-primary/30 flex flex-col justify-center items-center gap-5">
              <h1 className="text-5xl sm:text-7xl md:text-8xl font-black break-words text-center">
                {platform.name}
              </h1>
              <h6 className="text-2xl">Games Count: {platform.games_count}</h6>
            </div>
          </LandingSection>
          <DropDownText title="Details" text={platform.description} />
        </>
      )}

      <div className="flex flex-col gap-5">
        <div className="flex justify-between">
          <Title title={`${platform?.name} Games`} />
          <SortSelect options={SORT_ARRAY} />
        </div>
        {!isLoadingPlatformGames ? (
          <div
            className={`flex-1 grid sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-2 sm:gap-5`}
          >
            {platformGames?.map((game) => (
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

export default PlatformPage;
