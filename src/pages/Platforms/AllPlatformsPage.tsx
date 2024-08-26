import { useState } from "react";
import FullPageLoader from "../../components/FullPageLoader";
import Title from "../../components/Title";
import Pagination from "../../components/Pagination";
import { usePlatforms } from "../../hooks/Platforms/usePlatforms";
import { PlatformCard } from "../../features/AllPlatforms/PlatformCard";

function AllPlatformsPage() {
  const [page, setPage] = useState<number>(1);
  const { platforms, isLoadingPlatforms } = usePlatforms({
    page,
    page_size: 20,
  });
  const AllPlatforms = platforms?.results;

  if (isLoadingPlatforms || !platforms) return <FullPageLoader />;
  return (
    <div className="w-full h-full overflow-y-scroll">
      <div className="grid gap-5">
        <Title title="Genres" />
        <div
          className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-2 sm:gap-5`}
        >
          {AllPlatforms?.map((platform) => (
            <PlatformCard
              key={platform.id}
              platform={platform}
              size={{ width: "100%", square: true }}
            />
          ))}
        </div>
        <Pagination data={platforms} changePage={setPage} />
      </div>
    </div>
  );
}

export default AllPlatformsPage;
