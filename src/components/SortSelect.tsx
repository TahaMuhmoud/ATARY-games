import { RiArrowDownSFill, RiArrowUpSFill } from "react-icons/ri";
import { SortArray } from "../types/types";
import { startWithUpperCase } from "../utils/helpers";
import { useSearchParams } from "react-router-dom";
import { convertStringToOrdering } from "../utils/helpers";
import { useState } from "react";

const SortSelect = ({ options }: { options: SortArray }) => {
  const [isOpened, setIsOpened] = useState<boolean>(false);

  const [URLSearchParams, SetURLSearchParams] = useSearchParams();

  const choosedOption = options.filter(
    (opt) => opt.value === convertStringToOrdering(URLSearchParams.get("sort"))
  )[0];

  return (
    <div className="bg-secondary px-4 py-2 rounded-t-lg relative hover:bg-third group cursor-pointer">
      <div
        className="flex items-center justify-between gap-4"
        onClick={() => setIsOpened((is) => !is)}
      >
        <div className="flex gap-1">
          <span className="group-hover:text-white/40">Sort By:</span>
          <span className="group-hover:text-white/40">
            {startWithUpperCase(choosedOption.label)}
          </span>
        </div>
        {!isOpened ? (
          <RiArrowDownSFill size={25} className="group-hover:fill-white/40" />
        ) : (
          <RiArrowUpSFill size={25} className="group-hover:fill-white/40" />
        )}
      </div>

      <div
        className={`w-full absolute top-full left-0 overflow-hidden bg-secondary z-10 rounded-b-lg p-1 flex flex-col gap-1 transition-all duration-500 origin-top ${
          isOpened ? "scale-y-100" : "scale-y-0"
        }`}
      >
        {options.map((opt) => (
          <div
            key={opt.value}
            className={`px-2 py-1 rounded-lg flex justify-between cursor-pointer hover:bg-third transition-transform duration-500 delay-300 ${
              choosedOption.value === opt.value ? "bg-third" : ""
            } ${isOpened ? "translate-x-0" : "-translate-x-full"}`}
            onClick={() => {
              URLSearchParams.set("sort", opt.value);
              SetURLSearchParams(URLSearchParams);
            }}
          >
            <span>{startWithUpperCase(opt.label)}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SortSelect;
