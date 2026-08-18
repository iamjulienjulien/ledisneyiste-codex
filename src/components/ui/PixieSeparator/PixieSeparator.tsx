import { getAtelierAnimationColor } from "@/registry/colors";
import type {
    PixieSeparatorProps,
    PixieSeparatorStyle,
} from "./PixieSeparator.types";
import styles from "./PixieSeparator.module.css";

export function PixieSeparator({
    variant = "line",
    intensity = "subtle",
    color = false,
    spacing = "md",
    width = "full",
    align = "center",
    position,
    decorative = false,
    className = "",
    style,
    role,
    "aria-hidden": ariaHidden,
    ...separatorProps
}: PixieSeparatorProps) {
    const colorDefinition = color ? getAtelierAnimationColor(color) : null;
    const resolvedPosition =
        position ??
        (variant === "section" || variant === "fade" ? "start" : "center");
    const separatorStyle: PixieSeparatorStyle = {
        ...style,
        ...(colorDefinition
            ? { "--pixie-separator-color": colorDefinition.cssValue }
            : {}),
    };

    return (
        <hr
            {...separatorProps}
            className={`${styles.root} ${styles[variant]} ${styles[intensity]} ${styles[spacing]} ${styles[width]} ${styles[align]} ${styles[`position-${resolvedPosition}`]} ${className}`.trim()}
            style={separatorStyle}
            data-pixie-separator-color={color || "theme"}
            role={decorative ? "presentation" : role}
            aria-hidden={decorative ? true : ariaHidden}
        />
    );
}
