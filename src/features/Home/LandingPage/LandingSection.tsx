import ChangedImage from "../../../components/ChangedImage";
import { Size } from "../../../types/types";

interface LandingSectionProps {
  size?: Size;
  images: string[];
  interval: number;
  children?: JSX.Element[] | JSX.Element;
}

function LandingSection({
  images,
  interval,
  children,
  size = { width: "100%", height: "550px" },
}: LandingSectionProps) {
  return (
    <div
      className="rounded-t-3xl flex items-end overflow-hidden relative"
      style={{
        minWidth: size.width,
        minHeight: size.height,
        maxWidth: size.width,
        maxHeight: size.height,
      }}
    >
      <ChangedImage images={images} interval={interval} />
      <div className="bg-gradient-to-b from-black/0 via-primary/90 to-primary absolute w-full h-1/3 bottom-0 left-0 "></div>
      <div className="z-50">{children}</div>
    </div>
  );
}

export default LandingSection;
