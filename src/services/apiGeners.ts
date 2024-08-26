import { api } from "./api";
import { Genre, GetGenresParams, ReturnGamesTypes } from "../types/types";
import { PAGE_SIZE } from "../utils/constants";

const getGenreData: (id: number) => Promise<Genre> = async (id) => {
  const { data } = await api.get(`genres/${id}`);
  return data;
};

// GET: ALL_GENRE

const getGeners: (
  params?: GetGenresParams
) => Promise<ReturnGamesTypes<Genre>> = async (
  params = { page: 1, page_size: PAGE_SIZE }
) => {
  const { page, page_size } = params;
  const { data } = await api.get("genres", { params: { ...params } });

  return { ...data, page, page_size };
};
// ======================

export { getGenreData, getGeners };
