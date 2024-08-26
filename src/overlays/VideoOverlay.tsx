import React, { useContext } from "react";
import { RiCloseFill } from "react-icons/ri";
import { VideoLayoutContext } from "../context/VideoLayoutContext";
import Title from "../components/Title";

const VideoOverlay = (
  props: React.DetailedHTMLProps<
    React.VideoHTMLAttributes<HTMLVideoElement>,
    HTMLVideoElement
  > & { data_video: { name: string } }
) => {
  const [, setVideo] = useContext(VideoLayoutContext);

  return (
    <div className="bg-black/85 w-screen h-screen fixed top-0 grid place-items-center py-10 px-5 z-[1000] overflow-hidden">
      <div
        className="absolute top-10 left-1/2 -translate-x-1/2 bg-secondary rounded-full p-5 cursor-pointer"
        onClick={() => setVideo({ isShow: false })}
      >
        <RiCloseFill size={35} />
      </div>
      <div className="w-full md:w-3/4 xl:w-1/2 aspect-video grid gap-5">
        <Title title={props.data_video.name} className="text-xl sm:text-4xl" />
        <div className="">
          <video {...props} className="w-full h-full"></video>
        </div>
      </div>
    </div>
  );
};

export default VideoOverlay;
