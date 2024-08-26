import { Link } from "react-router-dom";
import { FaReddit, FaStar } from "react-icons/fa6";
import { GoPersonAdd } from "react-icons/go";
import { SiMetacritic } from "react-icons/si";
import {
  removeDuplicateElements,
  startWithUpperCase,
} from "../../utils/helpers";
import Tag from "../../components/Tag";
import { AnyObject, Game } from "../../types/types";

function gameLinks(game: AnyObject) {
  return Object.entries(game)
    .filter(
      (el) =>
        (el[0] == "reddit_url" ||
          el[0] == "metacritic_url" ||
          el[0] == "website") &&
        el[1] !== ""
    )
    .map((link) => ({
      name: startWithUpperCase(link[0]),
      url: link[1],
      icon: link[0].includes("reddit_url") ? (
        <FaReddit />
      ) : link[0].includes("metacritic_url") ? (
        <SiMetacritic />
      ) : undefined,
    }));
}

const GameDetails = ({ game }: { game: Game }) => {
  const gamePlatformsLogos = removeDuplicateElements(
    game.platforms.map((platform) => platform.platform.logo || "")
  );

  return (
    <div className="col-span-1 grid gap-10">
      <div className="grid gap-2">
        <h1 className="text-6xl sm:text-7xl md:text-8xl font-black">
          {game.name}
        </h1>
        <div className="flex items-center gap-2 sm:gap-3 lg:gap-4">
          {gamePlatformsLogos?.map((logo?: string) => (
            <div
              key={logo}
              className="w-7 sm:w-10 lg:w-10 aspect-square"
              dangerouslySetInnerHTML={{ __html: logo! }}
            ></div>
          ))}
        </div>
      </div>
      <div className="flex flex-wrap gap-2 md:gap-5">
        <Tag dataKey="Playtimes" dataValue={game.playtime} />
        <Tag dataKey="Released at" dataValue={game.released} />
        <Tag dataKey="Updated at" dataValue={game.updated.split("T")[0]} />
        <Tag dataValue={game.added} icon={<GoPersonAdd size={24} />} />
        <Tag
          dataValue={game.rating}
          icon={<FaStar size={18} className="fill-yellow-300" />}
        />
      </div>
      <div className="grid gap-5">
        {gameLinks(game).map((link) => (
          <div
            key={link.name}
            className="border-b-[1px] border-third flex justify-between md:px-4"
          >
            <span className="text-white/60 flex gap-1">
              {link.icon}
              {link.name}
            </span>
            <span className="underline underline-offset-2 text-sm sm:text-lg">
              <Link to={link.url} className="cursor-pointer">
                {link.url.split("").slice(0, 22).join("") + "..."}
              </Link>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameDetails;
