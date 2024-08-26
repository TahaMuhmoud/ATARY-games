import { useNavigate } from "react-router-dom";
import {
  assignLogoToPlatform,
  removeDuplicateElements,
} from "../../utils/helpers";
import ImgPlaceholder from "../../components/ImgPlaceholder";
import { useContext } from "react";
import { SearchOverlayContext } from "../../context/SearchOverlayContext";

const SearchedGame = ({
  game,
}: {
  game: {
    id: number;
    name: string;
    background_image: string;
    platforms: { platform: { slug: string } }[];
  };
}) => {
  const navigate = useNavigate();

  const gamePlatforms = game?.platforms?.map(
    (p: { platform: { slug: string } }) => {
      const logo = assignLogoToPlatform(p.platform);
      return { ...p, logo: logo };
    }
  );

  const gamePlatformsLogos = removeDuplicateElements(
    gamePlatforms?.map((platform: { logo?: string }) => platform.logo!)
  );

  const [, setIsSearchOverlay] = useContext(SearchOverlayContext);
  function handleOnClick() {
    setIsSearchOverlay({ isShow: false, searchText: undefined });
    navigate(`/game/${game.name.split(" ").join("_")}-${game.id}`);
  }
  return (
    <div
      className="w-full overflow-hidden min-h-20 max-h-24 grid grid-cols-6 gap-5 items-center bg-secondary p-1 rounded-lg cursor-pointer hover:bg-third"
      onClick={handleOnClick}
    >
      <div className="col-span-2 h-20 rounded-lg overflow-hidden">
        {game.background_image ? (
          <img
            src={game.background_image}
            alt=""
            className="w-full h-full object-cover"
          />
        ) : (
          <ImgPlaceholder />
        )}
      </div>
      <div className="col-span-4">
        <div className="text-lg sm:text-xl font-black">
          {game.name.length > 30
            ? game.name.split("").slice(0, 30).join("") + "..."
            : game.name}
        </div>
        <div className="flex gap-1 items-center">
          {gamePlatformsLogos.map((logo) => (
            <div
              key={logo}
              className="w-4"
              dangerouslySetInnerHTML={{ __html: logo! }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchedGame;
