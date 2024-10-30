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
                    <DialogPanel
                        as={motion.div}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1,  backgroundColor: "hsla(0, 0%, 0%, 0.75)"; }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className={clsx(styles.panel)}
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
