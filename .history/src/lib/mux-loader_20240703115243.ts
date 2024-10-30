import { Options } from "@mux/blurup";

type MuxLoaderProps = {
    src: string;
} & Options;
export default function muxLoader({
    src,
    width,
    height,
    quality = 1,
    time = 0,
}: MuxLoaderProps) {
    const url = new URL(
        `https://image.mux.com/${src}/thumbnail.webp?width=${width}&height=${height}&time=${time}&quality=${quality}`
    );
    return url.href;
}
