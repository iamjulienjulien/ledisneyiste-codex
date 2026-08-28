import { CodexFooter } from "@/components/codex/CodexFooter";
import type { CodexFicheProps } from "@/types/codex-fiche";
import styles from "./CodexFiche.module.css";

export function CodexFiche({ family, children }: CodexFicheProps) {
    return (
        <main className={styles.root} data-codex-family={family}>
            {children}
            <CodexFooter className="!px-0" />
        </main>
    );
}
