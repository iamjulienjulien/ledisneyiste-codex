"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import styles from "./AtelierFicheAccessoire.module.css";

type AtelierFicheAccessoireProps = Readonly<{
    id: string;
    labelledBy: string;
    nom: string;
    className?: string;
    header: ReactNode;
    children: ReactNode;
}>;

const abonnementsAncre = new Set<() => void>();

function notifierChangementAncre() {
    for (const abonnement of abonnementsAncre) {
        abonnement();
    }
}

function abonnerAuChangementAncre(abonnement: () => void) {
    if (abonnementsAncre.size === 0) {
        window.addEventListener("hashchange", notifierChangementAncre);
    }

    abonnementsAncre.add(abonnement);

    return () => {
        abonnementsAncre.delete(abonnement);

        if (abonnementsAncre.size === 0) {
            window.removeEventListener("hashchange", notifierChangementAncre);
        }
    };
}

function lireAncreCourante() {
    const ancre = window.location.hash.slice(1);

    try {
        return decodeURIComponent(ancre);
    } catch {
        return ancre;
    }
}

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
    const ancreEnAttenteRef = useRef<string | null>(null);
    const contenuId = `${id}-contenu`;

    useEffect(() => {
        const ouvrirDepuisAncre = () => {
            const ancre = lireAncreCourante();

            if (!ancre) {
                return;
            }

            const fiche = ficheRef.current;
            const cible = document.getElementById(ancre);
            const appartientALaFiche =
                ancre === id || Boolean(cible && fiche?.contains(cible));

            if (!appartientALaFiche) {
                return;
            }

            ancreEnAttenteRef.current = ancre;
            setOuverte(true);
        };

        ouvrirDepuisAncre();
        return abonnerAuChangementAncre(ouvrirDepuisAncre);
    }, [id]);

    useEffect(() => {
        const ancre = ancreEnAttenteRef.current;

        if (!ouverte || !ancre) {
            return;
        }

        ancreEnAttenteRef.current = null;
        const frame = window.requestAnimationFrame(() => {
            document.getElementById(ancre)?.scrollIntoView({
                behavior: "auto",
                block: "start",
            });
        });

        return () => window.cancelAnimationFrame(frame);
    }, [ouverte]);

    const replier = () => {
        const ancre = lireAncreCourante();
        const cible = ancre ? document.getElementById(ancre) : null;

        if (
            ancre === id ||
            Boolean(cible && ficheRef.current?.contains(cible))
        ) {
            window.history.replaceState(
                null,
                "",
                `${window.location.pathname}${window.location.search}`,
            );
        }

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
