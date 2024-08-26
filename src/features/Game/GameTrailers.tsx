import { useContext } from "react";
import { VideoLayoutContext } from "../../context/VideoLayoutContext";
import { useGameTrailres } from "../../hooks/Game/useGameTrailres";
import Title from "../../components/Title";
import ScrolledSection from "../Home/LandingPage/ScrolledSection";
import TiltComponent from "../../components/TiltComponent";
import { Trailer } from "../../services/apiGame";

const GameTrailers = ({ gameId }: { gameId: string }) => {
  const { gameTrailers, isLoadingTrailers } = useGameTrailres({
    id: Number(gameId),
  });

  const trailers = gameTrailers?.results || [];

  const [, setVideo] = useContext(VideoLayoutContext);

  if (isLoadingTrailers) return;
  return (
    <>
      {trailers?.length > 0 && (
        <div className="w-full grid gap-5">
          <Title title="Trailers" />
          <ScrolledSection style={{ gap: "10px" }}>
            {gameTrailers?.results?.map((trailer: Trailer) => (
              <TiltComponent key={trailer.id}>
                <div
                  className="min-w-[300px] aspect-video rounded-2xl overflow-hidden relative group bg-center bg-cover"
                  style={{ backgroundImage: `url('${trailer.preview}')` }}
                >
                  <div
                    className="w-full h-full absolute top-0 grid place-items-center"
                    onClick={() => {
                      setVideo({
                        isShow: true,
                        videoData: { src: trailer.data["480"], ...trailer },
                      });
                    }}
                  >
                    <img
                      src="/play_video.svg"
                      alt=""
                      className="w-10"
                    />
                  </div>
                </div>
              </TiltComponent>
            ))}
          </ScrolledSection>
        </div>
      )}
    </>
  );
};

export default GameTrailers;
