import { OrderingAsc, OrderingDesc, SortArray } from "../types/types";

export const MS_IN_DAY = 24 * 60 * 60 * 60;

export const PAGE_SIZE: number = 40;

export const SORT_ARRAY: SortArray = [
  { value: OrderingDesc.added, label: "popularity Dsc" },
  { value: OrderingDesc.released, label: "relaesed Dsc" },
  { value: OrderingDesc.rating, label: "rating Dsc" },
  { value: OrderingDesc.name, label: "name Dsc" },
  { value: OrderingAsc.added, label: "popularity Asc" },
  { value: OrderingAsc.released, label: "relaesed Asc" },
  { value: OrderingAsc.rating, label: "rating Asc" },
  { value: OrderingAsc.name, label: "name Asc" },
];
