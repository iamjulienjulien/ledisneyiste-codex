export type SourceCodex = {
    id: string;
    titre: string;
    auteur?: string;
    editeur?: string;
    url?: string;
    datePublication?: string;
    dateConsultation?: string;
};

export type CodexSourcesProps = Readonly<{
    sources: SourceCodex[];
}>;
