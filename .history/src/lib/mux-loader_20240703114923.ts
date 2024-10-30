import { Options } from "@mux/blurup";

type MuxLoaderProps = {
    src: string;
};
export default function muxLoader({ src, width, quality }: Options) {
    const url = new URL(
        `https://image.mux.com/5LfU8G2i01BnRUY6014OloCH4qnr1uH7MHqyi5bqkVoAs/thumbnail.webp?width=16&height=16&time=0`
    );
    const params = url.searchParams;
    params.set("auto", params.getAll("auto").join(",") || "format");
    params.set("fit", params.get("fit") || "max");
    params.set("w", params.get("w") || width.toString());
    params.set("q", (quality || 50).toString());
    return url.href;
}
