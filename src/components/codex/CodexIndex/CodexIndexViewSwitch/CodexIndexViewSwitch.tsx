import { PixieLink } from "@/components/ui/PixieLink";
import styles from "./CodexIndexViewSwitch.module.css";
import type { CodexIndexViewSwitchProps } from "./CodexIndexViewSwitch.types";

const views = [
    { value: "list", label: "Liste" },
    { value: "cards", label: "Cartes" },
] as const;

export function CodexIndexViewSwitch({
    pathname,
    currentView,
}: CodexIndexViewSwitchProps) {
    return (
        <nav aria-label="Mode d’affichage" className={styles.root}>
            {views.map((view) => {
                const isCurrent = currentView === view.value;

                return (
                    <PixieLink
                        key={view.value}
                        href={`${pathname}?view=${view.value}`}
                        aria-current={isCurrent ? "page" : undefined}
                        variant="action"
                        className={`${styles.link} ${isCurrent ? styles.current : ""}`.trim()}
                    >
                        {view.label}
                    </PixieLink>
                );
            })}
        </nav>
    );
}
