import type { DateHistorique } from "@/types/date";

export function formatDateHistorique(date: DateHistorique): string {
    switch (date.precision) {
        case "jour":
            return new Intl.DateTimeFormat("fr-FR", {
                day: "numeric",
                month: "long",
                year: "numeric",
                timeZone: "UTC",
            }).format(new Date(`${date.valeur}T00:00:00Z`));

        case "mois":
            return new Intl.DateTimeFormat("fr-FR", {
                month: "long",
                year: "numeric",
                timeZone: "UTC",
            }).format(new Date(`${date.valeur}-01T00:00:00Z`));

        case "annee":
            return date.valeur;
    }
}

export function formatDateISO(date: string): string {
    return new Intl.DateTimeFormat("fr-FR", {
        day: "numeric",
        month: "long",
        year: "numeric",
        timeZone: "UTC",
    }).format(new Date(`${date}T00:00:00Z`));
}
