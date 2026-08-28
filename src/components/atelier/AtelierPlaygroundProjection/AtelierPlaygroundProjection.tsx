"use client";

import { createContext, useContext, useMemo, useState } from "react";
import type {
    AtelierCadre,
    AtelierLumiere,
    AtelierPlaygroundProjectionProps,
    AtelierProjectionContextValue,
    AtelierProjectionProviderProps,
} from "./AtelierPlaygroundProjection.types";
import styles from "./AtelierPlaygroundProjection.module.css";

const AtelierProjectionContext =
    createContext<AtelierProjectionContextValue | null>(null);

export function AtelierProjectionProvider({
    children,
    className,
}: AtelierProjectionProviderProps) {
    const [lumiere, setLumiere] = useState<AtelierLumiere>("sombre");
    const [cadre, setCadre] = useState<AtelierCadre>("moyen");
    const value = useMemo(
        () => ({ lumiere, setLumiere, cadre, setCadre }),
        [lumiere, cadre],
    );

    return (
        <AtelierProjectionContext.Provider value={value}>
            <div className={className}>{children}</div>
        </AtelierProjectionContext.Provider>
    );
}

export function useAtelierProjection() {
    const context = useContext(AtelierProjectionContext);

    if (!context) {
        throw new Error(
            "useAtelierProjection doit être utilisé dans AtelierProjectionProvider.",
        );
    }

    return context;
}

export function AtelierPlaygroundProjection({
    children,
    className,
}: AtelierPlaygroundProjectionProps) {
    const { cadre } = useAtelierProjection();

    return (
        <div
            className={[styles.root, className].filter(Boolean).join(" ")}
            data-cadre={cadre}
        >
            {children}
        </div>
    );
}
