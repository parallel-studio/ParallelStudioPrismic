import { isFilled, KeyTextField, NumberField } from "@prismicio/client";

import { getMuxBlurUp } from "./mux-blur";

type MuxData = {};

export const getMuxDataFromPrismic = async ({
    playbackId,
    time,
}: {
    playbackId: KeyTextField;
    time?: NumberField;
}) => {
    const defaultVideo = isFilled.keyText(playbackId) ? playbackId : undefined;

    if (!defaultVideo) return undefined;

    const defaultVideoOptions = time ? { time } : undefined;

    const muxData_DefaultVideo = await getMuxBlurUp({
        muxPlaybackId: defaultVideo,
        options: defaultVideoOptions,
    });

    return muxData_DefaultVideo
        ? {
              playbackId: defaultVideo,
              playerInitTime: time ? time : 0,
              ...muxData_DefaultVideo,
          }
        : undefined;
};