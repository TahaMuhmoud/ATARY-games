import { Outlet } from "react-router-dom";
import { useContext } from "react";
import { VideoLayoutContext } from "./context/VideoLayoutContext";
import { SearchOverlayContext } from "./context/SearchOverlayContext";
import Navbar from "./features/Home/Navbar";
import VideoOverlay from "./overlays/VideoOverlay";
import SearchOverlay from "./overlays/SearchOverlay";
import Menu from "./features/Home/Menu";
import Footer from "./features/Home/Footer";
import { OrderingDesc } from "./types/types";
import usePlatformGames from "./hooks/Games/usePlatformGames";
import { useGamesBeforeDays } from "./hooks/Games/useGamesBeforeDays";
import LoadingPage from "./pages/LoadingPage/LoadingPage";

function AppLayout() {
  const [video] = useContext(VideoLayoutContext);
  const [isSearchOverlay] = useContext(SearchOverlayContext);
  const { isLoadingGames } = useGamesBeforeDays({
    beforeNumDays: 7,
    page: 1,
    page_size: 10,
    ordering: OrderingDesc.added,
  });

  const { isLoading: isLoadingPs5 } = usePlatformGames({
    page: 1,
    page_size: 10,
    platforms: 187,
    ordering: OrderingDesc.rating,
  });

  const { isLoading: isLoadingPc } = usePlatformGames({
    page: 1,
    page_size: 10,
    platforms: 4,
    ordering: OrderingDesc.rating,
  });

  const { isLoading: isLoadingXBox } = usePlatformGames({
    page: 1,
    page_size: 10,
    platforms: 1,
    ordering: OrderingDesc.rating,
  });

  if (isLoadingGames || isLoadingPs5 || isLoadingPc || isLoadingXBox)
    return <LoadingPage />;

  return (
    <div className="w-full flex flex-col gap-5">
      <Navbar />
      <div className="flex-1 w-full px-2 sm:px-5 lg:px-10">
        <Outlet />
      </div>
      <Footer />
      <Menu />
      {video.isShow && (
        <VideoOverlay
          data_video={video.videoData}
          src={video.videoData.src}
          autoPlay
          controls
        />
      )}
      {isSearchOverlay.isShow && (
        <SearchOverlay searchText={isSearchOverlay.searchText} />
      )}
    </div>
  );
}
export default AppLayout;
