export type VarianteBouton = "principal" | "secondaire" | "discret";

export type TailleBouton = "petit" | "moyen" | "grand";

export type BoutonEsquisseProps = Readonly<{
    children: React.ReactNode;
    variante?: VarianteBouton;
    taille?: TailleBouton;
    disabled?: boolean;
    miseAuPoint?: boolean;
}>;

const stylesParVariante: Record<VarianteBouton, string> = {
    principal:
        "border border-accent bg-accent text-accent-contrast enabled:hover:border-accent-hover enabled:hover:bg-accent-hover",
    secondaire:
        "border border-line-strong bg-surface text-ink enabled:hover:border-accent enabled:hover:text-accent",
    discret:
        "border border-transparent bg-transparent text-accent enabled:hover:bg-accent-soft enabled:hover:text-accent-hover",
};

const stylesParTaille: Record<TailleBouton, string> = {
    petit: "min-h-9 px-3 py-1.5 text-sm",
    moyen: "min-h-11 px-4 py-2 text-base",
    grand: "min-h-13 px-5 py-3 text-lg",
};

export function BoutonEsquisse({
    children,
    variante = "principal",
    taille = "moyen",
    disabled = false,
    miseAuPoint = false,
}: BoutonEsquisseProps) {
    return (
        <button
            type="button"
            disabled={disabled}
            className={`inline-flex items-center justify-center rounded-small font-medium transition-colors motion-reduce:transition-none disabled:cursor-not-allowed disabled:opacity-40 ${stylesParVariante[variante]} ${stylesParTaille[taille]} ${miseAuPoint ? "outline-2 outline-offset-3 outline-focus" : ""}`}
        >
            {children}
        </button>
    );
}
