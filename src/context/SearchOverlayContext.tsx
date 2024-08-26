/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { createContext, useState } from "react";
import { ChildrenType } from "../types/types";

export const SearchOverlayContext: React.Context<any> =
  createContext<any>(null);
const SearchOverlayContextProvider = ({
  children,
}: {
  children: ChildrenType;
}) => {
  const [isSearchOverlay, setIsSearchOverlay] = useState<{
    isShow: boolean;
    searchText?: string;
  }>({ isShow: false, searchText: undefined });
  return (
    <SearchOverlayContext.Provider
      value={[isSearchOverlay, setIsSearchOverlay]}
    >
      {children}
    </SearchOverlayContext.Provider>
  );
};

export default SearchOverlayContextProvider;
