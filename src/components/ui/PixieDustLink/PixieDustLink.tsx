import Link from "next/link";
import { getAtelierAnimationColor } from "@/registry/colors";
import type {
    PixieDustLinkIndicator,
    PixieDustLinkProps,
    PixieDustLinkStyle,
} from "./PixieDustLink.types";
import styles from "./PixieDustLink.module.css";

const indicatorGlyphs = {
    arrow: "→",
    chevron: "›",
    back: "←",
    external: "↗",
    anchor: "↓",
} as const satisfies Record<Exclude<PixieDustLinkIndicator, "none">, string>;

export function PixieDustLink({
    children,
    variant = "inline",
    color = false,
    indicator = "none",
    className = "",
    style,
    ...linkProps
}: PixieDustLinkProps) {
    const colorDefinition = color ? getAtelierAnimationColor(color) : null;
    const linkStyle: PixieDustLinkStyle = {
        ...style,
        ...(colorDefinition
            ? { "--pixie-link-color": colorDefinition.cssValue }
            : {}),
    };
    const indicatorElement =
        indicator === "none" ? null : (
            <span
                aria-hidden="true"
                className={`${styles.indicator} ${indicator === "back" ? styles.indicatorBefore : styles.indicatorAfter}`}
            >
                {indicatorGlyphs[indicator]}
            </span>
        );

    return (
        <Link
            {...linkProps}
            className={`${styles.root} ${styles[variant]} ${className}`.trim()}
            style={linkStyle}
            data-pixie-link-color={color || "inherit"}
            data-pixie-link-indicator={indicator}
        >
            {indicator === "back" ? indicatorElement : null}
            {children}
            {indicator !== "none" && indicator !== "back"
                ? indicatorElement
                : null}
        </Link>
    );
}
