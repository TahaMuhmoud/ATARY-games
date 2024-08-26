import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import TiltComponent from "./TiltComponent";

import Image from "./Image";
import { Size } from "../types/types";
interface CardProps {
  size?: Size;
  title: string;
  image: string;
  logo?: string;
  onClick: () => void;
  numberToShow: number;
}
const CardWithBtnView = ({
  size = { width: "280px", height: "220px", square: false },
  title,
  image,
  numberToShow,
  onClick,
  logo,
}: CardProps) => {
  return (
    <TiltComponent>
      <div
        className={`rounded-2xl flex items-center justify-center relative overflow-hidden opacity-90 shadow-xl shadow-black cursor-pointer group`}
        style={{
          minWidth: size.width,
          minHeight: size.height,
          maxWidth: size.width,
          maxHeight: size.height,
          aspectRatio: size.square ? "1/1" : "auto",
        }}
      >
        <div className="w-full h-full absolute">
          <Image src={image} alt={title} />
        </div>
        <div className="z-30 bg-black/30 group-hover:bg-black/60 w-full h-full flex flex-col items-center justify-center gap-5">
          {logo && (
            <div
              dangerouslySetInnerHTML={{ __html: logo }}
              className="w-10 "
            ></div>
          )}
          <h4 className="text-2xl lg:text-3xl xl:text-4xl font-black text-center">
            {title}
          </h4>
          <h5 className="md:text-xl">{numberToShow} games</h5>
          <button
            type="button"
            className="bg-white/20 hover:bg-white/50 p-1 px-4 hidden group-hover:flex items-center gap-2"
            onClick={onClick}
            title="View"
          >
            <span>View</span>
            <FaArrowUpRightFromSquare />
          </button>
        </div>
        <div className="bg-gradient-to-b from-black/0  to-black absolute w-full h-1/2 bottom-0 left-0 z-20"></div>
        <div className="bg-gradient-to-b from-black/0  to-black absolute w-full h-1/2 bottom-0 left-0 z-10"></div>
      </div>
    </TiltComponent>
  );
};

export default CardWithBtnView;
