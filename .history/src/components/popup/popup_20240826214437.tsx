"use client";

import { FC, ReactNode } from "react";

import {
    CloseButton,
    Dialog,
    DialogPanel,
    DialogProps,
    DialogTitle,
} from "@headlessui/react";
import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";

import { Close } from "../icons/close";
import styles from "./popup.module.scss";

type PopupProps = {
    title?: string;
    children: ReactNode;
    isOpen: boolean;
    handleClose: () => any;
    className?: string;
    withCloseButton?: boolean;
    props?: DialogProps;
};

const Popup: FC<PopupProps> = ({
    title,
    children,
    isOpen,
    handleClose,
    className,
    withCloseButton = true,
    props,
}) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <Dialog
                    open={isOpen}
                    onClose={handleClose}
                    className={clsx(styles.wrapper, className)}
                    transition
                    static
                    {...props}
                >
                    <motion.div
                        initial={{
                            opacity: 0,
                            backgroundColor: "hsla(0, 0%, 0%, 0)",
                        }}
                        animate={{
                            opacity: 1,
                            backgroundColor: "hsla(0, 0%, 0%, 0.75)",
                            transition: { duration: 0.5 },
                        }}
                        exit={{ opacity: 0, transition: { delay: 0.3 } }}
                        className={styles.backdrop}
                    />
                    <DialogPanel
                        as={motion.div}
                        className={clsx(styles.panel)}
                        initial={{
                            opacity: 0,
                        }}
                        animate={{
                            opacity: 1,
                            transition: { delay: 0.3 },
                        }}
                        exit={{ opacity: 0 }}
                    >
                        {title && (
                            <DialogTitle className={styles.title}>
                                {title}
                            </DialogTitle>
                        )}
                        {children}
                    </DialogPanel>
                    {withCloseButton && (
                        <CloseButton
                            className={styles.button}
                            onClick={handleClose}
                        >
                            <Close />
                        </CloseButton>
                    )}
                </Dialog>
            )}
        </AnimatePresence>
    );
};

export { Popup };
