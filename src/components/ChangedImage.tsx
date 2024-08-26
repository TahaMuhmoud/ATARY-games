import { useEffect, useState } from "react";
import Image from "./Image";

const ChangedImage = ({
  images = [],
  interval = 1000,
}: {
  images: string[];
  interval: number;
}) => {
  images = images.filter((img) => img);

  const [imageIndx, setImageIndx] = useState<number>(0);
  useEffect(() => {
    const intervalId = setInterval(() => {
      setImageIndx((prevIndex) => {
        if (prevIndex === images.length - 1) {
          return 0;
        }
        return prevIndex + 1;
      });
    }, interval);
    return () => clearInterval(intervalId);
  }, [images.length, interval]);
  return (
    <div className="w-full h-full absolute -z-10 bg-secondary">
      <Image src={images[imageIndx]} className={"object-top object-cover"} />
    </div>
  );
};

export default ChangedImage;
