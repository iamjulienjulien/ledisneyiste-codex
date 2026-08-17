import { CodexReferenceLink } from "@/components/codex/CodexReferenceLink";
import type { ReferenceCodex } from "@/types/reference";
import styles from "./CodexEpoque.module.css";

type CodexEpoqueProps = {
    epoque?: ReferenceCodex;
};

export function CodexEpoque({ epoque }: CodexEpoqueProps) {
    if (!epoque) {
        return null;
    }

    return (
        <div className={styles.root}>
            <dt className="text-sm text-muted">Époque</dt>

            <dd className="mt-1 text-lg text-ink">
                <CodexReferenceLink reference={epoque} />
            </dd>
        </div>
    );
}
