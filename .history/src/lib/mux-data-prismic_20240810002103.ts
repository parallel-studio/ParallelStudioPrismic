import { isFilled, KeyTextField, NumberField } from "@prismicio/client";

import { getMuxBlurUp, ReturnTypeGetMuxBlurUp } from "./mux-blur";

export type MuxData = ReturnTypeGetMuxBlurUp & {
    playbackId: string;
    playerInitTime: number;
};

export const getMuxDataFromPrismic = async ({
    playbackId,
    time,
}: {
    playbackId: KeyTextField;
    time?: NumberField;
}): Promise<MuxData | undefined> => {
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
