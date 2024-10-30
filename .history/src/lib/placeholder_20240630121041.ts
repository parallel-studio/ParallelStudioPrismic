import { getPlaiceholder } from "plaiceholder";

type GetPlaceHolderProps = {
    src: string;
};

export const getPlaceholder = async ({ src }: GetPlaceHolderProps) => {
    try {
        const buffer = await fetch(src).then(async (res) =>
            Buffer.from(await res.arrayBuffer())
        );

        const data = await getPlaiceholder(buffer);

        return data;
    } catch (err) {
        err;
    }
};
