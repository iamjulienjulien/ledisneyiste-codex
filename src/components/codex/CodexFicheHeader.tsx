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
                <p className="mt-3 text-xl leading-8 text-ink-soft">
                    {sousTitre}
                </p>
            )}

            {introduction && (
                <div className="mt-8 max-w-3xl border-l-2 border-accent pl-6 sm:pl-8">
                    <p className="text-lg leading-8 text-ink sm:text-xl sm:leading-9">
                        {introduction}
                    </p>
                </div>
            )}
        </header>
    );
}
