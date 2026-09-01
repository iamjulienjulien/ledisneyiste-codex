import type { EntreeCatalogueBase } from "@/types/codex";
import type {
    CollectionOeuvreDisney,
    CouleurOeuvreDisney,
    SonOeuvreDisney,
    TypeOeuvreDisney,
} from "@/types/metadata";
import type { DateHistorique, PeriodeHistorique } from "@/types/date";
import type { FicheCodexBase } from "@/types/fiche";
import type { TitreAlternatifCodex } from "@/types/identite";
import type { ReferenceCodex } from "@/types/reference";
import type {
    EvenementSortieOeuvre,
    ExploitationOeuvre,
    ReceptionOeuvre,
    VersionOeuvre,
} from "@/types/circulation-oeuvre";
import type { DonneeEconomiqueOeuvre } from "@/types/donnee-economique";

export type {
    EvenementSortieOeuvre,
    ExploitationOeuvre,
    NatureEvenementSortieOeuvre,
    ReceptionOeuvre,
    VersionOeuvre,
} from "@/types/circulation-oeuvre";
export type {
    DegreCertitudeDonneeEconomique,
    DonneeEconomiqueDeriveeOeuvre,
    DonneeEconomiqueOeuvre,
    DonneeEconomiqueOeuvreEnquete,
    DonneeEconomiqueOeuvreHistorique,
    DonneeEconomiqueOeuvreStructuree,
    DossierEnqueteEconomiquePrive,
    NatureMesureEconomiqueOeuvre,
    ProjectionDonneeEconomiquePublique,
    VerdictPublicationDonneeEconomique,
} from "@/types/donnee-economique";

export type OeuvreDisney = EntreeCatalogueBase & {
    type: "oeuvre";
    metadata: {
        collection: CollectionOeuvreDisney;
        type: TypeOeuvreDisney;
        son: SonOeuvreDisney;
        couleur: CouleurOeuvreDisney;
    };
};

export type ContributionOeuvre = {
    contributeur: ReferenceCodex;
    roles: string[];
    domaine?: DomaineCreditOeuvre;
};

export type DomaineCreditOeuvre =
    | "production-direction"
    | "histoire-adaptation"
    | "direction-artistique-conception"
    | "animation-personnages"
    | "decors-effets-photographie"
    | "musique-chansons"
    | "interpretation-vocale"
    | "innovations-techniques"
    | "reference-filmee";

export type TitreAlternatifOeuvre = TitreAlternatifCodex;

export type DureeOeuvre = {
    valeur: number;
    unite: "minutes";
    version: string;
    sources: string[];
};

export type ReferenceOeuvreLiee =
    | {
          nom: string;
          type: "oeuvre";
          slug: string;
      }
    | {
          nom: string;
          type: "oeuvre-exterieure";
          auteurs?: string[];
          date?: DateHistorique;
      }
    | {
          nom: string;
          type: "oeuvre-source";
          id: string;
          slug: string;
      };

export type NatureRelationOeuvre =
    | "source"
    | "preparation"
    | "adaptation"
    | "inspiration"
    | "influence"
    | "suite"
    | "remake"
    | "derivee";

export type RelationOeuvre = {
    nature: NatureRelationOeuvre;
    oeuvre: ReferenceOeuvreLiee;
    sources: string[];
};

export type FicheOeuvreDisney = FicheCodexBase<"oeuvres"> & {
    type: "oeuvre";

    sortie: {
        date: DateHistorique;
        evenements?: EvenementSortieOeuvre[];
    };

    format: string;

    titresAlternatifs?: TitreAlternatifOeuvre[];

    durees?: DureeOeuvre[];

    versions?: VersionOeuvre[];

    exploitations?: ExploitationOeuvre[];

    receptions?: ReceptionOeuvre[];

    production?: PeriodeHistorique & {
        sources: string[];
    };

    donneesEconomiques?: DonneeEconomiqueOeuvre[];

    relationsOeuvres?: RelationOeuvre[];

    contributions: ContributionOeuvre[];

    personnages: ReferenceCodex[];
};
