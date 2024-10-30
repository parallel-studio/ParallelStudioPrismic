"use client";

import {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";

type VideoOrchestratorContextProps = {
  videoId: string;
  setVideoId: Dispatch<SetStateAction<string>>;
  startTime: number;
  setStartTime: Dispatch<SetStateAction<number>>;
};

const VideoOrchestratorContext = createContext<VideoOrchestratorContextProps>({
  videoId: "",
  setVideoId: () => {},
  startTime: 0,
  setStartTime: () => {},
});

type VideoOrchestratorProviderProps = {
  children: ReactNode;
};

const VideoProvider: FC<VideoOrchestratorProviderProps> = ({ children }) => {
  const [videoId, setVideoId] = useState<string>("");
  const [startTime, setStartTime] = useState<number>(0);

  return (
    <VideoOrchestratorContext.Provider
      value={{ videoId, setVideoId, startTime, setStartTime }}
    >
      {children}
    </VideoOrchestratorContext.Provider>
  );
};

const useVideo = () => useContext(VideoOrchestratorContext);

export { VideoProvider, useVideo };
