import Title from "../../components/Title";
import ScreenShotsSwiper from "./ScreenShotsSwiper";

const GameScreenshots = ({ gameId }: { gameId: string }) => {
  return (
    <div className="col-span-1 w-full h-full flex flex-col gap-5">
      <Title title={`Screenshots`} />

      <ScreenShotsSwiper gameId={gameId} />
    </div>
  );

  return null;
};

export default GameScreenshots;
