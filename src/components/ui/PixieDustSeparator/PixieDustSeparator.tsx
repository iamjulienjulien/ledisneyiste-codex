import { getAtelierAnimationColor } from "@/registry/colors";
import type {
    PixieDustSeparatorProps,
    PixieDustSeparatorStyle,
} from "./PixieDustSeparator.types";
import styles from "./PixieDustSeparator.module.css";

export function PixieDustSeparator({
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
}: PixieDustSeparatorProps) {
    const colorDefinition = color ? getAtelierAnimationColor(color) : null;
    const resolvedPosition =
        position ??
        (variant === "section" || variant === "fade" ? "start" : "center");
    const separatorStyle: PixieDustSeparatorStyle = {
        ...style,
        ...(colorDefinition
            ? { "--pixie-dust-separator-color": colorDefinition.cssValue }
            : {}),
    };

    return (
        <hr
            {...separatorProps}
            className={`${styles.root} ${styles[variant]} ${styles[intensity]} ${styles[spacing]} ${styles[width]} ${styles[align]} ${styles[`position-${resolvedPosition}`]} ${className}`.trim()}
            style={separatorStyle}
            data-pixie-dust-separator-color={color || "theme"}
            role={decorative ? "presentation" : role}
            aria-hidden={decorative ? true : ariaHidden}
        />
    );
}
