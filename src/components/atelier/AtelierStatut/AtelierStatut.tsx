import styles from "./AtelierStatut.module.css";

type AtelierStatutProps = Readonly<{
    statut: "À inventorier" | "Esquisse" | "Prêt à projeter";
}>;

export function AtelierStatut({ statut }: AtelierStatutProps) {
    return (
        <span className={styles.root} data-statut={statut}>
            {statut}
        </span>
    );
}
