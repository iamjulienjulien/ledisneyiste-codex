"use client";

import { useRef, useState, type ReactNode } from "react";
import styles from "./AtelierFicheAccessoire.module.css";

type AtelierFicheAccessoireProps = Readonly<{
    id: string;
    labelledBy: string;
    nom: string;
    className?: string;
    header: ReactNode;
    children: ReactNode;
}>;

export function AtelierFicheAccessoire({
    id,
    labelledBy,
    nom,
    className = "",
    header,
    children,
}: AtelierFicheAccessoireProps) {
    const [ouverte, setOuverte] = useState(false);
    const ficheRef = useRef<HTMLElement>(null);
    const toggleRef = useRef<HTMLButtonElement>(null);
    const contenuId = `${id}-contenu`;

    const replier = () => {
        setOuverte(false);
        requestAnimationFrame(() => {
            const mouvementReduit = window.matchMedia(
                "(prefers-reduced-motion: reduce)",
            ).matches;

            ficheRef.current?.scrollIntoView({
                behavior: mouvementReduit ? "auto" : "smooth",
                block: "start",
            });
            toggleRef.current?.focus({ preventScroll: true });
        });
    };

    const basculer = () => {
        if (ouverte) {
            replier();
            return;
        }

        setOuverte(true);
    };

    return (
        <article
            ref={ficheRef}
            id={id}
            aria-labelledby={labelledBy}
            className={`${styles.root} ${className}`.trim()}
        >
            <div className={styles.frame}>
                <header>{header}</header>

                <div
                    id={contenuId}
                    className={styles.content}
                    hidden={!ouverte}
                >
                    <div className={styles.floatingControl}>
                        <button
                            type="button"
                            aria-expanded="true"
                            aria-controls={contenuId}
                            aria-label={`Replier la fiche de ${nom}`}
                            title={`Replier la fiche de ${nom}`}
                            onClick={replier}
                            className={styles.floatingToggle}
                        >
                            <span aria-hidden="true">↑</span>
                        </button>
                    </div>

                    {children}
                </div>

                <button
                    ref={toggleRef}
                    type="button"
                    aria-expanded={ouverte}
                    aria-controls={contenuId}
                    onClick={basculer}
                    className={styles.toggle}
                >
                    <span>
                        {ouverte ? "Replier" : "Ouvrir"} la fiche de {nom}
                    </span>
                    <span aria-hidden="true" className={styles.arrow}>
                        {ouverte ? "↑" : "↓"}
                    </span>
                </button>
            </div>
        </article>
    );
}
