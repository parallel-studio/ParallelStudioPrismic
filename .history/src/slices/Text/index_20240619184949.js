import clsx from "clsx";

import { Bounded } from "@/components/Bounded";
import { PrismicRichText } from "@/components/PrismicRichText";

const components = {
    label: ({ node, children }) => (
        <span style={{textAlign: }}>{children}</span>
    ),
};

const Text = ({ slice }) => {
    return (
        <Bounded as="section" className="bg-white leading-relaxed">
            <div
                className={clsx(
                    slice.variation === "twoColumns" && "md:columns-2 md:gap-6"
                )}
            >
                <PrismicRichText
                    field={slice.primary.text}
                    components={components}
                />
            </div>
        </Bounded>
    );
};

export default Text;
