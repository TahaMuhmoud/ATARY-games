import { useNavigate } from "react-router-dom";

import CardWithBtnView from "../../components/CardWithBtnView";
import { Platform, Size } from "../../types/types";

interface GenreCardProps {
  size?: Size;
  platform: Platform;
}

export const PlatformCard = ({
  size = { width: "280px", height: "220px", square: false },
  platform,
}: GenreCardProps) => {
  const navigate = useNavigate();

  function handleOnClick() {
    navigate(`/platform/${platform.name}- ${platform.id}`);
  }
  return (
    <CardWithBtnView
      logo={platform.logo}
      image={platform.image_background}
      numberToShow={platform.games_count}
      title={platform.name}
      onClick={handleOnClick}
      size={size}
    />
  );
};
