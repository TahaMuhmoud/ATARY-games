import { Game, GetGamesParams, ReturnGamesTypes } from "../types/types";
import { PAGE_SIZE } from "../utils/constants";
import { assignLogoToPlatform, assignLogoToStore } from "../utils/helpers";
import { api } from "./api";
import { format, sub } from "date-fns";

export const getGames: (
  params?: GetGamesParams
) => Promise<ReturnGamesTypes<Game>> = async (params = {}) => {
  const { page = 1, page_size = PAGE_SIZE } = params;

  if (params.beforeNumDays) {
    const result = sub(new Date(), {
      days: params.beforeNumDays,
    });
    const today = format(new Date(), "yyyy-MM-dd");
    const beforeDays = format(result, "yyyy-MM-dd");
    params.dates = [beforeDays, today];
  }

  const { data } = await api.get("games", {
    params: {
      page,
      page_size,
      ...params,
      dates: params?.dates?.join(),
      beforeNumDays: undefined,
    },
  });

  const games = (data?.results as Game[]) || [];

  let newResults = games.map((game) => {
    const gamePlatforms =
      game.platforms?.map((platform) => {
        const platformLogo = assignLogoToPlatform(platform.platform);
        const platformwithLogo = {
          platform: { ...platform.platform, logo: platformLogo },
        };
        return { ...platform, ...platformwithLogo };
      }) || [];
    // ASSIGN SVG LOGO TO EVERY STORE
    const gameStores =
      game.stores?.map((store) => {
        const storeLogo = assignLogoToStore(store.store);
        const storeWithLogo = { store: { ...store.store, logo: storeLogo } };
        return storeWithLogo;
      }) || [];
    // ASSIGN SVG LOGO TO EVERY METACRITIC
    const metas =
      game.metacritic_platforms?.map((meta) => {
        const metaLogo = assignLogoToPlatform(meta.platform);
        const metaWithLogo = { ...meta, logo: metaLogo };
        return metaWithLogo;
      }) || [];
    return {
      ...game,
      platforms: gamePlatforms,
      stores: gameStores,
      metacritic_platforms: metas,
    };
  });

  newResults = newResults.filter(
    (game) =>
      game.genres.findIndex((genre) => genre.id === 14) === -1 &&
      !game.name.toUpperCase().includes("SEX")
  );

  return { ...data, results: newResults, page, page_size };
};
