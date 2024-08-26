import { ChildrenType } from "../types/types";

const RoundedCard = ({
  children,
  index,
}: {
  children: ChildrenType;
  index: number;
}) => {
  return (
    <div
      className={`overflow-hidden ${
        index == 0
          ? "rounded-tr-[100px] rounded-bl-[100px]"
          : index == 1
          ? "rounded-tl-[100px] rounded-br-[100px]"
          : index == 2
          ? "rounded-br-[100px] rounded-tl-[100px]"
          : index == 3
          ? "rounded-tr-[100px] rounded-bl-[100px]"
          : ""
      }`}
    >
      {children}
    </div>
  );
};

export default RoundedCard;
