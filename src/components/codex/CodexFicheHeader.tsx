type CodexFicheHeaderProps = {
    eyebrow: string;
    titre: string;
    sousTitre?: string;
    introduction?: string;
};

export default function CodexFicheHeader({
    eyebrow,
    titre,
    sousTitre,
    introduction,
}: CodexFicheHeaderProps) {
    return (
        <header className="max-w-3xl">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted">
                {eyebrow}
            </p>

            <h1 className="mt-3 text-5xl text-ink sm:text-6xl">{titre}</h1>

            {sousTitre && (
                <p className="mt-4 text-xl leading-8 text-ink-soft">
                    {sousTitre}
                </p>
            )}

            {introduction && (
                <p className="mt-8 max-w-2xl text-lg leading-8 text-ink-soft">
                    {introduction}
                </p>
            )}
        </header>
    );
}
