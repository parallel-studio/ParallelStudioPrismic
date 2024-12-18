"use client";

import {
    createContext,
    MouseEventHandler,
    PropsWithChildren,
    use,
    useTransition,
} from "react";

import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";

import { stopAutoScroll } from "@/components/mega-hero/useMegaHeroMotion";

export const DELAY = 200;

const sleep = (ms: number) =>
    new Promise<void>((resolve) => setTimeout(() => resolve(), ms));
const noop = () => {};

type TransitionContext = {
    pending: boolean;
    navigate: (url: string) => void;
};
const Context = createContext<TransitionContext>({
    pending: false,
    navigate: noop,
});
export const usePageTransition = () => use(Context);
export const usePageTransitionHandler = () => {
    const { navigate } = usePageTransition();
    const onClick: MouseEventHandler<HTMLAnchorElement> = (e) => {
        e.preventDefault();
        const href = e.currentTarget.getAttribute("href");
        if (href) navigate(href);
    };

    return onClick;
};

type Props = PropsWithChildren<{
    className?: string;
}>;

export default function Transitions({ children, className }: Props) {
    const [pending, start] = useTransition();
    const router = useRouter();
    const navigate = (href: string) => {
        start(async () => {
            router.push(href);
            await sleep(DELAY);
        });
    };

    const onClick: MouseEventHandler<HTMLDivElement | HTMLBodyElement> = (
        e
    ) => {
        const a = (e.target as Element).closest("a");
        if (a) {
            e.preventDefault();
            const href = a.getAttribute("href");
            const type = a.getAttribute("type");
            if (href && type !== "web") navigate(href);
        }
    };

    return (
        <Context.Provider value={{ pending, navigate }}>
            <body onClickCapture={onClick} className={className}>
                {children}
            </body>
        </Context.Provider>
    );
}
