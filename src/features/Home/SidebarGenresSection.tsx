import { useNavigate } from "react-router-dom";
import useGenres from "../../hooks/Genres/useGenres";
import SidebarSection from "./SidebarSection";
import { useContext } from "react";
import { MenuBarContext } from "../../context/MenuBarContext";
import { convertTextToLinkText } from "../../utils/helpers";

const SidebarGenresSection = () => {
  const { data } = useGenres({
    page: 1,
    page_size: 5,
  });

  const navigate = useNavigate();

  const [, setIsShowMenuBar] = useContext(MenuBarContext);

  const titleOnClick = () => {
    navigate(`/genres`);
    setIsShowMenuBar(false);
  };

  const elementOnClick: (params: { id: number; name: string }) => void = ({
    id,
    name,
  }) => {
    navigate(`/genre/${convertTextToLinkText(name)}-${id}`);
    setIsShowMenuBar(false);
  };
  if (!data) return;
  return (
    <SidebarSection
      title="Genres"
      list={data.results}
      titleOnClick={titleOnClick}
      elementOnClick={elementOnClick}
    />
  );
};

export default SidebarGenresSection;
