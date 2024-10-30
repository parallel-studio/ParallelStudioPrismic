import { FC } from "react";

import { asLink, isFilled } from "@prismicio/client";

import { Filter } from "@/components/filter/filter";
import Spacer from "@/components/spacer";
import { NavProps } from "@/slices/Nav";

export const Nav: FC<NavProps> = ({ slice, context }) => {
  const links = slice.primary.links;

  let items = [
    ...links?.map((item) => {
      const category = item.link;
      if (
        isFilled.contentRelationship(category) &&
        isFilled.keyText(item.label)
      ) {
        return {
          id: category.id,
          label: item.label,
          path: asLink(category) as string,
        };
      }
    }),
  ]?.filter((item) => item !== undefined && item !== null);

  if (items.length > 0)
    return (
      <Spacer>
        <Filter
          items={items}
          style={{ transform: "translateY(var(--px-small))" }}
        />
      </Spacer>
    );
};
