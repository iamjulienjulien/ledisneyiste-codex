import type { Metadata } from "next";
import { CodexFooter } from "@/components/codex/CodexFooter";
import { CodexCreateurCard } from "@/components/codex/CodexCreateurCard";
import { CodexEpoqueCard } from "@/components/codex/CodexEpoqueCard";
import { CodexOeuvreCard } from "@/components/codex/CodexOeuvreCard";
import { CodexPersonnageCard } from "@/components/codex/CodexPersonnageCard";
import { PixieBackdrop } from "@/components/ui/PixieBackdrop";
import { PixieBadge } from "@/components/ui/PixieBadge";
import { PixieButton } from "@/components/ui/PixieButton";
import { PixieCallout } from "@/components/ui/PixieCallout";
import { PixieCluster } from "@/components/ui/PixieCluster";
import { PixieFrame } from "@/components/ui/PixieFrame";
import { PixieGrid } from "@/components/ui/PixieGrid";
import { PixiePanel } from "@/components/ui/PixiePanel";
import { PixieSection } from "@/components/ui/PixieSection";
import { PixieSeparator } from "@/components/ui/PixieSeparator";
import { PixieStack } from "@/components/ui/PixieStack";
import { PixieSymbol } from "@/components/ui/PixieSymbol";
import { getFicheContributeurBySlug } from "@/data/contributeurs";
import { getFicheEpoqueBySlug } from "@/data/epoques";
import {
    getContributeursDeLEpoque,
    getEpoquesPourContributeur,
    getOeuvresDeLEpoque,
    getPersonnagesDeLEpoque,
} from "@/data/epoques/relations";
import { getFicheOeuvreBySlug } from "@/data/oeuvres";
import { getFichePersonnageBySlug } from "@/data/personnages";
import {
    getRecompensesPourContributeur,
    getRecompensesPourOeuvre,
} from "@/data/recompenses/relations";
import { rechercherDansCatalogues } from "@/lib/recherche";
import styles from "./RecherchePage.module.css";

export const metadata: Metadata = {
    title: "Recherche",
    description:
        "Rechercher une œuvre, un personnage, un créateur ou une époque dans le Codex du Disneyiste.",
};

export default async function RecherchePage({
    searchParams,
}: PageProps<"/recherche">) {
    const { q } = await searchParams;
    const requete = (Array.isArray(q) ? q[0] : q)?.trim() ?? "";
    const resultats = rechercherDansCatalogues(requete);
    const rechercheLancee = requete.length > 0;

    return (
        <main className={styles.root}>
            <PixieBackdrop
                as="header"
                variant="projector"
                intensity="subtle"
                position="top-end"
                direction="diagonal-down"
                spread="wide"
                padding="none"
                color="ambre-projecteur"
                base="transparent"
                texture="grain"
                textureIntensity="subtle"
            >
                <PixieSection
                    as="div"
                    width="72"
                    gutter="md"
                    spacingStart="lg"
                    spacingEnd="md"
                    gap="none"
                >
                    <PixieCluster
                        gap="lg"
                        align="center"
                        className={styles.hero}
                    >
                        <PixieFrame
                            as="div"
                            variant="cel"
                            aspect="square"
                            padding="sm"
                            radius="medium"
                            color="ambre-projecteur"
                            elevation="soft"
                            effect="projector"
                            intensity="subtle"
                            className={styles.heroSymbol}
                        >
                            <PixieSymbol
                                registry="general"
                                collection="cinema"
                                slug="projecteur-cinema"
                                size="xl"
                            />
                        </PixieFrame>

                        <PixieStack gap="sm" className={styles.heroHeading}>
                            <p className={styles.eyebrow}>
                                Explorer toutes les archives
                            </p>
                            <h1 className={styles.title}>Recherche</h1>
                            <p className={styles.introduction}>
                                Retrouvez un nom, un titre, une catégorie, un
                                rôle ou une collection parmi les quatre familles
                                du Codex.
                            </p>
                        </PixieStack>
                    </PixieCluster>
                </PixieSection>
            </PixieBackdrop>

            <PixieSection
                as="div"
                width="72"
                gutter="md"
                spacingStart="md"
                spacingEnd="xl"
                gap="xl"
            >
                <PixiePanel
                    as="section"
                    aria-labelledby="recherche-form-title"
                    variant="tinted"
                    padding="lg"
                    radius="large"
                    color="ambre-projecteur"
                    elevation="soft"
                    className={styles.searchPanel}
                >
                    <form action="/recherche" method="get" role="search">
                        <PixieStack gap="md">
                            <PixieStack gap="xs">
                                <p className={styles.formEyebrow}>
                                    Régie de recherche
                                </p>
                                <h2
                                    id="recherche-form-title"
                                    className={styles.formTitle}
                                >
                                    Quel sujet souhaitez-vous éclairer ?
                                </h2>
                            </PixieStack>

                            <label
                                htmlFor="recherche-q"
                                className={styles.label}
                            >
                                Mots-clés
                            </label>

                            <div className={styles.searchControls}>
                                <input
                                    id="recherche-q"
                                    name="q"
                                    type="search"
                                    defaultValue={requete}
                                    placeholder="Mickey, animateur, Silly Symphonies…"
                                    autoComplete="off"
                                    enterKeyHint="search"
                                    aria-describedby="recherche-aide"
                                    className={styles.input}
                                />

                                <PixieButton
                                    type="submit"
                                    size="lg"
                                    color="ambre-projecteur"
                                    className={styles.searchButton}
                                >
                                    Lancer la recherche
                                </PixieButton>
                            </div>

                            <p id="recherche-aide" className={styles.helper}>
                                Accents et majuscules sont ignorés. Tous les
                                mots saisis doivent apparaître dans la même
                                archive.
                            </p>
                        </PixieStack>
                    </form>
                </PixiePanel>

                <PixieSeparator
                    variant="beam"
                    intensity="strong"
                    color="ambre-projecteur"
                    spacing="none"
                    decorative
                />

                {!rechercheLancee ? (
                    <PixieCallout
                        as="section"
                        aria-labelledby="attente-title"
                        variant="subtle"
                        layout="inline"
                        padding="lg"
                        radius="large"
                        color="ambre-projecteur"
                        effect="halo"
                        effectIntensity="subtle"
                        icon={
                            <PixieSymbol
                                registry="general"
                                collection="cinema"
                                slug="bobine"
                                size="lg"
                            />
                        }
                        eyebrow="Table de recherche"
                        heading={
                            <h2 id="attente-title">
                                Le projecteur attend son sujet
                            </h2>
                        }
                        className={styles.state}
                    >
                        <p>
                            Saisissez quelques mots pour faire apparaître les
                            personnages, créateurs, œuvres et époques qui leur
                            correspondent.
                        </p>
                    </PixieCallout>
                ) : resultats.total === 0 ? (
                    <PixieCallout
                        as="section"
                        aria-labelledby="vide-title"
                        role="status"
                        variant="tinted"
                        layout="inline"
                        padding="lg"
                        radius="large"
                        color="corail-cel"
                        effect="grain"
                        effectIntensity="subtle"
                        icon={
                            <PixieSymbol
                                registry="general"
                                collection="cinema"
                                slug="clap"
                                size="lg"
                            />
                        }
                        eyebrow="Aucun raccord trouvé"
                        heading={
                            <h2 id="vide-title">
                                Aucune archive pour « {requete} »
                            </h2>
                        }
                        className={styles.state}
                    >
                        <p>
                            Essayez un nom, un titre ou un terme plus général,
                            puis relancez la recherche.
                        </p>
                    </PixieCallout>
                ) : (
                    <PixieStack gap="xl">
                        <PixiePanel
                            as="div"
                            role="status"
                            aria-live="polite"
                            aria-atomic="true"
                            variant="outline"
                            padding="sm"
                            radius="medium"
                            color="ambre-projecteur"
                        >
                            <PixieCluster
                                gap="sm"
                                justify="between"
                                align="center"
                            >
                                <div>
                                    <p className={styles.summaryEyebrow}>
                                        Résultats projetés
                                    </p>
                                    <p className={styles.summaryQuery}>
                                        « {requete} »
                                    </p>
                                </div>

                                <PixieBadge
                                    variant="soft"
                                    size="sm"
                                    shape="pill"
                                    color="ambre-projecteur"
                                >
                                    {resultats.total} résultat
                                    {resultats.total > 1 ? "s" : ""}
                                </PixieBadge>
                            </PixieCluster>
                        </PixiePanel>

                        <div className={styles.resultGroups}>
                            {resultats.personnages.length > 0 ? (
                                <section
                                    aria-labelledby="resultats-personnages"
                                    className={styles.resultSection}
                                    data-family="personnages"
                                >
                                    <PixieCluster
                                        gap="md"
                                        align="center"
                                        className={styles.resultHeader}
                                    >
                                        <PixieFrame
                                            as="div"
                                            variant="cel"
                                            aspect="square"
                                            padding="xs"
                                            radius="medium"
                                            color="rouge-crayon"
                                            className={styles.resultSymbol}
                                        >
                                            <PixieSymbol
                                                registry="codex"
                                                collection="index"
                                                slug="personnages"
                                                size="md"
                                            />
                                        </PixieFrame>

                                        <PixieStack gap="xs">
                                            <PixieBadge
                                                variant="soft"
                                                size="xs"
                                                shape="pill"
                                                color="rouge-crayon"
                                            >
                                                {resultats.personnages.length}{" "}
                                                résultat
                                                {resultats.personnages.length >
                                                1
                                                    ? "s"
                                                    : ""}
                                            </PixieBadge>
                                            <h2
                                                id="resultats-personnages"
                                                className={styles.resultTitle}
                                            >
                                                Personnages
                                            </h2>
                                        </PixieStack>
                                    </PixieCluster>

                                    <PixieGrid
                                        as="ul"
                                        maxColumns={2}
                                        minItemWidth="lg"
                                        gap="lg"
                                        className={styles.resultCards}
                                    >
                                        {resultats.personnages.map(
                                            (personnage) => {
                                                const fiche =
                                                    getFichePersonnageBySlug(
                                                        personnage.slug,
                                                    );

                                                return fiche ? (
                                                    <li key={personnage.slug}>
                                                        <CodexPersonnageCard
                                                            personnage={
                                                                personnage
                                                            }
                                                            fiche={fiche}
                                                        />
                                                    </li>
                                                ) : null;
                                            },
                                        )}
                                    </PixieGrid>
                                </section>
                            ) : null}

                            {resultats.contributeurs.length > 0 ? (
                                <section
                                    aria-labelledby="resultats-createurs"
                                    className={styles.resultSection}
                                    data-family="createurs"
                                >
                                    <PixieCluster
                                        gap="md"
                                        align="center"
                                        className={styles.resultHeader}
                                    >
                                        <PixieFrame
                                            as="div"
                                            variant="cel"
                                            aspect="square"
                                            padding="xs"
                                            radius="medium"
                                            color="jaune-lampe"
                                            className={styles.resultSymbol}
                                        >
                                            <PixieSymbol
                                                registry="codex"
                                                collection="index"
                                                slug="createurs"
                                                size="md"
                                            />
                                        </PixieFrame>

                                        <PixieStack gap="xs">
                                            <PixieBadge
                                                variant="soft"
                                                size="xs"
                                                shape="pill"
                                                color="jaune-lampe"
                                            >
                                                {resultats.contributeurs.length}{" "}
                                                résultat
                                                {resultats.contributeurs
                                                    .length > 1
                                                    ? "s"
                                                    : ""}
                                            </PixieBadge>
                                            <h2
                                                id="resultats-createurs"
                                                className={styles.resultTitle}
                                            >
                                                Créateurs
                                            </h2>
                                        </PixieStack>
                                    </PixieCluster>

                                    <PixieGrid
                                        as="ul"
                                        maxColumns={2}
                                        minItemWidth="lg"
                                        gap="lg"
                                        className={styles.resultCards}
                                    >
                                        {resultats.contributeurs.map(
                                            (contributeur) => {
                                                const fiche =
                                                    getFicheContributeurBySlug(
                                                        contributeur.slug,
                                                    );

                                                return fiche ? (
                                                    <li key={contributeur.slug}>
                                                        <CodexCreateurCard
                                                            contributeur={
                                                                contributeur
                                                            }
                                                            fiche={fiche}
                                                            epoques={getEpoquesPourContributeur(
                                                                contributeur.slug,
                                                            )}
                                                            recompenses={getRecompensesPourContributeur(
                                                                contributeur.slug,
                                                            )}
                                                        />
                                                    </li>
                                                ) : null;
                                            },
                                        )}
                                    </PixieGrid>
                                </section>
                            ) : null}

                            {resultats.oeuvres.length > 0 ? (
                                <section
                                    aria-labelledby="resultats-oeuvres"
                                    className={styles.resultSection}
                                    data-family="oeuvres"
                                >
                                    <PixieCluster
                                        gap="md"
                                        align="center"
                                        className={styles.resultHeader}
                                    >
                                        <PixieFrame
                                            as="div"
                                            variant="cel"
                                            aspect="square"
                                            padding="xs"
                                            radius="medium"
                                            color="gouache"
                                            className={styles.resultSymbol}
                                        >
                                            <PixieSymbol
                                                registry="codex"
                                                collection="index"
                                                slug="oeuvres"
                                                size="md"
                                            />
                                        </PixieFrame>

                                        <PixieStack gap="xs">
                                            <PixieBadge
                                                variant="soft"
                                                size="xs"
                                                shape="pill"
                                                color="gouache"
                                            >
                                                {resultats.oeuvres.length}{" "}
                                                résultat
                                                {resultats.oeuvres.length > 1
                                                    ? "s"
                                                    : ""}
                                            </PixieBadge>
                                            <h2
                                                id="resultats-oeuvres"
                                                className={styles.resultTitle}
                                            >
                                                Œuvres
                                            </h2>
                                        </PixieStack>
                                    </PixieCluster>

                                    <PixieGrid
                                        as="ul"
                                        maxColumns={2}
                                        minItemWidth="lg"
                                        gap="lg"
                                        className={styles.resultCards}
                                    >
                                        {resultats.oeuvres.map((oeuvre) => {
                                            const fiche = getFicheOeuvreBySlug(
                                                oeuvre.slug,
                                            );

                                            return fiche ? (
                                                <li key={oeuvre.slug}>
                                                    <CodexOeuvreCard
                                                        oeuvre={oeuvre}
                                                        fiche={fiche}
                                                        recompenses={getRecompensesPourOeuvre(
                                                            oeuvre.slug,
                                                        )}
                                                    />
                                                </li>
                                            ) : null;
                                        })}
                                    </PixieGrid>
                                </section>
                            ) : null}

                            {resultats.epoques.length > 0 ? (
                                <section
                                    aria-labelledby="resultats-epoques"
                                    className={styles.resultSection}
                                    data-family="epoques"
                                >
                                    <PixieCluster
                                        gap="md"
                                        align="center"
                                        className={styles.resultHeader}
                                    >
                                        <PixieFrame
                                            as="div"
                                            variant="cel"
                                            aspect="square"
                                            padding="xs"
                                            radius="medium"
                                            color="vert-cellulo"
                                            className={styles.resultSymbol}
                                        >
                                            <PixieSymbol
                                                registry="codex"
                                                collection="index"
                                                slug="epoques"
                                                size="md"
                                            />
                                        </PixieFrame>

                                        <PixieStack gap="xs">
                                            <PixieBadge
                                                variant="soft"
                                                size="xs"
                                                shape="pill"
                                                color="vert-cellulo"
                                            >
                                                {resultats.epoques.length}{" "}
                                                résultat
                                                {resultats.epoques.length > 1
                                                    ? "s"
                                                    : ""}
                                            </PixieBadge>
                                            <h2
                                                id="resultats-epoques"
                                                className={styles.resultTitle}
                                            >
                                                Époques
                                            </h2>
                                        </PixieStack>
                                    </PixieCluster>

                                    <PixieGrid
                                        as="ul"
                                        maxColumns={2}
                                        minItemWidth="lg"
                                        gap="lg"
                                        className={styles.resultCards}
                                    >
                                        {resultats.epoques.map((epoque) => {
                                            const fiche = getFicheEpoqueBySlug(
                                                epoque.slug,
                                            );

                                            return fiche ? (
                                                <li key={epoque.slug}>
                                                    <CodexEpoqueCard
                                                        epoque={epoque}
                                                        fiche={fiche}
                                                        nombres={{
                                                            oeuvres:
                                                                getOeuvresDeLEpoque(
                                                                    epoque.slug,
                                                                ).length,
                                                            personnages:
                                                                getPersonnagesDeLEpoque(
                                                                    epoque.slug,
                                                                ).length,
                                                            createurs:
                                                                getContributeursDeLEpoque(
                                                                    epoque.slug,
                                                                ).length,
                                                        }}
                                                    />
                                                </li>
                                            ) : null;
                                        })}
                                    </PixieGrid>
                                </section>
                            ) : null}
                        </div>
                    </PixieStack>
                )}
            </PixieSection>

            <CodexFooter />
        </main>
    );
}
