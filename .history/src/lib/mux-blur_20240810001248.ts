import { createBlurUp, Options } from "@mux/blurup";

type MuxBlurUp = {
    muxPlaybackId?: string;
    options?: Options;
};

export const getMuxBlurUp = async ({ muxPlaybackId, options }: MuxBlurUp) => {
    if (!muxPlaybackId) return undefined;

    const OPTIONS: Options = {
        height: 500,
        width: 500,
        time: 0,
        type: "webp",
    };

    const queryOptions: Options = {
        ...OPTIONS,
        ...options,
    };

    const data = await createBlurUp(muxPlaybackId, queryOptions).catch(
        (error) => {
            console.log({ id: muxPlaybackId, options, error });
        }
    );

    if (queryOptions.width) {
        data?.imageURL?.searchParams.set("width", String(queryOptions.width));
    }

    if (queryOptions.height) {
        data?.imageURL?.searchParams.set("height", String(queryOptions.height));
    }

    return data
        ? {
              ...data,
              imageURL: data.imageURL.href,
          }
        : undefined;
};

export type ReturnTypeGetMuxBlurUp = Awaited<ReturnType<typeof getMuxBlurUp>>;
