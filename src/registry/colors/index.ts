import { colorsAtelierAnimation } from "./colors-atelier-animation";
import type { AtelierAnimationColorSlug } from "@/types/colors";

export { colorsAtelierAnimation };

export function getAtelierAnimationColor<
    Slug extends AtelierAnimationColorSlug,
>(slug: Slug) {
    return colorsAtelierAnimation[slug];
}

export function getAtelierAnimationColorSlugs() {
    return Object.keys(colorsAtelierAnimation) as AtelierAnimationColorSlug[];
}

export type {
    AtelierAnimationColorSlug,
    ColorDefinition,
    ColorForeground,
} from "@/types/colors";
