"use client";

import { useState, type ReactNode } from "react";
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
    const contenuId = `${id}-contenu`;

    return (
        <article
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
                    {children}
                </div>

                <button
                    type="button"
                    aria-expanded={ouverte}
                    aria-controls={contenuId}
                    onClick={() => setOuverte((etat) => !etat)}
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
