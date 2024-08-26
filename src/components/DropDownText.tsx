import { useState } from "react";
import Title from "./Title";
import { RiArrowDownSFill, RiArrowUpSFill } from "react-icons/ri";

const DropDownText = ({ title, text }: { title: string; text: string }) => {
  const [isShowDetails, setIsShowDetails] = useState<boolean>(false);
  if (!text) return;
  return (
    <div className="w-full grid gap-4">
      <div className="flex gap-5">
        <Title title={title} />
        <button
          type="button"
          title="arrow-down"
          className="bg-white/30 hover:bg-white/10 px-2 rounded-md"
          onClick={() => setIsShowDetails((is) => !is)}
        >
          {!isShowDetails ? (
            <RiArrowDownSFill size={30} />
          ) : (
            <RiArrowUpSFill size={30} />
          )}
        </button>
      </div>

      {isShowDetails && (
        <div
          dangerouslySetInnerHTML={{
            __html: text,
          }}
          className="lg:text-xl"
        ></div>
      )}
    </div>
  );
};

export default DropDownText;
