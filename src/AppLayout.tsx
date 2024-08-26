import { Outlet } from "react-router-dom";
import { useContext } from "react";
import { VideoLayoutContext } from "./context/VideoLayoutContext";
import { SearchOverlayContext } from "./context/SearchOverlayContext";
import Navbar from "./features/Home/Navbar";
import VideoOverlay from "./overlays/VideoOverlay";
import SearchOverlay from "./overlays/SearchOverlay";
import Menu from "./features/Home/Menu";
import Footer from "./features/Home/Footer";

function AppLayout() {
  const [video] = useContext(VideoLayoutContext);
  const [isSearchOverlay] = useContext(SearchOverlayContext);

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
