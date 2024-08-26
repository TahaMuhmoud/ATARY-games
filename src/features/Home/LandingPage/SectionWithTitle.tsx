import Title from "../../../components/Title";
import { Game } from "../../../types/types";
import GamesScrolledSection from "./GamesScrolledSection";

interface SectionWithTitleProps {
  title?: string;
  titleImg?: string;
  list: Game[];
}
function SectionWithTitle({ titleImg, title, list }: SectionWithTitleProps) {
  return (
    <div className="w-full h-[320px] grid gap-5 overflow-y-hidden">
      <h2 className="text-4xl font-black flex items-center gap-3">
        {titleImg && (
          <img src={titleImg} alt="" className="w-12 bg-third p-2 rounded-lg" />
        )}
        <Title title={title!} />
      </h2>

      <GamesScrolledSection games={list} />
    </div>
  );
}

export default SectionWithTitle;
