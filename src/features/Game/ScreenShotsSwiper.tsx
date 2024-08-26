import { useEffect, useState } from "react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import Image from "../../components/Image";
import TiltComponent from "../../components/TiltComponent";
import FullPageLoader from "../../components/FullPageLoader";
import { useGameScreenshots } from "../../hooks/Game/useGameScreenshots";

interface ScreenShotsSwiperProps {
  gameId: string;
}

const ScreenShotsSwiper = ({ gameId }: ScreenShotsSwiperProps) => {
  const [page, setPage] = useState<number>(1);
  const { gameScreenshots, isLoadingScreenshots } = useGameScreenshots({
    id: Number(gameId),
    page_size: 4,
    page,
  });

  const [activIndx, setActivIndx] = useState<number>(0);

  const images = gameScreenshots?.results || [];

  const handleNextPage: () => void = () => {
    setPage((p) => {
      if (gameScreenshots?.next) return p + 1;
      else return p;
    });
  };

  const handlePrevPage: () => void = () => {
    setPage((p) => {
      if (gameScreenshots?.previous) return p - 1;
      else return p;
    });
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setActivIndx((prevIndex) => {
        if (prevIndex === images.length - 1) {
          return 0;
        } else return prevIndex + 1;
      });
    }, 3000);
    return () => clearInterval(intervalId);
  }, [images.length]);

  return (
    <div className="min-w-full max-w-[800px] min-h-[300px] sm:min-h-[400] md:min-h-[500px] overflow-hidden relative">
      {!isLoadingScreenshots ? (
        <>
          <TiltComponent>
            <Image src={images[activIndx]?.image} />
          </TiltComponent>

          {gameScreenshots?.previous && (
            <div
              className="h-20 w-10 absolute top-1/2 -translate-y-1/2 left-0 bg-primary/70 hover:bg-third grid place-items-center cursor-pointer"
              onClick={handlePrevPage}
            >
              <MdKeyboardArrowLeft size={30} />
            </div>
          )}
          {gameScreenshots?.next && (
            <div
              className="h-20 w-10 absolute top-1/2 -translate-y-1/2 right-0 bg-primary/70 hover:bg-third grid place-items-center cursor-pointer"
              onClick={handleNextPage}
            >
              <MdKeyboardArrowRight size={30} />
            </div>
          )}
          <div className="w-full pb-5 absolute left-0 bottom-0 bg-primary/70 flex flex-wrap gap-3 items-center justify-center">
            {images.map((img, i) => (
              <div
                key={i}
                className={`${
                  activIndx === i ? "min-w-7" : ""
                } w-5 hover:w-7 aspect-square -translate-y-1/4 rounded-full overflow-hidden outline outline-primary/70 border-4 border-white cursor-pointer`}
                onClick={() => setActivIndx(i)}
              >
                <Image src={img.image} />
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="w-full h-full bg-secondary">
          <FullPageLoader />
        </div>
      )}
    </div>
  );
};

export default ScreenShotsSwiper;
