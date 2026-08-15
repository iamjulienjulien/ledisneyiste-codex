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

        default:
            return null;
    }
}

export default function ReferenceCodexLink({
    reference,
}: ReferenceCodexLinkProps) {
    const href = getReferenceHref(reference);

    if (!href) {
        return <span>{reference.nom}</span>;
    }

    return (
        <Link
            href={href}
            className="text-accent underline underline-offset-4 hover:text-accent-hover"
        >
            {reference.nom}
        </Link>
    );
}
