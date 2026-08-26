import { PixieContainer } from "@/components/ui/PixieContainer";
import { PixieStack } from "@/components/ui/PixieStack";
import styles from "./PixieSection.module.css";
import type {
    PixieSectionProps,
    PixieSectionSpacing,
} from "./PixieSection.types";

const spacingStartClasses = {
    none: styles.spacingStartNone,
    sm: styles.spacingStartSmall,
    md: styles.spacingStartMedium,
    lg: styles.spacingStartLarge,
    xl: styles.spacingStartExtraLarge,
} as const satisfies Record<PixieSectionSpacing, string>;

const spacingEndClasses = {
    none: styles.spacingEndNone,
    sm: styles.spacingEndSmall,
    md: styles.spacingEndMedium,
    lg: styles.spacingEndLarge,
    xl: styles.spacingEndExtraLarge,
} as const satisfies Record<PixieSectionSpacing, string>;

export function PixieSection({
    as: Element = "section",
    width = "72",
    gutter = "md",
    spacing = "lg",
    spacingStart,
    spacingEnd,
    gap = "lg",
    align = "stretch",
    className = "",
    children,
    ...elementProps
}: PixieSectionProps) {
    const resolvedSpacingStart = spacingStart ?? spacing;
    const resolvedSpacingEnd = spacingEnd ?? spacing;

    return (
        <Element
            {...elementProps}
            className={`${styles.root} ${spacingStartClasses[resolvedSpacingStart]} ${spacingEndClasses[resolvedSpacingEnd]} ${className}`.trim()}
            data-pixie-section-width={width}
            data-pixie-section-gutter={gutter}
            data-pixie-section-spacing={spacing}
            data-pixie-section-spacing-start={resolvedSpacingStart}
            data-pixie-section-spacing-end={resolvedSpacingEnd}
            data-pixie-section-gap={gap}
            data-pixie-section-align={align}
        >
            <PixieContainer width={width} gutter={gutter}>
                <PixieStack gap={gap} align={align}>
                    {children}
                </PixieStack>
            </PixieContainer>
        </Element>
    );
}
