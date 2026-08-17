"use client";

import { useState } from "react";

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
        <div className="border-t border-line bg-canvas">
            <div className="flex items-center justify-between gap-4 border-b border-line px-5 py-3">
                <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted">
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
            <pre className="overflow-x-auto p-5 font-mono text-sm leading-6 text-ink-soft">
                <code>{code}</code>
            </pre>
            <p aria-live="polite" className="px-5 pb-4 text-xs text-muted">
                {copyState === "error"
                    ? "La copie automatique a échoué. Le code peut être sélectionné manuellement."
                    : copyState === "copied"
                      ? "Le code est dans le presse-papiers."
                      : "Les réglages mettent cet exemple à jour en direct."}
            </p>
        </div>
    );
}
