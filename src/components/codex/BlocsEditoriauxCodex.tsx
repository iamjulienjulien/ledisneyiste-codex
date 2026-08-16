import CodexFicheSection from "@/components/codex/CodexFicheSection";
import type { BlocEditorialCodex } from "@/types/fiche";

type BlocsEditoriauxCodexProps = {
    blocs?: BlocEditorialCodex[];
};

export default function BlocsEditoriauxCodex({
    blocs,
}: BlocsEditoriauxCodexProps) {
    if (!blocs?.length) {
        return null;
    }

    return blocs.map((bloc) => (
        <CodexFicheSection
            key={bloc.titre}
            eyebrow={bloc.eyebrow}
            titre={bloc.titre}
        >
            <div className="max-w-3xl space-y-5">
                {bloc.paragraphes.map((paragraphe, index) => (
                    <p key={index} className="text-lg leading-8 text-ink-soft">
                        {paragraphe}
                    </p>
                ))}
            </div>
        </CodexFicheSection>
    ));
}
