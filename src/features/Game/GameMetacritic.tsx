import { Link } from "react-router-dom";
import { Metacritic } from "../../types/types";

const GameMetacritic = ({ metacritics }: { metacritics: Metacritic[] }) => {
  if (metacritics.length <= 0) return;
  return (
    <div className="grid gap-1">
      <span className="text-white/50">Metacritic</span>
      <div className="md:text-xl flex flex-wrap gap-2 sm:gap-3 md:gap-5">
        {metacritics?.map((metacritic) => (
          <Link
            to={metacritic.url}
            target="_blank"
            key={metacritic.platform.name}
            className="bg-third hover:bg-white/50 hover:text-black px-4 py-2 rounded-lg cursor-pointer flex gap-5 items-center"
          >
            <div className="flex items-center gap-2">
              <span
                className="w-7"
                dangerouslySetInnerHTML={{
                  __html: metacritic.logo || "",
                }}
              ></span>
              <span>{metacritic.platform.name}</span>
            </div>
            <span className="bg-white text-primary w-8 aspect-square text-lg rounded-full grid place-items-center">
              {metacritic.metascore}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default GameMetacritic;
