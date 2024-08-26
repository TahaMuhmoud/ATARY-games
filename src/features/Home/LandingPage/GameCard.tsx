import { useNavigate } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "../../../components/Image";
import TiltComponent from "../../../components/TiltComponent";
import { Game, Size } from "../../../types/types";
import { removeDuplicateElements } from "../../../utils/helpers";

interface GameCard {
  size?: Size;
  game: Game;
}

export const GameCard = ({
  size = { width: "280px", height: "220px" },
  game,
}: GameCard) => {
  const { id, name, background_image, platforms } = game;

  const platformsLogos = removeDuplicateElements(
    platforms.map((platform) => platform.platform.logo)
  ).filter((logo) => logo);

  const navigate = useNavigate();

  function handleOnClick() {
    navigate(`/game/${name.split(" ").join("_")}-${id}`);
  }

  gsap.registerPlugin(useGSAP);

  useGSAP(() => {
    gsap.fromTo(".game", { x: -300 }, { x: 0, duration: 1 });
  });

  return (
    <TiltComponent>
      <div
        className={`game rounded-2xl flex items-end relative overflow-hidden hover:opacity-100 opacity-90 shadow-xl shadow-black group `}
        style={{
          minWidth: size.width,
          minHeight: size.height,
          maxWidth: size.width,
          maxHeight: size.height,
          aspectRatio: size.square ? "1/1" : "auto",
        }}
      >
        <div className="w-full h-full absolute">
          <Image src={background_image} alt={name} />
        </div>
        <h4 className="w-full text-2xl font-bold text-center p-5 flex items-center justify-center z-30">
          {name}
        </h4>
        {platforms.length > 0 && (
          <div className="z-[40] w-full flex items-center justify-center gap-2 absolute top-0 left-0 p-3 bg-primary/50">
            {platformsLogos.map((logo, index) => (
              <div
                key={index}
                dangerouslySetInnerHTML={{
                  __html: logo,
                }}
                className="w-5 aspect-square"
              />
            ))}
          </div>
        )}
        <div className="bg-gradient-to-b from-black/0  to-black absolute w-full h-1/2 bottom-0 left-0 z-20"></div>
        <div className="bg-gradient-to-b from-black/0  to-black absolute w-full h-1/2 bottom-0 left-0 z-10 "></div>
        <div
          className="absolute w-full h-full z-50 group-hover:bg-black/40 cursor-pointer"
          onClick={handleOnClick}
        ></div>
      </div>
    </TiltComponent>
  );
};
