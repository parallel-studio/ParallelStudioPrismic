import { getPlaiceholder } from "plaiceholder";

type GetPlaceHolderProps = {
    src: string;
};

const getPlaceholder = async ({ src }: GetPlaceHolderProps) => {
    try {
        const buffer = await fetch(src).then(async (res) =>
            Buffer.from(await res.arrayBuffer())
        );

        const { base64 } = await getPlaiceholder(buffer);

        return base64;
    } catch (err) {
        err;
    }
};
