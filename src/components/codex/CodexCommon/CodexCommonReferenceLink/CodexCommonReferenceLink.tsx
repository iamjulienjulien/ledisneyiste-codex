import { PixieLink } from "@/components/ui/PixieLink";
import type { ReferenceCodex } from "@/types/reference";
import styles from "./CodexCommonReferenceLink.module.css";
import type { CodexCommonReferenceLinkProps } from "./CodexCommonReferenceLink.types";

function getReferenceHref(reference: ReferenceCodex) {
    switch (reference.type) {
        case "personnage":
            return `/personnages/${reference.slug}`;

        case "contributeur":
            return `/contributeurs/${reference.slug}`;

        case "oeuvre":
            return `/oeuvres/${reference.slug}`;

        case "epoque":
            return `/epoques/${reference.slug}`;

        case "chanson":
            return `/chansons/${reference.slug}`;

        default:
            return null;
    }
}

export function CodexCommonReferenceLink({
    reference,
}: CodexCommonReferenceLinkProps) {
    const href = getReferenceHref(reference);

    if (!href) {
        return <span className={styles.unresolved}>{reference.nom}</span>;
    }

    return (
        <PixieLink href={href} className={styles.link}>
            {reference.nom}
        </PixieLink>
    );
}
