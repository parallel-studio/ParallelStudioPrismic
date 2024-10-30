"use client";

import { FC, ReactNode } from "react";

import { AnimatePresence } from "framer-motion";

import { usePageTransition } from "../../lib/transitions";

type AnimationContainerProps = {
  children: ReactNode;
};

export const AnimationContainer: FC<AnimationContainerProps> = ({
  children,
}) => {
  const { pending } = usePageTransition();
  return <AnimatePresence>{!pending && <>{children}</>}</AnimatePresence>;
};
