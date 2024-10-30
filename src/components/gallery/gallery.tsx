"use client";
import { ElementType, FC, ReactNode, useRef } from "react";

import clsx from "clsx";
import css from "styled-jsx/css";

import { Section } from "../section/section";
import styles from "./gallery.module.scss";

type GalleryGap = "small" | "medium" | "film";

export type GalleryClassNames =
  | "default"
  | "one_two"
  | "two_one"
  | "small_big_small"
  | "big_small_big"
  | "three_to_one"
  | "one_to_three"
  | "bannerAutoGrid"
  | "smart";

export type GalleryBlockSizes =
  | "default"
  | "fixed"
  | "auto"
  | "double"
  | "full_screen";

type GalleryInlineSizes = "default" | "auto";

type GalleryProps<T extends ElementType> = {
  children: ReactNode;
  as?: T;
  layoutType?: GalleryClassNames;
  gap?: GalleryGap;
  blockSizeType?: GalleryBlockSizes;
  inlineSizeType?: GalleryInlineSizes;
  fixedHeightValue?: number;
  className?: string;
};

export const Gallery: FC<GalleryProps<ElementType>> = ({
  as: Tag = "ul",
  children,
  layoutType = "default",
  gap = "small",
  blockSizeType,
  inlineSizeType,
  fixedHeightValue,
  className,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { className: styledsClassName, styles: styleds } = css.resolve`
    ${Tag} {
      min-block-size: ${fixedHeightValue}px;

      :global(img) {
        block-size: ${fixedHeightValue}px;
      }
    }
  `;

  return (
    <Section className={className}>
      <Tag
        ref={containerRef}
        className={clsx(
          styles.container,
          styles[gap],
          styles[layoutType],
          blockSizeType ? styles[`block_${blockSizeType}`] : undefined,
          blockSizeType === "fixed" &&
            fixedHeightValue &&
            inlineSizeType === "default"
            ? styledsClassName
            : undefined,
          inlineSizeType ? styles[`inline_${inlineSizeType}`] : undefined,
        )}
      >
        {styleds}
        {children}
      </Tag>
    </Section>
  );
};
