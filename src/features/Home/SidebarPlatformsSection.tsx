import { useNavigate } from "react-router-dom";
import { usePlatforms } from "../../hooks/Platforms/usePlatforms";
import SidebarSection from "./SidebarSection";
import { useContext } from "react";
import { MenuBarContext } from "../../context/MenuBarContext";
import { convertTextToLinkText } from "../../utils/helpers";
import { OrderingDesc } from "../../types/types";

const SidebarPlatformsSection = () => {
  const { platforms } = usePlatforms({
    page: 1,
    page_size: 5,
    ordering: OrderingDesc.id,
  });

  const navigate = useNavigate();
  const [, setIsShowMenuBar] = useContext(MenuBarContext);
  const titleOnClick = () => {
    navigate(`/platforms`);
    setIsShowMenuBar(false);
  };
  const elementOnClick: (params: { id: number; name: string }) => void = ({
    id,
    name,
  }) => {
    navigate(`/platform/${convertTextToLinkText(name)}-${id}`);
    setIsShowMenuBar(false);
  };
  if (!platforms) return;
  return (
    <SidebarSection
      title="Platforms"
      list={platforms.results}
      titleOnClick={titleOnClick}
      elementOnClick={elementOnClick}
    />
  );
};

export default SidebarPlatformsSection;
