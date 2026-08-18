import { PixieLink } from "@/components/ui/PixieLink";
import { PixieSymbol } from "@/components/ui/PixieSymbol";
import { formatDateHistorique } from "@/lib/date";
import type { CodexEpoqueCardProps } from "@/types/codex-cards";
import styles from "./CodexEpoqueCard.module.css";

function getLabel(nombre: number, singular: string, plural: string) {
    return `${nombre} ${nombre > 1 ? plural : singular}`;
}

export function CodexEpoqueCard({
    epoque,
    fiche,
    nombres,
}: CodexEpoqueCardProps) {
    return (
        <PixieLink
            href={`/epoques/${epoque.slug}`}
            variant="surface"
            color="vert-cellulo"
            className={`${styles.root} group p-6 sm:p-7`}
        >
            <div className="flex items-start justify-between gap-5">
                <div className="min-w-0">
                    <p className="text-xs font-medium uppercase tracking-[0.16em] text-famille-epoques">
                        {formatDateHistorique(fiche.periode.debut)}
                        {"–"}
                        {fiche.periode.fin
                            ? formatDateHistorique(fiche.periode.fin)
                            : "aujourd’hui"}
                    </p>

                    <h2 className="mt-5 text-3xl text-ink transition-colors group-hover:text-famille-epoques group-focus-visible:text-famille-epoques">
                        {epoque.nom}
                    </h2>
                </div>

                <PixieSymbol
                    registry="codex"
                    collection="index"
                    slug="epoques"
                    size="lg"
                />
            </div>

            <p className="mt-4 leading-7 text-ink-soft">{fiche.description}</p>

            <ul
                aria-label="Éléments reliés"
                className="mt-8 grid grid-cols-3 gap-px overflow-hidden rounded-small border border-line bg-line text-center"
            >
                <li className="bg-surface-muted px-3 py-4 text-sm text-ink">
                    {getLabel(nombres.oeuvres, "œuvre", "œuvres")}
                </li>
                <li className="bg-surface-muted px-3 py-4 text-sm text-ink">
                    {getLabel(nombres.personnages, "personnage", "personnages")}
                </li>
                <li className="bg-surface-muted px-3 py-4 text-sm text-ink">
                    {getLabel(nombres.createurs, "créateur", "créateurs")}
                </li>
            </ul>

            <span className="mt-auto pt-8 text-sm font-medium text-famille-epoques">
                Ouvrir la fiche →
            </span>
        </PixieLink>
    );
}
