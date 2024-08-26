import LandingSection from "../../../features/Home/LandingPage/LandingSection";
import SectionWithTitle from "../../../features/Home/LandingPage/SectionWithTitle";
import { useGamesBeforeDays } from "../../../hooks/Games/useGamesBeforeDays";
import usePlatformGames from "../../../hooks/Games/usePlatformGames";
import { OrderingDesc } from "../../../types/types";

const LandingPage = () => {
  const { trendingGames } = useGamesBeforeDays({
    beforeNumDays: 7,
    page: 1,
    page_size: 10,
    ordering: OrderingDesc.added,
  });

  const trendingResults = trendingGames?.results || [];

  const images = trendingResults?.map((game) => game.background_image) || [];

  const { data: ps5 } = usePlatformGames({
    page: 1,
    page_size: 10,
    platforms: 187,
    ordering: OrderingDesc.rating,
  });

  const { data: pc } = usePlatformGames({
    page: 1,
    page_size: 10,
    platforms: 4,
    ordering: OrderingDesc.rating,
  });

  const { data: xbox } = usePlatformGames({
    page: 1,
    page_size: 10,
    platforms: 1,
    ordering: OrderingDesc.rating,
  });

  return (
    <>
      <LandingSection images={images} interval={2000}>
        <SectionWithTitle title={""} list={trendingResults} />
      </LandingSection>
      <SectionWithTitle
        titleImg={"/pc.svg"}
        title={"PC"}
        list={pc?.results || []}
      />
      <SectionWithTitle
        titleImg={"/ps.svg"}
        title={"PlayStation 5"}
        list={ps5?.results || []}
      />
      <SectionWithTitle
        titleImg={"/xbox.svg"}
        title={"Xbox One"}
        list={xbox?.results || []}
      />
    </>
  );
};

export default LandingPage;
