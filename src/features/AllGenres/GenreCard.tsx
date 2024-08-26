import { useNavigate } from "react-router-dom";

import CardWithBtnView from "../../components/CardWithBtnView";
import { Size } from "../../types/types";

interface GenreCardProps {
  size?: Size;
  id: number;
  name: string;
  image: string;
  gamesCount: number;
}

export const GenreCard = ({
  size = { width: "280px", height: "220px", square: false },
  id,
  name,
  image,
  gamesCount,
}: GenreCardProps) => {
  const navigate = useNavigate();

  function handleOnClick() {
    navigate(`/genre/${name}-${id}`);
  }
  return (
    <CardWithBtnView
      image={image}
      numberToShow={gamesCount}
      title={name}
      onClick={handleOnClick}
      size={size}
    />
  );
};
