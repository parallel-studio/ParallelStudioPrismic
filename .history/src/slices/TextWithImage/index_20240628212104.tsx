import { FC } from "react";

import * as prismic from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";

import { Bounded } from "@/components/Bounded";
import { PrismicRichText } from "@/components/PrismicRichText";

import { TextWithImageSlice } from "../../../prismicio-types";
type TextWithImageProps = {
    slice: TextWithImageSlice;
};

const TextWithImage: FC<TextWithImageProps> = ({ slice }) => {
    const image = slice.primary.image;

    return (
        <Bounded as="section" className="bg-white">
            <div>
                <div>
                    <PrismicRichText field={slice.primary.text} />
                </div>
                <div>
                    {prismic.isFilled.image(image) && (
                        <div className="bg-gray-100">
                            <PrismicNextImage
                                field={image}
                                sizes="100vw"
                                className="w-full"
                            />
                        </div>
                    )}
                </div>
            </div>
        </Bounded>
    );
};

export default TextWithImage;