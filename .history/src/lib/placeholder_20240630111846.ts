import { getPlaiceholder } from "plaiceholder";

const getPlaceholder = async () => {
    try {
        const src =
            "https://images.unsplash.com/photo-1621961458348-f013d219b50c";

        const buffer = await fetch(src).then(async (res) =>
            Buffer.from(await res.arrayBuffer())
        );

        const { base64 } = await getPlaiceholder(buffer);

        console.log(base64);
    } catch (err) {
        err;
    }
};
