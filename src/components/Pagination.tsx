import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { AnyObject, ReturnGamesTypes } from "../types/types";
interface PaginationProps {
  data: ReturnGamesTypes<AnyObject>;
  changePage: React.Dispatch<React.SetStateAction<number>>;
}
function Pagination({
  changePage,
  data: { count, next, previous, page, page_size },
}: PaginationProps) {
  const numPages: number = Math.ceil(count / page_size);
  const handleNextPage: () => void = () => {
    changePage((p) => {
      if (next) return p + 1;
      else return p;
    });
  };
  const handlePrevPage: () => void = () => {
    changePage((p) => {
      if (previous) return p - 1;
      else return p;
    });
  };
  if (!next && !previous) return;
  return (
    <div className="flex items-center justify-center gap-5 p-5">
      <button
        type="button"
        title="arrow-left"
        className="px-3 py-2 bg-third disabled:bg-primary/0"
        onClick={handlePrevPage}
        disabled={!previous ? true : false}
      >
        <MdKeyboardArrowLeft size={26} />
      </button>

      <div className="">
        <span className="text-xl font-black text-fourth">{page}</span> from{" "}
        {numPages}
      </div>

      <button
        type="button"
        title="arrow-right"
        className="px-3 py-2 bg-third disabled:bg-primary/0"
        onClick={handleNextPage}
        disabled={!next ? true : false}
      >
        <MdKeyboardArrowRight size={26} />
      </button>
    </div>
  );
}

export default Pagination;
