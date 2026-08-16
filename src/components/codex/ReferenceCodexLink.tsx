import Link from "next/link";
import type { ReferenceCodex } from "@/types/reference";

type ReferenceCodexLinkProps = {
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

export default function ReferenceCodexLink({
    reference,
}: ReferenceCodexLinkProps) {
    const href = getReferenceHref(reference);

    if (!href) {
        return <span className="text-ink-soft">{reference.nom}</span>;
    }

    return (
        <Link
            href={href}
            className="text-accent underline decoration-line-strong underline-offset-4 transition-colors hover:text-accent-hover hover:decoration-accent"
        >
            {reference.nom}
        </Link>
    );
}
