import type { ComponentPropsWithoutRef, CSSProperties } from "react";
import styles from "./PixieDustSeparator.module.css";

export type PixieDustSeparatorVariant = "line" | "beam" | "film";

export type PixieDustSeparatorTone = "subtle" | "strong" | "accent" | "inherit";

export type PixieDustSeparatorSpacing = "sm" | "md" | "lg";

export type PixieDustSeparatorProps = Readonly<
    Omit<ComponentPropsWithoutRef<"hr">, "color"> & {
        variant?: PixieDustSeparatorVariant;
        tone?: PixieDustSeparatorTone;
        spacing?: PixieDustSeparatorSpacing;
        accent?: string;
        decorative?: boolean;
    }
>;

type PixieDustSeparatorStyle = CSSProperties & {
    "--pixie-dust-separator-accent"?: string;
};

export function PixieDustSeparator({
    variant = "line",
    tone = "subtle",
    spacing = "md",
    accent,
    decorative = false,
    className = "",
    style,
    role,
    "aria-hidden": ariaHidden,
    ...separatorProps
}: PixieDustSeparatorProps) {
    const separatorStyle: PixieDustSeparatorStyle = {
        ...style,
        ...(accent ? { "--pixie-dust-separator-accent": accent } : {}),
    };

    return (
        <hr
            {...separatorProps}
            className={`${styles.root} ${styles[variant]} ${styles[tone]} ${styles[spacing]} ${className}`.trim()}
            style={separatorStyle}
            role={decorative ? "presentation" : role}
            aria-hidden={decorative ? true : ariaHidden}
        />
    );
}
