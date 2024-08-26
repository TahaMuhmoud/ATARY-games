import { useNavigate, useParams } from "react-router-dom";
import { useGame } from "../../hooks/Game/useGame";
import ChangedImage from "../../components/ChangedImage";
import FullPageLoader from "../../components/FullPageLoader";
import GameDetails from "../../features/Game/GameDetails";
import GameScreenshots from "../../features/Game/GameScreenshots";
import GameTrailers from "../../features/Game/GameTrailers";
import GameDescription from "../../features/Game/GameDescription";
import GameStores from "../../features/Game/GameStores";
import GamePlatforms from "../../features/Game/GamePlatforms";
import GameMetacritic from "../../features/Game/GameMetacritic";
import FlexWithTitle from "../../components/FlexWithTitle";
import SameSeriesGames from "../../features/Game/SameSeriesGames";
import Image from "../../components/Image";

const GamePage = () => {
  const { name } = useParams();
  const id = name?.split("-")[1] || "";

  const navigate = useNavigate();

  const { game, isLoadingGame } = useGame(Number(id));

  return (
    <div
      className={`w-full min-h-screen h-full md:bg-top bg-cover rounded-t-[40px] relative overflow-hidden`}
    >
      {!isLoadingGame && game ? (
        <>
          <div className="absolute w-full h-screen -z-10">
            <ChangedImage
              images={[game.background_image, game.background_image_additional]}
              interval={4000}
            />
          </div>
          <div className="w-full h-full overflow- bg-gradient-to-b from-black/0 via-primary/80 to-primary/100 p-3 md:px-5 pt-20 flex flex-col items-center gap-10">
            <div className="grid xl:grid-cols-2 gap-10 items-center">
              <GameDetails game={game} />
              <GameScreenshots gameId={id} />
            </div>
            <GameTrailers gameId={id} />
            <GameDescription description={game.description} />
            <div className="w-full grid xl:grid-cols-2 items-start gap-10 bg-primary/20 p-2 sm:p-5 md:p-10">
              <div className="col-span-1 grid gap-10">
                <GameStores stores={game.stores} />
                <GamePlatforms gamePlatforms={game.platforms} />
                <GameMetacritic metacritics={game.metacritic_platforms} />
              </div>
              <div className="col-span-1 overflow-hidden">
                <div className="grid xl:grid-cols-2 gap-3 sm:gap-5 items-start">
                  <div className="col-span-1 grid gap-3 sm:gap-5">
                    <FlexWithTitle title="Publishers" list={game.publishers} />
                    <FlexWithTitle title="Developers" list={game.developers} />
                    <div className="col-span-1 grid gap-1">
                      <span className="text-white/50 grid">Genres</span>
                      <div className="flex flex-wrap gap-1">
                        {game.genres.map((genre) => (
                          <div
                            key={genre.id}
                            className="bg-third hover:bg-white/50 hover:text-black px-4 py-2 rounded-lg cursor-pointer flex gap-1 items-center"
                            onClick={() =>
                              navigate(`/genre/${genre.name}-${genre.id}`, {
                                state: genre.id,
                              })
                            }
                          >
                            <div className="h-10 aspect-square rounded-full overflow-hidden">
                              <Image
                                src={genre.image_background}
                                className=""
                              />
                            </div>
                            <span>{genre.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="col-span-1">
                    <FlexWithTitle title="Tags" list={game.tags} />
                  </div>
                  <div className="lg:col-span-2">
                    <SameSeriesGames gameId={id} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="w-full h-screen">
          <FullPageLoader />
        </div>
      )}
    </div>
  );
};

export default GamePage;
