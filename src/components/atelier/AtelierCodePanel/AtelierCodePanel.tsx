"use client";

import { useState } from "react";
import { AtelierCodeBlock } from "@/components/atelier/AtelierCodeBlock";
import styles from "./AtelierCodePanel.module.css";

export function AtelierCodePanel({ code }: Readonly<{ code: string }>) {
    const [copyState, setCopyState] = useState<"idle" | "copied" | "error">(
        "idle",
    );

    async function copyCode() {
        try {
            await navigator.clipboard.writeText(code);
            setCopyState("copied");
        } catch {
            setCopyState("error");
        }
    }

    return (
        <div className={styles.root}>
            <div className="flex items-center justify-between gap-4 border-b border-line px-5 py-3">
                <p className="text-xs font-medium font-eyebrow uppercase tracking-[0.16em] text-muted">
                    Code à copier
                </p>
                <button
                    type="button"
                    onClick={copyCode}
                    className="text-sm font-medium text-accent hover:text-accent-hover"
                >
                    {copyState === "copied" ? "Copié ✓" : "Copier"}
                </button>
            </div>
            <AtelierCodeBlock frame="bare">{code}</AtelierCodeBlock>
            {copyState !== "idle" ? (
                <p aria-live="polite" className="px-5 pb-4 text-xs text-muted">
                    {copyState === "error"
                        ? "La copie automatique a échoué. Le code peut être sélectionné manuellement."
                        : "Le code est dans le presse-papiers."}
                </p>
            ) : null}
        </div>
    );
}
