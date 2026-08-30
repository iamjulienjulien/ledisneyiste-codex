import { PixieLink } from "@/components/ui/PixieLink";
import { PixieSymbol } from "@/components/ui/PixieSymbol";
import type { CodexFamily } from "@/types/codex";
import type { AtelierAnimationColorSlug } from "@/types/colors";
import type { CodexIndexListItemProps } from "@/types/index-view";
import styles from "./CodexIndexListItem.module.css";

const colorSlugs = {
    personnages: "rouge-crayon",
    createurs: "jaune-lampe",
    oeuvres: "gouache",
    epoques: "vert-cellulo",
} as const satisfies Record<CodexFamily, AtelierAnimationColorSlug>;

export function CodexIndexListItem({
    href,
    index,
    famille,
    titre,
    sousTitre,
    children,
}: CodexIndexListItemProps) {
    return (
        <li className={styles.root} data-famille={famille}>
            <PixieLink
                href={href}
                variant="surface"
                color={colorSlugs[famille]}
                className={`${styles.link} group`}
            >
                <span
                    aria-hidden="true"
                    className={`${styles.number} font-mono`}
                >
                    {String(index + 1).padStart(2, "0")}
                </span>

                <div className={styles.content}>
                    <div className={styles.heading}>
                        <h2 className="text-2xl text-ink transition-colors group-hover:text-[var(--codex-list-color)] group-focus-visible:text-[var(--codex-list-color)] sm:text-3xl">
                            {titre}
                        </h2>
                        <span aria-hidden="true" className={styles.arrow}>
                            →
                        </span>
                    </div>

                    <p className="mt-2 max-w-2xl leading-7 text-ink-soft">
                        {sousTitre}
                    </p>

                    {children ? (
                        <div className={styles.metadata}>{children}</div>
                    ) : null}
                </div>

                <span aria-hidden="true" className={styles.symbol}>
                    <PixieSymbol
                        registry="index"
                        collection={famille}
                        slug="principal"
                        size="md"
                    />
                </span>
            </PixieLink>
        </li>
    );
}
