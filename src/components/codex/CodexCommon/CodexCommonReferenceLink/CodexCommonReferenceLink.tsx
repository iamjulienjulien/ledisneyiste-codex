import { PixieLink } from "@/components/ui/PixieLink";
import { construireRouteReferenceCodex } from "@/lib/navigation/routes-codex";
import styles from "./CodexCommonReferenceLink.module.css";
import type { CodexCommonReferenceLinkProps } from "./CodexCommonReferenceLink.types";

export function CodexCommonReferenceLink({
    reference,
}: CodexCommonReferenceLinkProps) {
    const href = construireRouteReferenceCodex(reference);

    if (!href) {
        return <span className={styles.unresolved}>{reference.nom}</span>;
    }

    return (
        <PixieLink href={href} className={styles.link}>
            {reference.nom}
        </PixieLink>
    );
}
