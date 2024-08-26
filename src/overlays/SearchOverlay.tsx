import React, {
  ChangeEvent,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import Title from "../components/Title";
import { RiCloseFill } from "react-icons/ri";
import { SearchOverlayContext } from "../context/SearchOverlayContext";
import useSearchedGames from "../hooks/Search/useSearchedGames";
import FullPageLoader from "../components/FullPageLoader";
import SearchedGame from "../features/Home/SearchedGame";
import Pagination from "../components/Pagination";
import { useDebounce } from "../hooks/custom/useDebounce";

const SearchOverlay = ({ searchText }: { searchText?: string }) => {
  const [isSearchOverlay, setIsSearchOverlay] =
    useContext(SearchOverlayContext);

  const [search, setSearch] = useState<string | undefined>(searchText);

  const [page, setPage] = useState(1);

  const debouncedData = useDebounce<string | undefined>(search);

  const { data, isLoadingGames } = useSearchedGames({
    search: debouncedData,
    page_size: 10,
    page,
  });

  const searchInp =
    useRef<HTMLInputElement>() as React.MutableRefObject<HTMLInputElement>;

  const handleSearchOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        setIsSearchOverlay({ isShow: false, searchText: undefined });
      }
    });

    return () => {};
  }, [setIsSearchOverlay]);
  return (
    <div className="bg-black/80 w-screen h-screen fixed top-0 grid place-items-center px-2 py-10 z-[1000] overflow-y-hidden">
      <div className="bg-primary p-4 rounded-xl md:rounded-2xl shadow-md w-full max-w-2xl flex flex-col gap-5 max-h-full min-h-full custom-scroll overflow-y-scroll">
        <div className="flex justify-between">
          <Title title="Search" />
          <div
            className="bg-secondary hover:bg-third rounded-full p-1 cursor-pointer"
            onClick={() =>
              setIsSearchOverlay({ isShow: false, searchText: undefined })
            }
          >
            <RiCloseFill size={30} />
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <input
            type="text"
            id="overlay-search"
            className="w-full p-2 rounded-md border-none outline-none text-primary"
            placeholder={isSearchOverlay.searchText}
            onChange={handleSearchOnChange}
            ref={searchInp}
          />
        </div>
        <div className="flex-1 flex flex-col items-center justify-center gap-1">
          {isLoadingGames && <FullPageLoader />}
          {data?.results?.map(
            (
              game: {
                id: number;
                name: string;
                background_image: string;
                platforms: { platform: { slug: string } }[];
              },
              index: number
            ) => (
              <SearchedGame key={index} game={game} />
            )
          )}
        </div>
        {data?.results && data?.results?.length > 0 && (
          <Pagination data={data!} changePage={setPage} />
        )}
      </div>
    </div>
  );
};

export default SearchOverlay;
