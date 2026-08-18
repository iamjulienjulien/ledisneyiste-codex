import recompensesJson from "@/data/recompenses/recompenses.json";
import type { RecompenseDisney } from "@/types/recompense";

export const recompenses = recompensesJson as RecompenseDisney[];

export function getRecompenseById(id: string) {
    return recompenses.find((recompense) => recompense.id === id);
}
