import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import styles from "./PixieDustLink.module.css";

export type PixieDustLinkVariant = "inline" | "action" | "surface";

export type PixieDustLinkColor = "accent" | "inherit";

export type PixieDustLinkIndicator = "none" | "arrow";

export type PixieDustLinkProps = Readonly<
    Omit<ComponentProps<typeof Link>, "children" | "className" | "color"> & {
        children: ReactNode;
        variant?: PixieDustLinkVariant;
        color?: PixieDustLinkColor;
        indicator?: PixieDustLinkIndicator;
        className?: string;
        focusPreview?: boolean;
    }
>;

export function PixieDustLink({
    children,
    variant = "inline",
    color = "accent",
    indicator = "none",
    className = "",
    focusPreview = false,
    ...linkProps
}: PixieDustLinkProps) {
    return (
        <Link
            {...linkProps}
            className={`${styles.root} ${styles[variant]} ${styles[color]} ${focusPreview ? styles.focusPreview : ""} ${className}`.trim()}
        >
            {children}
            {indicator === "arrow" ? (
                <span aria-hidden="true" className={styles.indicator}>
                    →
                </span>
            ) : null}
        </Link>
    );
}
