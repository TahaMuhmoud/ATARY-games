import { MdSearch } from "react-icons/md";
import { FormEvent, useContext, useRef } from "react";
import { SearchOverlayContext } from "../../context/SearchOverlayContext";

const SearchForm = () => {
  // ======
  const [, setIsSearchOverlay] = useContext(SearchOverlayContext);

  const searchInp =
    useRef<HTMLInputElement>() as React.MutableRefObject<HTMLInputElement>;

  const handleSearchOnSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSearchOverlay({
      isShow: true,
      searchText: searchInp.current.value,
    });
  };
  return (
    <div className="search w-full relative rounded-full overflow-hidden">
      <form action="" onSubmit={handleSearchOnSubmit}>
        <input
          ref={searchInp}
          type="text"
          id="navbar-search-1"
          placeholder="Search About Game"
          className="bg-white/30 w-full h-full p-3 pr-16 focus:outline-none"
        />
        <button
          type="submit"
          title="search"
          className="h-full w-14 grid place-items-center absolute top-0 right-0 rounded-full"
        >
          <MdSearch size={30} />
        </button>
      </form>
    </div>
  );
};

export default SearchForm;
