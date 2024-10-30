import { RichTextField } from "@prismicio/client";
import {
  JSXMapSerializer,
  PrismicRichText as BasePrismicRichText,
} from "@prismicio/react";

type PrismicRichTextProps = {
  components?: JSXMapSerializer;
  field: RichTextField; // Add the 'field' property to the type definition
};

export function PrismicRichText({
  field,
  components,
  ...props
}: PrismicRichTextProps) {
  return (
    <BasePrismicRichText field={field} components={components} {...props} />
  );
}
