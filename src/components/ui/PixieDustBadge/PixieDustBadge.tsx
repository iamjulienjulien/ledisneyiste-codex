import type { ComponentPropsWithoutRef, CSSProperties, ReactNode } from "react";
import styles from "./PixieDustBadge.module.css";

export type PixieDustBadgeVariant = "soft" | "outline" | "plain";

export type PixieDustBadgeTone = "neutral" | "accent" | "inherit";

export type PixieDustBadgeSize = "sm" | "md";

export type PixieDustBadgeShape = "rounded" | "pill";

export type PixieDustBadgeProps = Readonly<
    Omit<ComponentPropsWithoutRef<"span">, "children" | "color"> & {
        children: ReactNode;
        variant?: PixieDustBadgeVariant;
        tone?: PixieDustBadgeTone;
        size?: PixieDustBadgeSize;
        shape?: PixieDustBadgeShape;
        icon?: ReactNode;
        accent?: string;
    }
>;

type PixieDustBadgeStyle = CSSProperties & {
    "--pixie-dust-badge-accent"?: string;
};

export function PixieDustBadge({
    children,
    variant = "soft",
    tone = "accent",
    size = "md",
    shape = "rounded",
    icon,
    accent,
    className = "",
    style,
    ...spanProps
}: PixieDustBadgeProps) {
    const badgeStyle: PixieDustBadgeStyle = {
        ...style,
        ...(accent ? { "--pixie-dust-badge-accent": accent } : {}),
    };

    return (
        <span
            {...spanProps}
            className={`${styles.root} ${styles[variant]} ${styles[tone]} ${styles[size]} ${styles[shape]} ${className}`.trim()}
            style={badgeStyle}
        >
            {icon ? (
                <span aria-hidden="true" className={styles.icon}>
                    {icon}
                </span>
            ) : null}
            <span>{children}</span>
        </span>
    );
}
