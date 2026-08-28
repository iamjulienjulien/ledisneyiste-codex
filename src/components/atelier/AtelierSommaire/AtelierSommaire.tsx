"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { AtelierSommaireProps } from "./AtelierSommaire.types";
import styles from "./AtelierSommaire.module.css";

function idDepuisHref(href: `#${string}`) {
    return href.slice(1);
}

export function AtelierSommaire({ plateaux }: AtelierSommaireProps) {
    const liens = useMemo(
        () =>
            plateaux.flatMap((plateau) => [
                { href: plateau.href, plateau: plateau.href },
                ...plateau.items.map((item) => ({
                    href: item.href,
                    plateau: plateau.href,
                })),
            ]),
        [plateaux],
    );
    const [actif, setActif] = useState(() =>
        plateaux[0] ? idDepuisHref(plateaux[0].href) : "",
    );
    const [progression, setProgression] = useState(0);
    const [ouvert, setOuvert] = useState(false);
    const boutonRef = useRef<HTMLButtonElement>(null);

    const plateauActif =
        liens.find(({ href }) => idDepuisHref(href) === actif)?.plateau ??
        plateaux[0]?.href;

    useEffect(() => {
        let frame = 0;

        const actualiser = () => {
            frame = 0;
            const repere = window.innerHeight * 0.3;
            let prochainActif = liens[0] ? idDepuisHref(liens[0].href) : "";

            for (const lien of liens) {
                const element = document.getElementById(
                    idDepuisHref(lien.href),
                );

                if (!element) {
                    continue;
                }

                if (element.getBoundingClientRect().top <= repere) {
                    prochainActif = element.id;
                    continue;
                }

                break;
            }

            setActif(prochainActif);

            const premier = liens[0]
                ? document.getElementById(idDepuisHref(liens[0].href))
                : null;
            const dernier = liens.at(-1)
                ? document.getElementById(idDepuisHref(liens.at(-1)!.href))
                : null;

            if (!premier || !dernier) {
                setProgression(0);
                return;
            }

            const debut = window.scrollY + premier.getBoundingClientRect().top;
            const fin = Math.max(
                debut + 1,
                window.scrollY +
                    dernier.getBoundingClientRect().bottom -
                    window.innerHeight,
            );
            const ratio = (window.scrollY - debut) / (fin - debut);

            setProgression(Math.min(1, Math.max(0, ratio)));
        };

        const programmer = () => {
            if (frame) {
                return;
            }

            frame = window.requestAnimationFrame(actualiser);
        };

        const observateur = new IntersectionObserver(programmer, {
            rootMargin: "-20% 0px -70% 0px",
        });

        for (const lien of liens) {
            const element = document.getElementById(idDepuisHref(lien.href));

            if (element) {
                observateur.observe(element);
            }
        }

        actualiser();
        window.addEventListener("scroll", programmer, { passive: true });
        window.addEventListener("resize", programmer);

        return () => {
            observateur.disconnect();
            window.removeEventListener("scroll", programmer);
            window.removeEventListener("resize", programmer);

            if (frame) {
                window.cancelAnimationFrame(frame);
            }
        };
    }, [liens]);

    useEffect(() => {
        if (!ouvert) {
            return;
        }

        const fermerAvecEchap = (event: KeyboardEvent) => {
            if (event.key !== "Escape") {
                return;
            }

            setOuvert(false);
            boutonRef.current?.focus();
        };

        window.addEventListener("keydown", fermerAvecEchap);
        return () => window.removeEventListener("keydown", fermerAvecEchap);
    }, [ouvert]);

    return (
        <aside
            className={styles.root}
            data-open={ouvert || undefined}
            aria-label="Conducteur de l’Atelier"
        >
            <button
                ref={boutonRef}
                type="button"
                className={styles.trigger}
                aria-expanded={ouvert}
                aria-controls="atelier-sommaire-panel"
                onClick={() => setOuvert((etat) => !etat)}
            >
                <span aria-hidden="true" className={styles.triggerArrow}>
                    {ouvert ? "→" : "←"}
                </span>
                <span className={styles.triggerLabel}>Sommaire</span>
            </button>

            <div id="atelier-sommaire-panel" className={styles.panel}>
                <div className={styles.progressTrack} aria-hidden="true">
                    <span
                        className={styles.progressBar}
                        style={{ height: `${progression * 100}%` }}
                    />
                </div>

                <header className={styles.header}>
                    <p className={styles.eyebrow}>Le conducteur</p>
                    <div className={styles.titleRow}>
                        <h2 className={styles.title}>Sommaire</h2>
                        <span className={styles.percentage}>
                            {Math.round(progression * 100)} %
                        </span>
                    </div>
                </header>

                <nav
                    aria-label="Sommaire de l’Atelier"
                    className={styles.navigation}
                >
                    <ol className={styles.plateaux}>
                        {plateaux.map((plateau) => {
                            const idPlateau = idDepuisHref(plateau.href);
                            const estActif = plateau.href === plateauActif;

                            return (
                                <li key={plateau.href}>
                                    <a
                                        href={plateau.href}
                                        className={styles.plateauLink}
                                        data-active={estActif || undefined}
                                        aria-current={
                                            actif === idPlateau
                                                ? "location"
                                                : undefined
                                        }
                                        onClick={() => setOuvert(false)}
                                    >
                                        <span className={styles.numero}>
                                            {plateau.numero}
                                        </span>
                                        <span>{plateau.nom}</span>
                                    </a>

                                    {estActif && plateau.items.length > 0 ? (
                                        <ul className={styles.items}>
                                            {plateau.items.map((item) => {
                                                const idItem = idDepuisHref(
                                                    item.href,
                                                );
                                                const itemActif =
                                                    actif === idItem;

                                                return (
                                                    <li key={item.href}>
                                                        <a
                                                            href={item.href}
                                                            className={
                                                                styles.itemLink
                                                            }
                                                            data-active={
                                                                itemActif ||
                                                                undefined
                                                            }
                                                            data-draft={
                                                                item.nom.startsWith(
                                                                    "PixieDust",
                                                                ) || undefined
                                                            }
                                                            aria-current={
                                                                itemActif
                                                                    ? "location"
                                                                    : undefined
                                                            }
                                                            onClick={() =>
                                                                setOuvert(false)
                                                            }
                                                        >
                                                            {item.nom}
                                                        </a>
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                    ) : null}
                                </li>
                            );
                        })}
                    </ol>
                </nav>
            </div>
        </aside>
    );
}
