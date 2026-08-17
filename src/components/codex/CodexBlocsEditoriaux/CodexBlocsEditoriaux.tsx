import { CodexFicheSection } from "@/components/codex/CodexFicheSection";
import type { BlocEditorialCodex } from "@/types/fiche";
import styles from "./CodexBlocsEditoriaux.module.css";

type CodexBlocsEditoriauxProps = {
    blocs?: BlocEditorialCodex[];
};

export function CodexBlocsEditoriaux({ blocs }: CodexBlocsEditoriauxProps) {
    if (!blocs?.length) {
        return null;
    }

    return blocs.map((bloc) => (
        <CodexFicheSection
            key={bloc.titre}
            eyebrow={bloc.eyebrow}
            titre={bloc.titre}
        >
            <div className={styles.body}>
                {bloc.paragraphes.map((paragraphe, index) => (
                    <p key={index} className="text-lg leading-8 text-ink-soft">
                        {paragraphe}
                    </p>
                ))}
            </div>
        </CodexFicheSection>
    ));
}
