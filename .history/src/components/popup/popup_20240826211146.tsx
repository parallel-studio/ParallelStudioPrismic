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
import { AnimatePresence } from "framer-motion";

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
                    <DialogPanel className={clsx(styles.panel)}>
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
