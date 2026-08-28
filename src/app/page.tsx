import { PixieBackdrop } from "@/components/ui/PixieBackdrop";
import { PixieBadge } from "@/components/ui/PixieBadge";
import { PixieCard } from "@/components/ui/PixieCard";
import { PixieCluster } from "@/components/ui/PixieCluster";
import { PixieFrame } from "@/components/ui/PixieFrame";
import { PixieGrid } from "@/components/ui/PixieGrid";
import { PixieLink } from "@/components/ui/PixieLink";
import { PixieSeparator } from "@/components/ui/PixieSeparator";
import { PixieStack } from "@/components/ui/PixieStack";
import { PixieSymbol } from "@/components/ui/PixieSymbol";
import {
    contributeurs,
    oeuvres,
    personnages,
    epoques,
} from "@/data/catalogues";

const codexDoors = [
    {
        href: "/personnages",
        color: "rouge-crayon",
        symbol: "personnages",
        count: personnages.length,
        singular: "personnage",
        plural: "personnages",
        title: "Personnages",
        description:
            "Les figures fictives qui peuplent les récits et les imaginaires Disney.",
        action: "Explorer les personnages",
    },
    {
        href: "/contributeurs",
        color: "jaune-lampe",
        symbol: "createurs",
        count: contributeurs.length,
        singular: "créateur",
        plural: "créateurs",
        title: "Créateurs",
        description:
            "Celles et ceux qui ont imaginé, construit et transformé Disney.",
        action: "Explorer les créateurs",
    },
    {
        href: "/oeuvres",
        color: "gouache",
        symbol: "oeuvres",
        count: oeuvres.length,
        singular: "œuvre",
        plural: "œuvres",
        title: "Œuvres",
        description:
            "Les films, courts métrages et créations où les imaginaires Disney prennent forme.",
        action: "Explorer les œuvres",
    },
    {
        href: "/epoques",
        color: "vert-cellulo",
        symbol: "epoques",
        count: epoques.length,
        singular: "époque",
        plural: "époques",
        title: "Époques",
        description:
            "Les grandes périodes qui permettent de suivre les transformations de Disney dans le temps.",
        action: "Explorer les époques",
    },
] as const;

export default function Home() {
    return (
        <main className="mx-auto w-full max-w-6xl px-6 py-16 sm:py-24">
            <PixieCard asChild variant="elevated" padding="none" radius="large">
                <header className="overflow-hidden">
                    <PixieBackdrop
                        variant="projector"
                        intensity="medium"
                        position="top-end"
                        direction="diagonal-down"
                        spread="wide"
                        padding="none"
                        radius="large"
                        base="surface"
                        texture="grain"
                        textureIntensity="subtle"
                        motion="breathe"
                    >
                        <div className="px-6 py-10 sm:px-10 sm:py-14 lg:px-14 lg:py-16">
                            <p className="text-sm font-medium font-eyebrow uppercase tracking-[0.24em] text-muted">
                                Le Disneyiste
                            </p>

                            <h1 className="mt-4 font-brand text-5xl text-ink sm:text-7xl">
                                Le Codex du Disneyiste
                            </h1>

                            <p className="mt-6 font-display text-xl leading-9 text-ink-soft sm:text-2xl">
                                Un atlas éditorial pour explorer, relier et
                                raconter les imaginaires Disney.
                            </p>

                            <p className="mt-8 max-w-3xl text-lg leading-8 text-ink-soft">
                                Œuvres, personnages et créateurs se croisent ici
                                pour documenter Disney comme phénomène culturel,
                                mémoire collective et fabrique d’imaginaires.
                            </p>
                        </div>
                    </PixieBackdrop>
                </header>
            </PixieCard>

            <PixieBackdrop
                as="section"
                aria-labelledby="explorer-title"
                variant="gradient"
                intensity="subtle"
                position="center"
                spread="wide"
                padding="lg"
                radius="large"
                base="transparent"
                className="mt-20"
            >
                <PixieStack gap="lg">
                    <PixieStack gap="sm" className="max-w-3xl">
                        <p className="text-sm font-medium font-eyebrow uppercase tracking-[0.2em] text-muted">
                            Explorer
                        </p>

                        <h2 id="explorer-title" className="text-3xl text-ink">
                            Quatre portes vers le Codex
                        </h2>

                        <p className="text-lg leading-8 text-ink-soft">
                            Entrer par les figures de fiction, celles et ceux
                            qui les ont façonnées, les œuvres où leurs histoires
                            prennent vie, ou les époques qui les replacent dans
                            le temps.
                        </p>
                    </PixieStack>

                    <PixieGrid
                        as="ul"
                        maxColumns={4}
                        minItemWidth="sm"
                        gap="md"
                    >
                        {codexDoors.map((door) => (
                            <li key={door.href} className="h-full">
                                <PixieCard
                                    asChild
                                    variant="accent"
                                    color={door.color}
                                    padding="md"
                                    radius="large"
                                    accentPosition="top"
                                    effect="projector"
                                    effectIntensity="medium"
                                >
                                    <PixieLink
                                        href={door.href}
                                        variant="surface"
                                        color={door.color}
                                        className="group !flex h-full flex-col"
                                    >
                                        <PixieStack gap="md" className="h-full">
                                            <PixieCluster
                                                gap="xs"
                                                justify="between"
                                                align="center"
                                                className="!flex-nowrap"
                                            >
                                                <PixieFrame
                                                    as="div"
                                                    variant="cel"
                                                    padding="xs"
                                                    radius="medium"
                                                    color={door.color}
                                                    elevation="soft"
                                                >
                                                    <PixieSymbol
                                                        registry="codex"
                                                        collection="index"
                                                        slug={door.symbol}
                                                        size="lg"
                                                    />
                                                </PixieFrame>

                                                <PixieBadge
                                                    variant="soft"
                                                    size="xs"
                                                    shape="pill"
                                                    color={door.color}
                                                    className="shrink-0 font-eyebrow uppercase tracking-[0.08em]"
                                                >
                                                    {door.count}{" "}
                                                    {door.count > 1
                                                        ? door.plural
                                                        : door.singular}
                                                </PixieBadge>
                                            </PixieCluster>

                                            <div>
                                                <h3 className="text-2xl text-current transition-[filter] group-hover:brightness-125">
                                                    {door.title}
                                                </h3>

                                                <p className="mt-3 leading-7 text-ink-soft">
                                                    {door.description}
                                                </p>
                                            </div>

                                            <p className="mt-auto pt-2 font-medium text-current transition-[filter] group-hover:brightness-125">
                                                {door.action} →
                                            </p>
                                        </PixieStack>
                                    </PixieLink>
                                </PixieCard>
                            </li>
                        ))}
                    </PixieGrid>
                </PixieStack>
            </PixieBackdrop>

            <footer className="mt-24" aria-labelledby="footer-title">
                <PixieCard variant="outline" padding="none" radius="large">
                    <PixieBackdrop
                        variant="gradient"
                        intensity="subtle"
                        position="bottom-end"
                        spread="wide"
                        padding="lg"
                        radius="large"
                        color="graphite"
                        base="muted"
                        texture="grain"
                        textureIntensity="subtle"
                    >
                        <PixieStack gap="lg">
                            <PixieGrid
                                maxColumns={2}
                                minItemWidth="md"
                                gap="xl"
                            >
                                <PixieStack gap="sm" className="max-w-xl">
                                    <p className="text-sm font-medium font-eyebrow uppercase tracking-[0.2em] text-muted">
                                        Générique
                                    </p>

                                    <h2
                                        id="footer-title"
                                        className="text-3xl text-ink"
                                    >
                                        Le Codex reste ouvert
                                    </h2>

                                    <p className="text-base leading-7 text-ink-soft">
                                        La projection se poursuit d’une archive
                                        à l’autre. Explorez les quatre familles
                                        du Codex ou retrouvez directement un
                                        nom, un titre ou une époque.
                                    </p>
                                </PixieStack>

                                <PixieStack
                                    as="nav"
                                    aria-label="Poursuivre l’exploration du Codex"
                                    gap="sm"
                                >
                                    <p className="text-sm font-medium font-eyebrow uppercase tracking-[0.16em] text-muted">
                                        Poursuivre l’exploration
                                    </p>

                                    <PixieGrid
                                        as="ul"
                                        maxColumns={2}
                                        minItemWidth="xs"
                                        gap="sm"
                                    >
                                        {codexDoors.map((door) => (
                                            <li key={door.href}>
                                                <PixieLink
                                                    href={door.href}
                                                    variant="action"
                                                    color={door.color}
                                                    indicator="arrow"
                                                >
                                                    Explorer les{" "}
                                                    {door.title.toLowerCase()}
                                                </PixieLink>
                                            </li>
                                        ))}

                                        <li>
                                            <PixieLink
                                                href="/recherche"
                                                variant="action"
                                                indicator="arrow"
                                            >
                                                Rechercher dans le Codex
                                            </PixieLink>
                                        </li>
                                    </PixieGrid>
                                </PixieStack>
                            </PixieGrid>

                            <PixieSeparator
                                variant="fade"
                                intensity="subtle"
                                color="graphite"
                                spacing="none"
                                decorative
                            />

                            <PixieCluster
                                gap="lg"
                                justify="between"
                                align="start"
                            >
                                <p className="max-w-2xl text-sm leading-6 text-muted">
                                    Le Disneyiste est un projet éditorial
                                    personnel, indépendant et non officiel. Il
                                    n’est affilié ni à The Walt Disney Company
                                    ni à ses filiales, et n’est ni approuvé ni
                                    sponsorisé par celles-ci.
                                </p>

                                <PixieStack gap="xs" className="shrink-0">
                                    <p className="text-xs font-medium font-eyebrow uppercase tracking-[0.16em] text-muted">
                                        Imaginé et façonné par
                                    </p>

                                    <PixieLink
                                        href="https://julienjulien.fr"
                                        target="_blank"
                                        rel="noreferrer"
                                        variant="action"
                                        indicator="external"
                                    >
                                        Julien Julien
                                    </PixieLink>
                                </PixieStack>
                            </PixieCluster>
                        </PixieStack>
                    </PixieBackdrop>
                </PixieCard>
            </footer>
        </main>
    );
}
