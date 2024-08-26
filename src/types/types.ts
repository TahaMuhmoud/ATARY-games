/* eslint-disable @typescript-eslint/no-explicit-any */
export interface AnyObject {
  [key: string]: any;
}
export interface Size {
  width?: string;
  height?: string;
  square?: boolean;
}

export type ChildrenType = JSX.Element | JSX.Element[];
// ====================================================================
export interface ReturnGamesTypes<T> {
  count: number;
  results: T[] | [];
  next: string | null;
  previous: string | null;
  page: number;
  page_size: number;
}

export enum OrderingAsc {
  name = "name",
  released = "released",
  rating = "rating",
  added = "added",
  created = "created",
  metacritic = "metacritic",
  id = "id",
}
export enum OrderingDesc {
  name = "-name",
  released = "-released",
  rating = "-rating",
  added = "-added",
  created = "-created",
  metacritic = "-metacritic",
  id = "-id",
}
export interface GetGamesParams {
  beforeNumDays?: number;
  page?: number;
  page_size?: number;
  dates?: [string, string];
  ordering?: OrderingAsc | OrderingDesc;
  platforms?: number;
  genres?: number;
  search?: string;
  search_exact?: boolean;
}
// =================================================
export enum RequirementsEnum {
  minimum = "minimum",
  recommended = "recommended",
}

export interface Platform {
  id: number;
  slug: string;
  name: string;
  logo: string;
  image_background: string;
  games_count: number;
}
export interface Store {
  id: number;
  name: string;
  slug: string;
  domain: string;
  image_background: string;
  logo?: string;
}
export interface Metacritic {
  metascore: number;
  url: string;
  platform: Platform;
  logo?: string;
}
export interface Genre {
  id: number;
  name: string;
  slug: string;
  image_background: string;
  games_count: number;
  description: string;
}
export interface Tag {
  id: number;
  name: string;
  slug: string;
  image_background: string;
  games_count: number;
  language: string;
}
export type Publisher = Genre;
export type Developer = Genre;
export interface Game {
  id: number;
  name: string;
  slug: string;
  description: string;
  background_image: string;
  background_image_additional: string;
  rating: number;
  added: number;
  updated: string;
  released: string;
  website: string;
  reddit_url: string;
  metacritic_url: string;
  playtime: number;
  platforms: {
    platform: Platform;
    released_at: string | null;
    requirements: { minimum: string; recommended: string } | null;
  }[];
  stores: { store: Store }[];
  metacritic_platforms: Metacritic[];
  publishers: Publisher[];
  genres: Genre[];
  tags: Tag[];
  developers: Developer[];
}
// =====================================
// GET: ALL_GENRE
export interface GetGenresParams {
  page?: number;
  page_size?: number;
  ordering?: OrderingAsc | OrderingDesc;
}
export interface Genre {
  id: number;
  slug: string;
  name: string;
  image_background: string;
  games_count: number;
}
// ====================================

export type GetPlatformsParams = GetGenresParams;

// =======================================
// SORT ARRAY
export type SortArray = {
  label: string;
  value: string;
}[];
