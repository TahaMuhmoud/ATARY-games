/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { createContext, useState } from "react";
import { ChildrenType } from "../types/types";

export const MenuBarContext: React.Context<any> = createContext<any>(null);
const MenuBarContextProvider = ({ children }: { children: ChildrenType }) => {
  const [isShowMenuBar, setIsShowMenuBar] = useState<boolean>(false);
  return (
    <MenuBarContext.Provider value={[isShowMenuBar, setIsShowMenuBar]}>
      {children}
    </MenuBarContext.Provider>
  );
};

export default MenuBarContextProvider;
