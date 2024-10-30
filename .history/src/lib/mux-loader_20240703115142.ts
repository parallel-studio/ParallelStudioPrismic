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
    const params = url.searchParams;
    params.set("auto", params.getAll("auto").join(",") || "format");
    params.set("fit", params.get("fit") || "max");
    params.set("w", params.get("w") || width.toString());
    params.set("q", (quality || 50).toString());
    return url.href;
}
