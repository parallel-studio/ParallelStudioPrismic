import {
    JSXMapSerializer,
    PrismicRichText as BasePrismicRichText,
} from "@prismicio/react";

type PrismicRichTextProps = {
    components?: JSXMapSerializer;
    field: any; // Add the 'field' property to the type definition
};

export function PrismicRichText({
    components,
    ...props
}: PrismicRichTextProps) {
    return <>{"RICH TEXT"}</>;
}
