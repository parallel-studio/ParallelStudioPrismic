import { Options } from "@mux/blurup";

type MuxLoaderProps = {
    playbackId: string;
} & Options;
export default function muxLoader({
    playbackId,
    width,
    height,
    quality = 1,
    time = 0,
}: MuxLoaderProps) {
    const url = new URL(
        `https://image.mux.com/${playbackId}/thumbnail.webp?width=${width}&height=${height}&time=${time}&quality=${quality}`
    );
    return url.href;
}
