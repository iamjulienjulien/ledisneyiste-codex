import { CodexLayoutFooter } from "@/components/codex/CodexLayout/CodexLayoutFooter";
import { PixieContainer } from "@/components/ui/PixieContainer";
import styles from "./CodexFiche.module.css";
import type { CodexFicheProps } from "./CodexFiche.types";

export function CodexFiche({ family, children }: CodexFicheProps) {
    return (
        <PixieContainer
            as="main"
            width="72"
            gutter="md"
            className={styles.root}
            data-codex-family={family}
        >
            {children}
            <CodexLayoutFooter gutter="none" />
        </PixieContainer>
    );
}
