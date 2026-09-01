import { CodexLayoutFooter } from "@/components/codex/CodexLayout/CodexLayoutFooter";
import styles from "./CodexFiche.module.css";
import type { CodexFicheProps } from "./CodexFiche.types";

export function CodexFiche({ family, children }: CodexFicheProps) {
    return (
        <main className={styles.root} data-codex-family={family}>
            {children}
            <CodexLayoutFooter className="!px-0" />
        </main>
    );
}
