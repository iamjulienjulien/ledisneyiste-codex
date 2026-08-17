import { AtelierTypeToken } from "@/components/atelier/AtelierTypeToken";
import styles from "./AtelierTypesTable.module.css";

type AtelierTypesTableProps = Readonly<{
    types: readonly Readonly<{
        name: string;
        values: readonly string[];
        description: string;
    }>[];
}>;

export function AtelierTypesTable({ types }: AtelierTypesTableProps) {
    return (
        <div className={styles.root}>
            <table className="w-full min-w-2xl border-collapse text-left">
                <thead className="bg-surface-muted text-xs uppercase tracking-[0.16em] text-muted">
                    <tr>
                        <th scope="col" className="px-5 py-4 font-medium">
                            Type
                        </th>
                        <th scope="col" className="px-5 py-4 font-medium">
                            Valeurs
                        </th>
                        <th scope="col" className="px-5 py-4 font-medium">
                            Rôle
                        </th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-line bg-surface">
                    {types.map((type) => (
                        <tr key={type.name}>
                            <th
                                scope="row"
                                className="px-5 py-4 font-mono text-sm font-medium text-accent"
                            >
                                {type.name}
                            </th>
                            <td className="px-5 py-4">
                                <div className={styles.values}>
                                    {type.values.map((value) => (
                                        <AtelierTypeToken
                                            key={value}
                                            value={value}
                                            chip
                                        />
                                    ))}
                                </div>
                            </td>
                            <td className="px-5 py-4 text-sm leading-6 text-ink-soft">
                                {type.description}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
