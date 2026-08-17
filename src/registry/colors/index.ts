import { colorsAtelierAnimation } from "./colors-atelier-animation";
import type { AtelierAnimationColorSlug } from "@/types/colors";

export { colorsAtelierAnimation };

export function getAtelierAnimationColor<
    Slug extends AtelierAnimationColorSlug,
>(slug: Slug) {
    return colorsAtelierAnimation[slug];
}

export function getAtelierAnimationColorStyle<
    Slug extends AtelierAnimationColorSlug,
>(slug: Slug) {
    const color = getAtelierAnimationColor(slug);

    return {
        accent: color.cssValue,
        foreground: color.foreground,
    } as const;
}

export type {
    AtelierAnimationColorSlug,
    ColorDefinition,
    ColorForeground,
} from "@/types/colors";
