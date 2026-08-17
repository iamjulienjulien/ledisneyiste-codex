import { getAtelierAnimationColor } from "@/registry/colors";
import { getMetadata } from "@/registry/metadata";
import type {
    PixieDustBadgeCustomProps,
    PixieDustBadgeProps,
    PixieDustBadgeRegistryProps,
    PixieDustBadgeStyle,
} from "./PixieDustBadge.types";
import styles from "./PixieDustBadge.module.css";

function isRegistryBadge(
    props: PixieDustBadgeProps,
): props is PixieDustBadgeRegistryProps {
    return props.registry !== undefined;
}

export function PixieDustBadge(props: PixieDustBadgeProps) {
    const {
        variant = "soft",
        size = "md",
        shape = "rounded",
        icon,
        className = "",
        style,
        ...modeProps
    } = props;
    const registryProps = isRegistryBadge(props) ? props : null;
    const metadata = registryProps ? getMetadata(registryProps) : null;
    const customProps = registryProps
        ? null
        : (modeProps as PixieDustBadgeCustomProps);
    const tone = metadata ? "color" : (customProps?.tone ?? "color");
    const colorSlug = metadata?.color ?? customProps?.color;
    const color = colorSlug ? getAtelierAnimationColor(colorSlug) : null;
    const content = metadata?.label ?? customProps?.children;
    const spanProps = registryProps
        ? Object.fromEntries(
              Object.entries(modeProps).filter(
                  ([key]) =>
                      key !== "registry" &&
                      key !== "collection" &&
                      key !== "slug",
              ),
          )
        : Object.fromEntries(
              Object.entries(modeProps).filter(
                  ([key]) =>
                      key !== "children" && key !== "tone" && key !== "color",
              ),
          );
    const badgeStyle: PixieDustBadgeStyle = {
        ...style,
        ...(color ? { "--pixie-dust-badge-color": color.cssValue } : {}),
        "--pixie-dust-badge-foreground":
            color?.foreground === "light"
                ? "var(--pixie-dust-badge-contrast-light)"
                : "var(--pixie-dust-badge-contrast-dark)",
    };

    return (
        <span
            {...spanProps}
            className={`${styles.root} ${styles[variant]} ${styles[tone]} ${styles[size]} ${styles[shape]} ${className}`.trim()}
            style={badgeStyle}
            data-pixie-dust-badge={
                registryProps
                    ? `${registryProps.registry}.${registryProps.collection}.${registryProps.slug}`
                    : undefined
            }
        >
            {icon ? (
                <span aria-hidden="true" className={styles.icon}>
                    {icon}
                </span>
            ) : null}
            <span className={styles.label}>{content}</span>
        </span>
    );
}
