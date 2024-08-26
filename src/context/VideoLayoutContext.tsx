/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { createContext, useState } from "react";
import { AnyObject, ChildrenType } from "../types/types";

export const VideoLayoutContext: React.Context<any> = createContext<any>(null);
const VideoLayoutContextProvider = ({
  children,
}: {
  children: ChildrenType;
}) => {
  const [video, setVideo] = useState<{
    isShow: boolean;
    videoData: AnyObject;
  }>({
    isShow: false,
    videoData: {},
  });
  return (
    <VideoLayoutContext.Provider value={[video, setVideo]}>
      {children}
    </VideoLayoutContext.Provider>
  );
};

export default VideoLayoutContextProvider;
