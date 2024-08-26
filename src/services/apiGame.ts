import {
  AnyObject,
  Game,
  OrderingAsc,
  OrderingDesc,
  ReturnGamesTypes,
} from "../types/types";
import { api } from "./api";
import { assignLogoToPlatform, assignLogoToStore } from "../utils/helpers";
import { PAGE_SIZE } from "../utils/constants";

// GET: GAME_DETAILS
export const getGameDetails: (id: number) => Promise<Game> = async (id) => {
  const { data } = (await api.get(`games/${id}`)) as { data: Game };
  // ASSIGN SVG LOGO TO EVERY PLATFORM
  const gamePlatforms = data?.platforms.map((platform) => {
    const platformLogo = assignLogoToPlatform(platform.platform);
    const platformwithLogo = {
      platform: { ...platform.platform, logo: platformLogo },
    };
    return { ...platform, ...platformwithLogo };
  });
  // ASSIGN SVG LOGO TO EVERY STORE
  const gameStores = data.stores.map((store) => {
    const storeLogo = assignLogoToStore(store.store);
    const storeWithLogo = { store: { ...store.store, logo: storeLogo } };
    return storeWithLogo;
  });
  // ASSIGN SVG LOGO TO EVERY METACRITIC
  const metas = data.metacritic_platforms?.map((meta) => {
    const metaLogo = assignLogoToPlatform(meta.platform);
    const metaWithLogo = { ...meta, logo: metaLogo };
    return metaWithLogo;
  });

  return {
    ...data,
    platforms: gamePlatforms,
    stores: gameStores,
    metacritic_platforms: metas,
  };
};

// GET: GAME_SCREENSHOTS
export interface GetGameScreenShotsParams {
  id: number;
  ordering?: OrderingAsc | OrderingDesc;
  page?: number;
  page_size?: number;
}
export interface ScreenShot {
  id: number;
  image: string;
  hidden: boolean;
  width: number;
  height: number;
}
export const getGameScreenShots: (
  params: GetGameScreenShotsParams
) => Promise<ReturnGamesTypes<ScreenShot>> = async (params) => {
  const { id, page = 1, page_size = PAGE_SIZE, ordering } = params;

  const { data } = await api.get(
    `https://api.rawg.io/api/games/${id}/screenshots`,
    { params: { page, page_size, ordering } }
  );

  return {
    ...data,
    page,
    page_size,
  };
};

// GET: GAME_TRAILERS
export interface GetGameTrailersParams {
  id: number;
  page?: number;
  page_size?: number;
}

export interface Trailer {
  id: number;
  name: string;
  preview: string;
  data: AnyObject;
}

export const getGameTrailers: (
  params: GetGameTrailersParams
) => Promise<ReturnGamesTypes<Trailer>> = async (params) => {
  const { id, page = 1, page_size = PAGE_SIZE } = params;
  const { data } = await api.get(`https://api.rawg.io/api/games/${id}/movies`, {
    params: { page, page_size },
  });

  return {
    ...data,
    page,
    page_size,
  };
};

// GET: GAME_SERIES_GAMES
export interface GetGamesInSameSeries {
  id: number;
  page?: number;
  page_size?: number;
}
export const getGamesInSameSeries: (
  params: GetGamesInSameSeries
) => Promise<ReturnGamesTypes<Game>> = async (params) => {
  const { id, page = 1, page_size = PAGE_SIZE } = params;
  const { data } = await api.get(
    `https://api.rawg.io/api/games/${id}/game-series`,
    {
      params: { page, page_size },
    }
  );
  const games = (data?.results as Game[]) || [];
  const newResults = games.map((game) => {
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
  return {
    ...data,
    results: newResults,
    page,
    page_size,
  };
};
