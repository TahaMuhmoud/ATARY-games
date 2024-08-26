import { useState } from "react";
import Title from "../../components/Title";
import Pagination from "../../components/Pagination";
import FullPageLoader from "../../components/FullPageLoader";
import { useGamesInSameSeries } from "../../hooks/Game/useGamesInSameSeries";
import { GameCard } from "../Home/LandingPage/GameCard";
import RoundedCard from "../../components/RoundedCard";

const SameSeriesGames = ({ gameId }: { gameId: string }) => {
  const [page, setPage] = useState<number>(1);
  const { sameSeriesGames, isLoadingSameSeriesGames } = useGamesInSameSeries({
    id: Number(gameId),
    page,
    page_size: 4,
  });

  if (!sameSeriesGames?.results || sameSeriesGames?.results?.length <= 0)
    return;
  return (
    <div className="p-2 md:p-5 lg:p-10">
      <div className="flex flex-col gap-5">
        <Title title={"Same Series Games"} />
        <div className="min-h-[400px] grid place-items-center">
          {!isLoadingSameSeriesGames ? (
            <div className={`flex-1 grid sm:grid-cols-2 gap-5`}>
              {sameSeriesGames?.results?.map((game, indx: number) => (
                <RoundedCard key={game.id} index={indx}>
                  <GameCard
                    game={game}
                    size={{ width: "100%", square: true }}
                  />
                </RoundedCard>
              ))}
            </div>
          ) : (
            <FullPageLoader />
          )}
        </div>
        <Pagination data={sameSeriesGames} changePage={setPage} />
      </div>
    </div>
  );
};

export default SameSeriesGames;
