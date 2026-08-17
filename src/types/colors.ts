import type { colorsAtelierAnimation } from "@/registry/colors";

export type ColorForeground = "light" | "dark";

export type ColorDefinition = Readonly<{
    label: string;
    token: `--${string}`;
    value: `#${string}`;
    cssValue: `var(--${string})`;
    foreground: ColorForeground;
}>;

export type AtelierAnimationColorSlug = keyof typeof colorsAtelierAnimation;

export type CouleurReference = Readonly<{
    nom: string;
    token: `--${string}`;
    valeur: `#${string}`;
    encre: "claire" | "sombre";
}>;
