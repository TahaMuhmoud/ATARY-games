import { useQuery } from "react-query";
import { getPlatformData } from "../../services/apiPlatforms";

const usePlatfromData = (id: number) => {
  const { data: platform, isLoading: isLoadingPlatform } = useQuery(
    [`platform-${id}`, id],
    () => getPlatformData(id)
  );
  return { platform, isLoadingPlatform };
};

export default usePlatfromData;
