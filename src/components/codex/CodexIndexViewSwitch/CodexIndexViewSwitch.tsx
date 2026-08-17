import Link from "next/link";
import type { CodexIndexViewSwitchProps } from "@/types/index-view";
import styles from "./CodexIndexViewSwitch.module.css";

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
                    <Link
                        key={view.value}
                        href={`${pathname}?view=${view.value}`}
                        aria-current={isCurrent ? "page" : undefined}
                        className={`${styles.link} ${isCurrent ? styles.current : ""}`.trim()}
                    >
                        {view.label}
                    </Link>
                );
            })}
        </nav>
    );
}
