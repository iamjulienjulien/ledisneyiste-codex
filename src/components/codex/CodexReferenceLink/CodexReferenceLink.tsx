import Link from "next/link";
import type { ReferenceCodex } from "@/types/reference";
import styles from "./CodexReferenceLink.module.css";

type CodexReferenceLinkProps = {
    reference: ReferenceCodex;
};

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

        default:
            return null;
    }
}

export function CodexReferenceLink({ reference }: CodexReferenceLinkProps) {
    const href = getReferenceHref(reference);

    if (!href) {
        return <span className={styles.unresolved}>{reference.nom}</span>;
    }

    return (
        <Link href={href} className={styles.link}>
            {reference.nom}
        </Link>
    );
}
