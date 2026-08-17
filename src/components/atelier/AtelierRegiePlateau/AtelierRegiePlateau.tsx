import { AtelierOptionRadio } from "@/components/atelier/AtelierOptionRadio";
import styles from "./AtelierRegiePlateau.module.css";

type AtelierRegiePlateauProps = Readonly<{
    namePrefix: string;
    lumiere: "sombre" | "claire";
    onLumiereChange: (lumiere: "sombre" | "claire") => void;
    cadre: "compact" | "moyen" | "large";
    onCadreChange: (cadre: "compact" | "moyen" | "large") => void;
}>;

const cadres = [
    { value: "compact", label: "Compact" },
    { value: "moyen", label: "Moyen" },
    { value: "large", label: "Large" },
] as const;

export function AtelierRegiePlateau({
    namePrefix,
    lumiere,
    onLumiereChange,
    cadre,
    onCadreChange,
}: AtelierRegiePlateauProps) {
    return (
        <div className={styles.root}>
            <p className={styles.heading}>Réglages du plateau</p>

            <div className={styles.controls}>
                <fieldset className={styles.group}>
                    <legend className={styles.legend}>Lumière</legend>
                    <div className={styles.options}>
                        <AtelierOptionRadio
                            name={`${namePrefix}-lumiere`}
                            value="sombre"
                            label="Sombre"
                            selectedValue={lumiere}
                            onChange={onLumiereChange}
                        />
                        <AtelierOptionRadio
                            name={`${namePrefix}-lumiere`}
                            value="claire"
                            label="Claire"
                            selectedValue={lumiere}
                            onChange={onLumiereChange}
                        />
                    </div>
                </fieldset>

                <fieldset className={styles.group}>
                    <legend className={styles.legend}>Cadre</legend>
                    <div className={styles.options}>
                        {cadres.map((option) => (
                            <AtelierOptionRadio
                                key={option.value}
                                name={`${namePrefix}-cadre`}
                                {...option}
                                selectedValue={cadre}
                                onChange={onCadreChange}
                            />
                        ))}
                    </div>
                </fieldset>
            </div>
        </div>
    );
}
