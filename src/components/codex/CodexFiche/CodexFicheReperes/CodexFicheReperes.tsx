import { PixiePanel } from "@/components/ui/PixiePanel";
import styles from "./CodexFicheReperes.module.css";
import type {
    CodexFicheRepereWidth,
    CodexFicheReperesProps,
} from "./CodexFicheReperes.types";

const widthClasses = {
    default: "",
    full: styles.full,
} as const satisfies Record<CodexFicheRepereWidth, string>;

export function CodexFicheReperes({ reperes }: CodexFicheReperesProps) {
    if (reperes.length === 0) {
        return null;
    }

    return (
        <PixiePanel
            as="div"
            variant="accent"
            padding="lg"
            radius="medium"
            elevation="soft"
            className={styles.panel}
        >
            <dl className={styles.list}>
                {reperes.map((repere) => (
                    <div
                        key={repere.label}
                        className={widthClasses[repere.width ?? "default"]}
                    >
                        <dt className={styles.label}>{repere.label}</dt>
                        <dd className={styles.value}>{repere.value}</dd>
                    </div>
                ))}
            </dl>
        </PixiePanel>
    );
}
