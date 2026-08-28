import type { ReactNode } from "react";

export type AtelierLumiere = "sombre" | "claire";
export type AtelierCadre = "compact" | "moyen" | "large";

export type AtelierProjectionContextValue = Readonly<{
    lumiere: AtelierLumiere;
    setLumiere: (lumiere: AtelierLumiere) => void;
    cadre: AtelierCadre;
    setCadre: (cadre: AtelierCadre) => void;
}>;

export type AtelierProjectionProviderProps = Readonly<{
    children: ReactNode;
    className?: string;
}>;

export type AtelierPlaygroundProjectionProps = Readonly<{
    children: ReactNode;
    className?: string;
}>;
