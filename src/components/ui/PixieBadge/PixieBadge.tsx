import { getAtelierAnimationColor } from "@/registry/colors";
import { getMetadata } from "@/registry/metadata";
import type {
    PixieBadgeCustomProps,
    PixieBadgeProps,
    PixieBadgeRegistryProps,
    PixieBadgeStyle,
} from "./PixieBadge.types";
import styles from "./PixieBadge.module.css";

function isRegistryBadge(
    props: PixieBadgeProps,
): props is PixieBadgeRegistryProps {
    return props.registry !== undefined;
}

export function PixieBadge(props: PixieBadgeProps) {
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
        : (modeProps as PixieBadgeCustomProps);
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
    const badgeStyle: PixieBadgeStyle = {
        ...style,
        ...(color ? { "--pixie-badge-color": color.cssValue } : {}),
        "--pixie-badge-foreground":
            color?.foreground === "light"
                ? "var(--pixie-badge-contrast-light)"
                : "var(--pixie-badge-contrast-dark)",
    };

    return (
        <span
            {...spanProps}
            className={`${styles.root} ${styles[variant]} ${styles[tone]} ${styles[size]} ${styles[shape]} ${className}`.trim()}
            style={badgeStyle}
            data-pixie-badge={
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
