import { assignLogoToPlatform } from "../utils/helpers";
import { api } from "./api";
import { GetPlatformsParams, Platform, ReturnGamesTypes } from "../types/types";
// GET: GET_PLATFORMS
const getPlatforms: (
  params: GetPlatformsParams
) => Promise<ReturnGamesTypes<Platform>> = async (
  params = { page: 1, page_size: 20 }
) => {
  const { page, page_size } = params;
  const { data } = await api.get(`platforms`, {
    params: {
      ...params,
    },
  });

  const gamePlatforms = data?.results?.map((platform: { slug: string }) => {
    const d = assignLogoToPlatform(platform);
    return { ...platform, logo: d };
  });

  return { ...data, results: gamePlatforms, page, page_size };
};

const getPlatformData = async (id: number) => {
  const { data } = await api.get(`platforms/${id}`);
  return data;
};
export { getPlatforms, getPlatformData };
