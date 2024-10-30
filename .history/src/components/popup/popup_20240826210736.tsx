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
        <Dialog
            open={isOpen}
            onClose={handleClose}
            className={clsx(styles.wrapper, className)}
            transition
            {...props}
        >
            <DialogPanel className={clsx(styles.panel)}>
                {title && (
                    <DialogTitle className={styles.title}>{title}</DialogTitle>
                )}
                {children}
            </DialogPanel>
            {withCloseButton && (
                <CloseButton className={styles.button} onClick={handleClose}>
                    <Close />
                </CloseButton>
            )}
        </Dialog>
    );
};

export { Popup };
