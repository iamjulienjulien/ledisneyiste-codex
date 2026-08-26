import { PixieContainer } from "@/components/ui/PixieContainer";
import { PixieDustStack } from "@/components/ui/PixieDustStack";
import styles from "./PixieDustSection.module.css";
import type {
    PixieDustSectionProps,
    PixieDustSectionSpacing,
} from "./PixieDustSection.types";

const spacingClasses = {
    none: styles.spacingNone,
    sm: styles.spacingSmall,
    md: styles.spacingMedium,
    lg: styles.spacingLarge,
    xl: styles.spacingExtraLarge,
} as const satisfies Record<PixieDustSectionSpacing, string>;

export function PixieDustSection({
    as: Element = "section",
    width = "72",
    gutter = "md",
    spacing = "lg",
    gap = "lg",
    align = "stretch",
    className = "",
    children,
    ...elementProps
}: PixieDustSectionProps) {
    return (
        <Element
            {...elementProps}
            className={`${styles.root} ${spacingClasses[spacing]} ${className}`.trim()}
            data-pixie-section-width={width}
            data-pixie-section-gutter={gutter}
            data-pixie-section-spacing={spacing}
            data-pixie-section-gap={gap}
            data-pixie-section-align={align}
        >
            <PixieContainer width={width} gutter={gutter}>
                <PixieDustStack gap={gap} align={align}>
                    {children}
                </PixieDustStack>
            </PixieContainer>
        </Element>
    );
}
