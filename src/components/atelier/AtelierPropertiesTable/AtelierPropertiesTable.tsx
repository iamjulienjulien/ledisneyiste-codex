import { AtelierTypeToken } from "@/components/atelier/AtelierTypeToken";
import styles from "./AtelierPropertiesTable.module.css";

export type AtelierProperty = Readonly<{
    name: string;
    type: string;
    defaultValue: string;
    description: string;
}>;

export function AtelierPropertiesTable({
    properties,
}: Readonly<{ properties: readonly AtelierProperty[] }>) {
    return (
        <div className={styles.root}>
            <table className="w-full min-w-3xl border-collapse text-left">
                <thead className="bg-surface-muted text-xs font-eyebrow uppercase tracking-[0.16em] text-muted">
                    <tr>
                        <th scope="col" className="px-5 py-4 font-medium">
                            Propriété
                        </th>
                        <th scope="col" className="px-5 py-4 font-medium">
                            Type
                        </th>
                        <th scope="col" className="px-5 py-4 font-medium">
                            Défaut
                        </th>
                        <th scope="col" className="px-5 py-4 font-medium">
                            Rôle
                        </th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-line bg-surface">
                    {properties.map((property) => (
                        <tr key={property.name}>
                            <th
                                scope="row"
                                className="px-5 py-4 font-mono text-sm font-medium text-accent"
                            >
                                {property.name}
                            </th>
                            <td className="px-5 py-4 font-mono text-xs text-ink-soft">
                                <AtelierTypeToken value={property.type} />
                            </td>
                            <td className="px-5 py-4 font-mono text-xs text-muted">
                                {property.defaultValue}
                            </td>
                            <td className="px-5 py-4 text-sm leading-6 text-ink-soft">
                                {property.description}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
