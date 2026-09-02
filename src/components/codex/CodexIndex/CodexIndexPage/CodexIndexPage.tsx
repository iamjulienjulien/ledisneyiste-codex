import { CodexLayoutFooter } from "@/components/codex/CodexLayout/CodexLayoutFooter";
import { PixieBackdrop } from "@/components/ui/PixieBackdrop";
import { PixieCluster } from "@/components/ui/PixieCluster";
import { PixieFrame } from "@/components/ui/PixieFrame";
import { PixieInset } from "@/components/ui/PixieInset";
import { PixiePanel } from "@/components/ui/PixiePanel";
import { PixieSection } from "@/components/ui/PixieSection";
import { PixieSeparator } from "@/components/ui/PixieSeparator";
import { PixieStack } from "@/components/ui/PixieStack";
import { PixieSymbol } from "@/components/ui/PixieSymbol";
import type { CodexFamily } from "@/types/codex";
import type { AtelierAnimationColorSlug } from "@/types/colors";
import styles from "./CodexIndexPage.module.css";
import type { CodexIndexPageProps } from "./CodexIndexPage.types";

const familyThemes = {
    personnages: {
        color: "rouge-crayon",
        symbol: "personnages",
    },
    createurs: {
        color: "jaune-lampe",
        symbol: "createurs",
    },
    oeuvres: {
        color: "gouache",
        symbol: "oeuvres",
    },
    epoques: {
        color: "vert-cellulo",
        symbol: "epoques",
    },
    chansons: {
        color: "rose-aerographe",
        symbol: "chansons",
    },
} as const satisfies Record<
    CodexFamily,
    Readonly<{
        color: AtelierAnimationColorSlug;
        symbol: CodexFamily;
    }>
>;

export function CodexIndexPage({
    famille,
    eyebrow,
    titre,
    introduction,
    compteur,
    commandes,
    children,
}: CodexIndexPageProps) {
    const theme = familyThemes[famille];
    const libelleCompteur =
        compteur.valeur > 1 ? compteur.pluriel : compteur.singulier;

    return (
        <main className={styles.root} data-family={famille}>
            <PixieBackdrop
                as="header"
                variant="cel"
                intensity="subtle"
                position="top-start"
                spread="wide"
                padding="none"
                color={theme.color}
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
                            color={theme.color}
                            elevation="soft"
                            className={styles.symbolFrame}
                        >
                            <PixieSymbol
                                registry="index"
                                collection={theme.symbol}
                                slug="principal"
                                size="xl"
                            />
                        </PixieFrame>

                        <PixieStack gap="sm" className={styles.heading}>
                            <p className={styles.eyebrow}>{eyebrow}</p>
                            <h1 className={styles.title}>{titre}</h1>
                            <p className={styles.introduction}>
                                {introduction}
                            </p>
                        </PixieStack>
                    </PixieCluster>
                </PixieSection>
            </PixieBackdrop>

            <PixieSection
                aria-label={`Archives ${titre}`}
                width="72"
                gutter="md"
                spacingStart="md"
                spacingEnd="xl"
                gap="lg"
            >
                <PixieSeparator
                    variant="beam"
                    intensity="strong"
                    color={theme.color}
                    spacing="none"
                    decorative
                />

                <PixiePanel
                    as="div"
                    variant="outline"
                    padding="sm"
                    radius="medium"
                    color={theme.color}
                    className={styles.toolbar}
                >
                    <PixieCluster gap="sm" justify="between" align="center">
                        <PixieInset
                            variant="subtle"
                            depth="shallow"
                            padding="sm"
                            radius="small"
                            color={theme.color}
                        >
                            <p className={styles.counter}>
                                {compteur.valeur} {libelleCompteur}
                            </p>
                        </PixieInset>

                        {commandes}
                    </PixieCluster>
                </PixiePanel>

                {children}
            </PixieSection>
            <CodexLayoutFooter />
        </main>
    );
}
