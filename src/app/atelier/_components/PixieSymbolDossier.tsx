import { AtelierFicheAccessoire } from "@/components/atelier/AtelierFicheAccessoire";
import { AtelierCodeBlock } from "@/components/atelier/AtelierCodeBlock";
import { AtelierPropertiesTable } from "@/components/atelier/AtelierPropertiesTable";
import { AtelierStatut } from "@/components/atelier/AtelierStatut";
import { AtelierTypesTable } from "@/components/atelier/AtelierTypesTable";
import { PixieSymbol } from "@/components/ui/PixieSymbol";
import { getSymbol, getSymbolSlugs } from "@/registry/symbols";
import { PixieSymbolPlayground } from "./PixieSymbolPlayground";

const generalLogoSymbolSlugs = getSymbolSlugs("general", "logos");
const generalCinemaSymbolSlugs = getSymbolSlugs("general", "cinema");
const generalArchiveSymbolSlugs = getSymbolSlugs("general", "archives");
const generalEcritureSymbolSlugs = getSymbolSlugs("general", "ecriture");
const generalExplorationSymbolSlugs = getSymbolSlugs("general", "exploration");
const generalTempsSymbolSlugs = getSymbolSlugs("general", "temps");
const generalAtelierSymbolSlugs = getSymbolSlugs("general", "atelier");
const generalEvenementsSymbolSlugs = getSymbolSlugs("general", "evenements");
const generalCommunicationSymbolSlugs = getSymbolSlugs(
    "general",
    "communication",
);
const diffusionSallesSymbolSlugs = getSymbolSlugs("diffusion", "salles");
const diffusionTelevisionSymbolSlugs = getSymbolSlugs(
    "diffusion",
    "television",
);
const diffusionVideoSymbolSlugs = getSymbolSlugs("diffusion", "video");
const diffusionNumeriqueSymbolSlugs = getSymbolSlugs("diffusion", "numerique");
const diffusionSceneEtParcsSymbolSlugs = getSymbolSlugs(
    "diffusion",
    "scene-et-parcs",
);
const sourceSupportsSymbolSlugs = getSymbolSlugs("sources", "supports");
const sourceDocumentsSymbolSlugs = getSymbolSlugs("sources", "documents");
const sourceArchivesSymbolSlugs = getSymbolSlugs("sources", "archives");
const sourceConservationSymbolSlugs = getSymbolSlugs("sources", "conservation");
const animationTechniqueSymbolSlugs = getSymbolSlugs("techniques", "animation");
const imageTechniqueSymbolSlugs = getSymbolSlugs("techniques", "images");
const couleurTechniqueSymbolSlugs = getSymbolSlugs("techniques", "couleur");
const sonTechniqueSymbolSlugs = getSymbolSlugs("techniques", "son");
const effetsTechniqueSymbolSlugs = getSymbolSlugs("techniques", "effets");
const imagineeringTechniqueSymbolSlugs = getSymbolSlugs(
    "techniques",
    "imagineering",
);
const recompenseTrophySymbolSlugs = getSymbolSlugs("recompenses", "trophees");
const personnageIndexSymbolSlugs = getSymbolSlugs("index", "personnages");
const createurIndexSymbolSlugs = getSymbolSlugs("index", "createurs");
const oeuvreIndexSymbolSlugs = getSymbolSlugs("index", "oeuvres");
const epoqueIndexSymbolSlugs = getSymbolSlugs("index", "epoques");
const chansonIndexSymbolSlugs = getSymbolSlugs("index", "chansons");
const indexCollections = [
    "personnages",
    "createurs",
    "oeuvres",
    "epoques",
    "chansons",
] as const;

const dimensions = [
    ["xs", "24 px"],
    ["sm", "32 px"],
    ["md", "48 px"],
    ["lg", "64 px"],
    ["xl", "96 px"],
] as const;

const proprietes = [
    {
        name: "registry",
        type: "SymbolRegistryName",
        defaultValue: "—",
        description: "Registre qui contient la famille de symboles.",
    },
    {
        name: "collection",
        type: "SymbolCollectionName<Registry>",
        defaultValue: "—",
        description: "Collection disponible dans le registre sélectionné.",
    },
    {
        name: "slug",
        type: "SymbolSlug<Registry, Collection>",
        defaultValue: "—",
        description: "Identifiant typé du symbole dans le registre.",
    },
    {
        name: "size",
        type: "PixieSymbolSize",
        defaultValue: '"md"',
        description: "Taille extérieure du symbole en preset ou en pixels.",
    },
    {
        name: "decorative",
        type: "boolean",
        defaultValue: "true",
        description: "Masque le symbole aux technologies d’assistance.",
    },
    {
        name: "label",
        type: "string",
        defaultValue: "libellé du registre",
        description: "Texte alternatif lorsque le symbole est informatif.",
    },
    {
        name: "className",
        type: "string",
        defaultValue: '""',
        description: "Classes ajoutées au conteneur extérieur.",
    },
] as const;

const typesSpecifiques = [
    {
        name: "PixieSymbolSize",
        values: ['"xs"', '"sm"', '"md"', '"lg"', '"xl"', "number"],
        description: "Tailles prédéfinies ou dimension libre en pixels.",
    },
    {
        name: "SymbolRegistryName",
        values: [
            '"diffusion"',
            '"general"',
            '"index"',
            '"recompenses"',
            '"sources"',
            '"techniques"',
        ],
        description: "Registres de symboles actuellement disponibles.",
    },
    {
        name: 'SymbolCollectionName<"diffusion">',
        values: [
            '"salles"',
            '"television"',
            '"video"',
            '"numerique"',
            '"scene-et-parcs"',
        ],
        description: "Collections exposées par le registre Diffusion.",
    },
    {
        name: 'SymbolCollectionName<"index">',
        values: [
            '"personnages"',
            '"createurs"',
            '"oeuvres"',
            '"epoques"',
            '"chansons"',
        ],
        description:
            "Collections qui réunissent le symbole principal et les blocs de chaque index.",
    },
    {
        name: 'SymbolCollectionName<"general">',
        values: [
            '"archives"',
            '"atelier"',
            '"cinema"',
            '"communication"',
            '"ecriture"',
            '"evenements"',
            '"exploration"',
            '"logos"',
            '"temps"',
        ],
        description: "Collections exposées par le registre Général.",
    },
    {
        name: 'SymbolCollectionName<"recompenses">',
        values: ['"trophees"'],
        description: "Collections exposées par le registre des Récompenses.",
    },
    {
        name: 'SymbolCollectionName<"sources">',
        values: ['"supports"', '"documents"', '"archives"', '"conservation"'],
        description: "Collections exposées par le registre des Sources.",
    },
    {
        name: 'SymbolCollectionName<"techniques">',
        values: [
            '"animation"',
            '"images"',
            '"couleur"',
            '"son"',
            '"effets"',
            '"imagineering"',
        ],
        description: "Collections exposées par le registre des Techniques.",
    },
    {
        name: 'SymbolSlug<"diffusion", "salles">',
        values: diffusionSallesSymbolSlugs.map((slug) => `"${slug}"`),
        description: "Symboles de l’exploitation en salles de cinéma.",
    },
    {
        name: 'SymbolSlug<"diffusion", "television">',
        values: diffusionTelevisionSymbolSlugs.map((slug) => `"${slug}"`),
        description:
            "Symboles de la programmation et de la réception télévisées.",
    },
    {
        name: 'SymbolSlug<"diffusion", "video">',
        values: diffusionVideoSymbolSlugs.map((slug) => `"${slug}"`),
        description:
            "Symboles des éditions physiques et du visionnage domestique.",
    },
    {
        name: 'SymbolSlug<"diffusion", "numerique">',
        values: diffusionNumeriqueSymbolSlugs.map((slug) => `"${slug}"`),
        description:
            "Symboles de l’accès dématérialisé et de la diffusion en ligne.",
    },
    {
        name: 'SymbolSlug<"diffusion", "scene-et-parcs">',
        values: diffusionSceneEtParcsSymbolSlugs.map((slug) => `"${slug}"`),
        description: "Symboles des spectacles, attractions et expositions.",
    },
    {
        name: 'SymbolSlug<"sources", "supports">',
        values: sourceSupportsSymbolSlugs.map((slug) => `"${slug}"`),
        description: "Symboles des supports physiques et numériques.",
    },
    {
        name: 'SymbolSlug<"sources", "documents">',
        values: sourceDocumentsSymbolSlugs.map((slug) => `"${slug}"`),
        description: "Symboles des documents qui portent une preuve.",
    },
    {
        name: 'SymbolSlug<"sources", "archives">',
        values: sourceArchivesSymbolSlugs.map((slug) => `"${slug}"`),
        description:
            "Symboles du classement et de la provenance archivistique.",
    },
    {
        name: 'SymbolSlug<"sources", "conservation">',
        values: sourceConservationSymbolSlugs.map((slug) => `"${slug}"`),
        description: "Symboles des gestes et conditions de conservation.",
    },
    {
        name: 'SymbolSlug<"index", "chansons">',
        values: [
            '"principal"',
            '"genese"',
            '"paroles"',
            '"melodie"',
            '"arrangement"',
            '"interpretation"',
            '"fonction-narrative"',
            '"reprises"',
            '"heritage"',
        ],
        description: "Symboles principaux et éditoriaux de l’Index Chansons.",
    },
    {
        name: 'SymbolSlug<"general", "logos">',
        values: ['"le-codex-du-disneyiste"'],
        description: "Logos généraux disponibles dans le registre.",
    },
    {
        name: 'SymbolSlug<"general", "cinema">',
        values: [
            '"bobine"',
            '"camera-cinema"',
            '"casque-studio"',
            '"clap"',
            '"fauteuil-realisateur"',
            '"haut-parleur"',
            '"megaphone"',
            '"micro-perche"',
            '"pellicule"',
            '"projecteur-cinema"',
            '"projecteur-plateau"',
            '"rideau-cinema"',
            '"scenario"',
            '"storyboard"',
            '"ticket-cinema"',
        ],
        description: "Accessoires généraux du langage cinématographique.",
    },
    {
        name: 'SymbolSlug<"general", "archives">',
        values: [
            '"boite-archives"',
            '"chemise-archives"',
            '"dossier-ficelle"',
            '"registre-relie"',
            '"porte-fiches"',
            '"fichier-bois"',
            '"classeur-anneaux"',
            '"tube-plans"',
            '"boite-photographies"',
            '"bobine-film-archive"',
            '"lecteur-microfilm"',
            '"tampon-dateur"',
            '"presse-a-sec"',
            '"gants-conservation"',
            '"loupe-archiviste"',
            '"pinceau-depoussierage"',
            '"scanner-documents"',
            '"thermo-hygrometre"',
        ],
        description:
            "Objets de classement, consultation, datation et conservation des archives.",
    },
    {
        name: 'SymbolSlug<"general", "ecriture">',
        values: [
            '"carnet-travail"',
            '"crayon-bleu"',
            '"machine-a-ecrire"',
            '"manuscrit-corrige"',
            '"plume-ecriture"',
            '"stylo-plume"',
            '"storyboard"',
            '"bloc-notes"',
            '"presse-typographique"',
            '"marque-page"',
            '"encrier"',
            '"pile-epreuves"',
        ],
        description:
            "Outils de conception, correction, mise en forme et transmission des idées.",
    },
    {
        name: 'SymbolSlug<"general", "exploration">',
        values: [
            '"boussole-orientation"',
            '"carte-depliee"',
            '"jumelles-observation"',
            '"porte-entrouverte"',
            '"longue-vue"',
            '"telescope-exploration"',
            '"lanterne-parcours"',
            '"cle-passage"',
            '"panneau-indicateur"',
            '"balise-cheminement"',
            '"sacoche-explorateur"',
            '"carnet-terrain"',
            '"cairn-reperage"',
            '"carte-balises-reliees"',
            '"fanion-decouverte"',
            '"passage-sous-arche"',
        ],
        description:
            "Repères de découverte, orientation, parcours et mise en relation.",
    },
    {
        name: 'SymbolSlug<"general", "temps">',
        values: [
            '"horloge-studio"',
            '"sablier-precision"',
            '"calendrier-perpetuel"',
            '"chronometre-production"',
            '"montre-poche"',
            '"horloge-clapets"',
            '"ephemeride"',
            '"cadran-chronologique"',
            '"compteur-dates"',
            '"frise-mecanique"',
            '"ligne-temps-jalons"',
            '"capsule-temporelle"',
            '"roue-saisons"',
            '"pendule-precision"',
            '"selecteur-periode"',
            '"ruban-chronologique"',
        ],
        description:
            "Repères chronologiques, instruments de mesure et objets de datation.",
    },
    {
        name: 'SymbolSlug<"general", "atelier">',
        values: [
            '"boite-outils-ouverte"',
            '"pot-outils-creatifs"',
            '"palette-atelier"',
            '"regle-t-equerre"',
            '"compas-dessin"',
            '"cutter-precision"',
            '"rouleau-papier"',
            '"planche-dessin-inclinee"',
            '"lampe-atelier"',
            '"nuancier-matieres"',
            '"tablier-artiste"',
            '"serre-joints"',
            '"devidoir-ruban-masquage"',
            '"plateau-fournitures"',
            '"etau-precision"',
            '"tiroir-atelier-ouvert"',
        ],
        description:
            "Outils transversaux de fabrication, dessin, découpe et organisation de l’atelier.",
    },
    {
        name: 'SymbolSlug<"general", "evenements">',
        values: [
            '"invitation-gaufree"',
            '"accreditation-evenement"',
            '"programme-manifestation"',
            '"corde-velours"',
            '"billet-cinema"',
            '"projecteur-premiere"',
            '"trophee-generique"',
            '"fanion-festival"',
            '"pupitre"',
            '"affiche-encadree"',
            '"bracelet-acces"',
            '"plaque-commemorative"',
            '"tapis-premiere"',
            '"ruban-inaugural-ciseaux"',
            '"arche-entree"',
            '"livre-or"',
            '"urne-prix-public"',
        ],
        description:
            "Objets d’accueil, de cérémonie, de festival, de première et de commémoration.",
    },
    {
        name: 'SymbolSlug<"general", "communication">',
        values: [
            '"enveloppe-correspondance"',
            '"dossier-presse"',
            '"megaphone-promotion"',
            '"telephone-bureau"',
            '"microphones-presse"',
            '"communique-officiel"',
            '"telegramme-plie"',
            '"poste-radio"',
            '"antenne-diffusion"',
            '"carte-postale-illustree"',
            '"tube-affiche"',
            '"presentoir-brochures"',
            '"boite-lettres"',
            '"panneau-annonce"',
            '"casier-correspondance"',
            '"borne-information"',
        ],
        description:
            "Objets de correspondance, presse, promotion, diffusion et information.",
    },
    {
        name: 'SymbolSlug<"techniques", "animation">',
        values: [
            '"camera-banc-titre"',
            '"camera-multiplane"',
            '"camera-pencil-test"',
            '"cellulo-peint"',
            '"crayons-animation"',
            '"disque-animation"',
            '"feuille-animation"',
            '"feuille-exposition"',
            '"kit-encrage-cellulo"',
            '"metronome-synchronisation"',
            '"pile-cellulos"',
            '"planche-modele"',
            '"regle-a-tenons"',
            '"rotoscope"',
            '"station-caps"',
            '"table-lumineuse"',
            '"taille-crayon-mecanique"',
            '"xerographie"',
        ],
        description: "Outils et procédés de la chaîne de l’animation.",
    },
    {
        name: 'SymbolSlug<"techniques", "images">',
        values: [
            '"objectif-iris"',
            '"posemetre"',
            '"filtres-optiques"',
            '"viseur-composition"',
            '"matte-painting"',
            '"retroprojection"',
            '"perspective-forcee"',
            '"maquette-miniature"',
            '"fond-bleu"',
            '"incrustation-sodium"',
            '"tireuse-optique"',
            '"compositing-calques"',
            '"cache-contre-cache"',
            '"etalonnage"',
            '"scanner-pellicule"',
            '"restauration-image"',
        ],
        description: "Outils de prise de vues, compositing et restauration.",
    },
    {
        name: 'SymbolSlug<"techniques", "couleur">',
        values: [
            '"cercle-chromatique"',
            '"nuancier-production"',
            '"palette-harmonique"',
            '"charte-colorimetrique"',
            '"teintage-pellicule"',
            '"virage-pellicule"',
            '"colorisation-pochoir"',
            '"separation-trichrome"',
            '"prisme-trichrome"',
            '"camera-trois-bandes"',
            '"matrices-colorants"',
            '"transfert-colorants"',
            '"color-script"',
            '"palette-personnage"',
            '"densitometre"',
            '"calibration-ecran"',
        ],
        description:
            "Outils de conception, production et contrôle des couleurs.",
    },
    {
        name: 'SymbolSlug<"techniques", "son">',
        values: [
            '"microphone-ruban"',
            '"enregistreur-optique"',
            '"synchroniseur-image-son"',
            '"console-mixage"',
            '"microphone-condensateur"',
            '"perche-studio"',
            '"paravent-acoustique"',
            '"graveur-disque"',
            '"magnetophone-bande"',
            '"matrice-multicanale"',
            '"piste-densite-variable"',
            '"piste-surface-variable"',
            '"generateur-click-track"',
            '"banc-montage-son"',
            '"reverberation-plaque"',
            '"atelier-bruitage"',
        ],
        description:
            "Outils d’enregistrement, synchronisation, montage et bruitage.",
    },
    {
        name: 'SymbolSlug<"techniques", "effets">',
        values: [
            '"verre-matte-painting"',
            '"cuve-effets-aquatiques"',
            '"canon-particules"',
            '"machine-fumee"',
            '"generateur-eclairs"',
            '"rampe-pluie"',
            '"soufflerie-plateau"',
            '"projecteur-flammes"',
            '"bassin-tempete-miniature"',
            '"plateau-miniature"',
            '"mecanisme-destruction-miniature"',
            '"tambour-nuages"',
            '"disque-halo-lumineux"',
            '"banc-surimpression"',
            '"station-incrustation"',
            '"simulateur-particules-numeriques"',
        ],
        description:
            "Outils d’effets physiques, optiques et numériques de plateau.",
    },
    {
        name: 'SymbolSlug<"techniques", "imagineering">',
        values: [
            '"table-plans-techniques"',
            '"maquette-conceptuelle"',
            '"audio-animatronic-generique"',
            '"panneau-controle-attraction"',
            '"vehicule-parcours-guide"',
            '"module-rail-aiguillage"',
            '"plateforme-mouvement"',
            '"maquette-circulation-visiteurs"',
            '"facade-perspective-forcee"',
            '"echantillon-roche-sculptee"',
            '"decor-escamotable"',
            '"banc-illusion-optique"',
            '"console-programmation-spectacle"',
            '"rack-show-control"',
            '"banc-essai-animatronic"',
            '"poste-diagnostic-maintenance"',
        ],
        description:
            "Outils de conception, programmation, illusion et maintenance des attractions.",
    },
    {
        name: 'SymbolSlug<"recompenses", "trophees">',
        values: [
            '"statuette-oscar"',
            '"plaque-technique-multiplane"',
            '"medaille-societe-des-nations"',
            '"medaille-or-venise"',
        ],
        description: "Symboles des trophées présents dans les archives.",
    },
    {
        name: 'SymbolSlug<"index", "createurs">',
        values: [
            '"principal"',
            '"origines"',
            '"formation"',
            '"debuts"',
            '"pratique"',
            '"signature"',
            '"collaborations"',
            '"trajectoire"',
            '"transmission"',
        ],
        description: "Symboles principaux et éditoriaux de l’Index Créateurs.",
    },
    {
        name: 'SymbolSlug<"index", "epoques">',
        values: [
            '"principal"',
            '"fondations"',
            '"transitions"',
            '"mutations"',
            '"tensions"',
            '"ruptures"',
            '"innovations"',
            '"reperes"',
            '"heritage"',
        ],
        description: "Symboles principaux et éditoriaux de l’Index Époques.",
    },
    {
        name: 'SymbolSlug<"index", "oeuvres">',
        values: [
            '"principal"',
            '"genese"',
            '"fabrication"',
            '"repere"',
            '"langage"',
            '"relations"',
            '"diffusion"',
            '"reception"',
            '"heritage"',
        ],
        description: "Symboles principaux et éditoriaux de l’Index Œuvres.",
    },
    {
        name: 'SymbolSlug<"index", "personnages">',
        values: [
            '"principal"',
            '"genese"',
            '"apparence"',
            '"caractere"',
            '"gestuelle"',
            '"voix"',
            '"relations"',
            '"trajectoire"',
            '"heritage"',
        ],
        description:
            "Symboles principaux et éditoriaux de l’Index Personnages.",
    },
] as const;

function CodeExemple({ children }: Readonly<{ children: string }>) {
    return <AtelierCodeBlock>{children}</AtelierCodeBlock>;
}

function TitreSequence({
    id,
    surTitre,
    titre,
    description,
}: Readonly<{
    id: string;
    surTitre: string;
    titre: string;
    description?: string;
}>) {
    return (
        <div>
            <p className="text-xs font-medium font-eyebrow uppercase tracking-[0.18em] text-muted">
                {surTitre}
            </p>
            <h3 id={id} className="mt-3 text-3xl text-ink">
                {titre}
            </h3>
            {description ? (
                <p className="mt-4 leading-7 text-ink-soft">{description}</p>
            ) : null}
        </div>
    );
}

export function PixieSymbolDossier() {
    return (
        <AtelierFicheAccessoire
            id="pixie-symbol"
            labelledBy="pixie-symbol-title"
            nom="PixieSymbol"
            className="mt-20 scroll-mt-8"
            header={
                <div className="grid gap-px bg-line md:grid-cols-[1fr_auto]">
                    <div className="bg-surface p-6 sm:p-8">
                        <p className="text-xs font-medium font-eyebrow uppercase tracking-[0.2em] text-accent">
                            Le clap · Accessoire 001
                        </p>
                        <h2
                            id="pixie-symbol-title"
                            className="mt-4 text-4xl text-ink sm:text-5xl"
                        >
                            PixieSymbol
                        </h2>
                        <p className="mt-4 max-w-2xl text-lg leading-8 text-ink-soft">
                            Résoudre et projeter les symboles de tous les
                            registres sans exposer leur chemin ni leur couleur à
                            l’écran qui les utilise.
                        </p>
                    </div>

                    <dl className="grid min-w-64 grid-cols-2 gap-px bg-line md:grid-cols-1">
                        <div className="bg-surface-muted px-6 py-4">
                            <dt className="text-xs font-eyebrow uppercase tracking-[0.16em] text-muted">
                                Version
                            </dt>
                            <dd className="mt-1 font-mono text-sm text-ink">
                                1.0.0
                            </dd>
                        </div>
                        <div className="bg-surface-muted px-6 py-4">
                            <dt className="text-xs font-eyebrow uppercase tracking-[0.16em] text-muted">
                                État
                            </dt>
                            <dd className="mt-1 text-sm font-medium">
                                <AtelierStatut statut="Prêt à projeter" />
                            </dd>
                        </div>
                    </dl>
                </div>
            }
        >
            <section aria-labelledby="pixie-symbol-identite" className="mt-14">
                <TitreSequence
                    id="pixie-symbol-identite"
                    surTitre="Fiche de rôle"
                    titre="Une porte unique vers le registre"
                    description="Le composant reçoit un registre, une collection et un slug stables, retrouve son image, son libellé et sa couleur, puis applique une taille et une stratégie d’accessibilité cohérentes."
                />

                <dl className="mt-7 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
                    {[
                        ["Mission", "Afficher un symbole typé."],
                        ["Sélection", "registry · collection · slug"],
                        ["Exemple", "index.personnages.principal"],
                        [
                            "Masters",
                            "Vingt et une séries originales · 1254 px.",
                        ],
                        ["Dérivés", "PNG transparent · 384 px."],
                        ["Accessibilité", "Décoratif par défaut."],
                    ].map(([terme, definition]) => (
                        <div key={terme} className="bg-surface p-5">
                            <dt className="text-xs font-eyebrow uppercase tracking-[0.16em] text-muted">
                                {terme}
                            </dt>
                            <dd className="mt-2 leading-7 text-ink-soft">
                                {definition}
                            </dd>
                        </div>
                    ))}
                </dl>
            </section>

            <section
                aria-labelledby="pixie-symbol-plan"
                className="mt-16 border border-line-strong bg-surface-muted p-6 shadow-soft sm:p-8"
            >
                <TitreSequence
                    id="pixie-symbol-plan"
                    surTitre="Plan maître"
                    titre="Trois coordonnées, un symbole"
                    description="Le registre global dirige vers une collection spécialisée ; l’écran ne fournit que ces coordonnées et les options de rendu."
                />

                <div className="mt-7 grid border border-line lg:grid-cols-2">
                    <div className="flex min-h-72 items-center justify-center bg-surface p-8">
                        <PixieSymbol
                            registry="index"
                            collection="personnages"
                            slug="principal"
                            size="xl"
                        />
                    </div>
                    <CodeExemple>{`<PixieSymbol
    registry="index"
    collection="personnages"
    slug="principal"
    size="xl"
/>`}</CodeExemple>
                </div>
            </section>

            <section
                aria-labelledby="pixie-symbol-general-logos"
                className="mt-16"
            >
                <TitreSequence
                    id="pixie-symbol-general-logos"
                    surTitre="Distribution"
                    titre="Le logo général du Codex"
                    description="La boussole enchantée réunit le livre, le crayon et la baguette pour identifier Le Codex du Disneyiste dans tous ses espaces."
                />

                <div className="mt-7 grid max-w-sm gap-px overflow-hidden border border-line bg-line">
                    {generalLogoSymbolSlugs.map((slug) => {
                        const symbole = getSymbol("general", "logos", slug);

                        return (
                            <article
                                key={slug}
                                className="bg-surface p-6 text-center"
                                style={{
                                    borderTop: `4px solid ${symbole.accent}`,
                                }}
                            >
                                <PixieSymbol
                                    registry="general"
                                    collection="logos"
                                    slug={slug}
                                    size="xl"
                                    className="mx-auto"
                                />
                                <h4 className="mt-5 text-xl text-ink">
                                    {symbole.label}
                                </h4>
                                <p className="mt-2 font-mono text-xs text-muted">
                                    {slug}
                                </p>
                            </article>
                        );
                    })}
                </div>
            </section>

            <section
                aria-labelledby="pixie-symbol-general-cinema"
                className="mt-16"
            >
                <TitreSequence
                    id="pixie-symbol-general-cinema"
                    surTitre="Distribution"
                    titre="Les accessoires du cinéma"
                    description="Clap, caméra, projecteurs, pellicule, son, scénario et salle composent un vocabulaire général réutilisable partout où le Codex parle de cinéma."
                />

                <div className="mt-7 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2 lg:grid-cols-5">
                    {generalCinemaSymbolSlugs.map((slug) => {
                        const symbole = getSymbol("general", "cinema", slug);

                        return (
                            <article
                                key={slug}
                                className="bg-surface p-6 text-center"
                                style={{
                                    borderTop: `4px solid ${symbole.accent}`,
                                }}
                            >
                                <PixieSymbol
                                    registry="general"
                                    collection="cinema"
                                    slug={slug}
                                    size="xl"
                                    className="mx-auto"
                                />
                                <h4 className="mt-5 text-xl text-ink">
                                    {symbole.label}
                                </h4>
                                <p className="mt-2 font-mono text-xs text-muted">
                                    {slug}
                                </p>
                            </article>
                        );
                    })}
                </div>
            </section>

            <section
                aria-labelledby="pixie-symbol-general-archives"
                className="mt-16"
            >
                <TitreSequence
                    id="pixie-symbol-general-archives"
                    surTitre="Distribution"
                    titre="Les archives prennent forme"
                    description="Boîtes, dossiers, registres, supports de consultation et instruments de conservation forment un vocabulaire neutre pour classer, dater, examiner et préserver la mémoire du Codex."
                />

                <div className="mt-7 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2 lg:grid-cols-6">
                    {generalArchiveSymbolSlugs.map((slug) => {
                        const symbole = getSymbol("general", "archives", slug);

                        return (
                            <article
                                key={slug}
                                className="bg-surface p-6 text-center"
                                style={{
                                    borderTop: `4px solid ${symbole.accent}`,
                                }}
                            >
                                <PixieSymbol
                                    registry="general"
                                    collection="archives"
                                    slug={slug}
                                    size="xl"
                                    className="mx-auto"
                                />
                                <h4 className="mt-5 text-xl text-ink">
                                    {symbole.label}
                                </h4>
                                <p className="mt-2 font-mono text-xs text-muted">
                                    {slug}
                                </p>
                            </article>
                        );
                    })}
                </div>
            </section>

            <section
                aria-labelledby="pixie-symbol-general-ecriture"
                className="mt-16"
            >
                <TitreSequence
                    id="pixie-symbol-general-ecriture"
                    surTitre="Distribution"
                    titre="Les idées passent à l’écrit"
                    description="Carnets, crayons, plumes, manuscrits, notes et outils d’impression accompagnent les idées depuis leur première formulation jusqu’à leur correction et leur transmission."
                />

                <div className="mt-7 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
                    {generalEcritureSymbolSlugs.map((slug) => {
                        const symbole = getSymbol("general", "ecriture", slug);

                        return (
                            <article
                                key={slug}
                                className="bg-surface p-6 text-center"
                                style={{
                                    borderTop: `4px solid ${symbole.accent}`,
                                }}
                            >
                                <PixieSymbol
                                    registry="general"
                                    collection="ecriture"
                                    slug={slug}
                                    size="xl"
                                    className="mx-auto"
                                />
                                <h4 className="mt-5 text-xl text-ink">
                                    {symbole.label}
                                </h4>
                                <p className="mt-2 font-mono text-xs text-muted">
                                    {slug}
                                </p>
                            </article>
                        );
                    })}
                </div>
            </section>

            <section
                aria-labelledby="pixie-symbol-general-exploration"
                className="mt-16"
            >
                <TitreSequence
                    id="pixie-symbol-general-exploration"
                    surTitre="Distribution"
                    titre="Le Codex ouvre ses chemins"
                    description="Boussole, cartes, instruments d’observation, balises et passages composent un vocabulaire de découverte pour orienter les parcours, relier les contenus et signaler de nouveaux imaginaires."
                />

                <div className="mt-7 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
                    {generalExplorationSymbolSlugs.map((slug) => {
                        const symbole = getSymbol(
                            "general",
                            "exploration",
                            slug,
                        );

                        return (
                            <article
                                key={slug}
                                className="bg-surface p-6 text-center"
                                style={{
                                    borderTop: `4px solid ${symbole.accent}`,
                                }}
                            >
                                <PixieSymbol
                                    registry="general"
                                    collection="exploration"
                                    slug={slug}
                                    size="xl"
                                    className="mx-auto"
                                />
                                <h4 className="mt-5 text-xl text-ink">
                                    {symbole.label}
                                </h4>
                                <p className="mt-2 font-mono text-xs text-muted">
                                    {slug}
                                </p>
                            </article>
                        );
                    })}
                </div>
            </section>

            <section
                aria-labelledby="pixie-symbol-general-temps"
                className="mt-16"
            >
                <TitreSequence
                    id="pixie-symbol-general-temps"
                    surTitre="Distribution"
                    titre="Le Codex donne rendez-vous au temps"
                    description="Horloges, calendriers, chronomètres, jalons et capsules composent un vocabulaire chronologique neutre pour dater les événements, parcourir les époques et rendre visibles les transformations."
                />

                <div className="mt-7 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
                    {generalTempsSymbolSlugs.map((slug) => {
                        const symbole = getSymbol("general", "temps", slug);

                        return (
                            <article
                                key={slug}
                                className="bg-surface p-6 text-center"
                                style={{
                                    borderTop: `4px solid ${symbole.accent}`,
                                }}
                            >
                                <PixieSymbol
                                    registry="general"
                                    collection="temps"
                                    slug={slug}
                                    size="xl"
                                    className="mx-auto"
                                />
                                <h4 className="mt-5 text-xl text-ink">
                                    {symbole.label}
                                </h4>
                                <p className="mt-2 font-mono text-xs text-muted">
                                    {slug}
                                </p>
                            </article>
                        );
                    })}
                </div>
            </section>

            <section
                aria-labelledby="pixie-symbol-general-atelier"
                className="mt-16"
            >
                <TitreSequence
                    id="pixie-symbol-general-atelier"
                    surTitre="Distribution"
                    titre="Le Codex ouvre son atelier"
                    description="Boîte à outils, instruments de dessin, fournitures et équipements de travail forment un vocabulaire transversal pour évoquer la fabrication artistique sans se confondre avec les collections techniques."
                />

                <div className="mt-7 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
                    {generalAtelierSymbolSlugs.map((slug) => {
                        const symbole = getSymbol("general", "atelier", slug);

                        return (
                            <article
                                key={slug}
                                className="bg-surface p-6 text-center"
                                style={{
                                    borderTop: `4px solid ${symbole.accent}`,
                                }}
                            >
                                <PixieSymbol
                                    registry="general"
                                    collection="atelier"
                                    slug={slug}
                                    size="xl"
                                    className="mx-auto"
                                />
                                <h4 className="mt-5 text-xl text-ink">
                                    {symbole.label}
                                </h4>
                                <p className="mt-2 font-mono text-xs text-muted">
                                    {slug}
                                </p>
                            </article>
                        );
                    })}
                </div>
            </section>

            <section
                aria-labelledby="pixie-symbol-general-evenements"
                className="mt-16"
            >
                <TitreSequence
                    id="pixie-symbol-general-evenements"
                    surTitre="Distribution"
                    titre="Le Codex entre en scène"
                    description="Invitations, accréditations, programmes, cérémonies et objets de première composent un vocabulaire événementiel pour annoncer les sorties, accompagner les festivals et conserver la mémoire des célébrations."
                />

                <div className="mt-7 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
                    {generalEvenementsSymbolSlugs.map((slug) => {
                        const symbole = getSymbol(
                            "general",
                            "evenements",
                            slug,
                        );

                        return (
                            <article
                                key={slug}
                                className="bg-surface p-6 text-center"
                                style={{
                                    borderTop: `4px solid ${symbole.accent}`,
                                }}
                            >
                                <PixieSymbol
                                    registry="general"
                                    collection="evenements"
                                    slug={slug}
                                    size="xl"
                                    className="mx-auto"
                                />
                                <h4 className="mt-5 text-xl text-ink">
                                    {symbole.label}
                                </h4>
                                <p className="mt-2 font-mono text-xs text-muted">
                                    {slug}
                                </p>
                            </article>
                        );
                    })}
                </div>
            </section>

            <section
                aria-labelledby="pixie-symbol-general-communication"
                className="mt-16"
            >
                <TitreSequence
                    id="pixie-symbol-general-communication"
                    surTitre="Distribution"
                    titre="Le Codex fait circuler les nouvelles"
                    description="Correspondance, presse, promotion et diffusion composent un vocabulaire de communication neutre pour annoncer, documenter et transmettre les informations autour des œuvres et de leurs histoires."
                />

                <div className="mt-7 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
                    {generalCommunicationSymbolSlugs.map((slug) => {
                        const symbole = getSymbol(
                            "general",
                            "communication",
                            slug,
                        );

                        return (
                            <article
                                key={slug}
                                className="bg-surface p-6 text-center"
                                style={{
                                    borderTop: `4px solid ${symbole.accent}`,
                                }}
                            >
                                <PixieSymbol
                                    registry="general"
                                    collection="communication"
                                    slug={slug}
                                    size="xl"
                                    className="mx-auto"
                                />
                                <h4 className="mt-5 text-xl text-ink">
                                    {symbole.label}
                                </h4>
                                <p className="mt-2 font-mono text-xs text-muted">
                                    {slug}
                                </p>
                            </article>
                        );
                    })}
                </div>
            </section>

            <section aria-labelledby="pixie-symbol-serie" className="mt-16">
                <TitreSequence
                    id="pixie-symbol-serie"
                    surTitre="Distribution"
                    titre="Cinq index, cinq directions artistiques"
                    description="Chaque collection réunit désormais son symbole principal et ses huit déclinaisons éditoriales. La couleur de famille assure la continuité tandis que la matière raconte le sujet propre à chaque index."
                />

                <div className="mt-7 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2 lg:grid-cols-5">
                    {indexCollections.map((collection) => {
                        const symbole = getSymbol(
                            "index",
                            collection,
                            "principal",
                        );

                        return (
                            <article
                                key={collection}
                                className="bg-surface p-6 text-center"
                                style={{
                                    borderTop: `4px solid ${symbole.accent}`,
                                }}
                            >
                                <PixieSymbol
                                    registry="index"
                                    collection={collection}
                                    slug="principal"
                                    size="xl"
                                    className="mx-auto"
                                />
                                <h4 className="mt-5 text-xl text-ink">
                                    {symbole.label}
                                </h4>
                                <p className="mt-2 font-mono text-xs text-muted">
                                    {collection}.principal
                                </p>
                            </article>
                        );
                    })}
                </div>
            </section>

            <section
                aria-labelledby="pixie-symbol-diffusion-salles"
                className="mt-16"
            >
                <TitreSequence
                    id="pixie-symbol-diffusion-salles"
                    surTitre="Diffusion"
                    titre="Les seize étapes de l’exploitation en salles"
                    description="De la façade au drive-in, la collection décrit les lieux, les équipements et les signes qui accompagnent une projection publique."
                />

                <div className="mt-7 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
                    {diffusionSallesSymbolSlugs.map((slug) => {
                        const symbole = getSymbol("diffusion", "salles", slug);

                        return (
                            <article
                                key={slug}
                                className="bg-surface p-6 text-center"
                                style={{
                                    borderTop: `4px solid ${symbole.accent}`,
                                }}
                            >
                                <PixieSymbol
                                    registry="diffusion"
                                    collection="salles"
                                    slug={slug}
                                    size="xl"
                                    className="mx-auto"
                                />
                                <h4 className="mt-5 text-xl text-ink">
                                    {symbole.label}
                                </h4>
                                <p className="mt-2 font-mono text-xs text-muted">
                                    {slug}
                                </p>
                            </article>
                        );
                    })}
                </div>
            </section>

            <section
                aria-labelledby="pixie-symbol-diffusion-television"
                className="mt-16"
            >
                <TitreSequence
                    id="pixie-symbol-diffusion-television"
                    surTitre="Diffusion"
                    titre="Les seize formes de la diffusion télévisée"
                    description="Postes, antennes, régies et programmes composent le parcours d’une œuvre depuis l’émission jusqu’à sa réception domestique."
                />

                <div className="mt-7 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
                    {diffusionTelevisionSymbolSlugs.map((slug) => {
                        const symbole = getSymbol(
                            "diffusion",
                            "television",
                            slug,
                        );

                        return (
                            <article
                                key={slug}
                                className="bg-surface p-6 text-center"
                                style={{
                                    borderTop: `4px solid ${symbole.accent}`,
                                }}
                            >
                                <PixieSymbol
                                    registry="diffusion"
                                    collection="television"
                                    slug={slug}
                                    size="xl"
                                    className="mx-auto"
                                />
                                <h4 className="mt-5 text-xl text-ink">
                                    {symbole.label}
                                </h4>
                                <p className="mt-2 font-mono text-xs text-muted">
                                    {slug}
                                </p>
                            </article>
                        );
                    })}
                </div>
            </section>

            <section
                aria-labelledby="pixie-symbol-diffusion-video"
                className="mt-16"
            >
                <TitreSequence
                    id="pixie-symbol-diffusion-video"
                    surTitre="Diffusion"
                    titre="Les seize supports du cinéma à domicile"
                    description="Cassettes, disques, lecteurs et éditions racontent l’histoire matérielle du visionnage domestique et de la vidéothèque."
                />

                <div className="mt-7 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
                    {diffusionVideoSymbolSlugs.map((slug) => {
                        const symbole = getSymbol("diffusion", "video", slug);

                        return (
                            <article
                                key={slug}
                                className="bg-surface p-6 text-center"
                                style={{
                                    borderTop: `4px solid ${symbole.accent}`,
                                }}
                            >
                                <PixieSymbol
                                    registry="diffusion"
                                    collection="video"
                                    slug={slug}
                                    size="xl"
                                    className="mx-auto"
                                />
                                <h4 className="mt-5 text-xl text-ink">
                                    {symbole.label}
                                </h4>
                                <p className="mt-2 font-mono text-xs text-muted">
                                    {slug}
                                </p>
                            </article>
                        );
                    })}
                </div>
            </section>

            <section
                aria-labelledby="pixie-symbol-diffusion-numerique"
                className="mt-16"
            >
                <TitreSequence
                    id="pixie-symbol-diffusion-numerique"
                    surTitre="Diffusion"
                    titre="Les seize accès de la diffusion numérique"
                    description="Plateformes, appareils, catalogues et flux rendent lisibles les nouvelles vies dématérialisées d’une œuvre."
                />

                <div className="mt-7 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
                    {diffusionNumeriqueSymbolSlugs.map((slug) => {
                        const symbole = getSymbol(
                            "diffusion",
                            "numerique",
                            slug,
                        );

                        return (
                            <article
                                key={slug}
                                className="bg-surface p-6 text-center"
                                style={{
                                    borderTop: `4px solid ${symbole.accent}`,
                                }}
                            >
                                <PixieSymbol
                                    registry="diffusion"
                                    collection="numerique"
                                    slug={slug}
                                    size="xl"
                                    className="mx-auto"
                                />
                                <h4 className="mt-5 text-xl text-ink">
                                    {symbole.label}
                                </h4>
                                <p className="mt-2 font-mono text-xs text-muted">
                                    {slug}
                                </p>
                            </article>
                        );
                    })}
                </div>
            </section>

            <section
                aria-labelledby="pixie-symbol-diffusion-scene-et-parcs"
                className="mt-16"
            >
                <TitreSequence
                    id="pixie-symbol-diffusion-scene-et-parcs"
                    surTitre="Diffusion"
                    titre="Les seize scènes des spectacles et des parcs"
                    description="Scènes, attractions, expositions et parcours prolongent les œuvres dans des expériences publiques et des territoires scénographiés."
                />

                <div className="mt-7 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
                    {diffusionSceneEtParcsSymbolSlugs.map((slug) => {
                        const symbole = getSymbol(
                            "diffusion",
                            "scene-et-parcs",
                            slug,
                        );

                        return (
                            <article
                                key={slug}
                                className="bg-surface p-6 text-center"
                                style={{
                                    borderTop: `4px solid ${symbole.accent}`,
                                }}
                            >
                                <PixieSymbol
                                    registry="diffusion"
                                    collection="scene-et-parcs"
                                    slug={slug}
                                    size="xl"
                                    className="mx-auto"
                                />
                                <h4 className="mt-5 text-xl text-ink">
                                    {symbole.label}
                                </h4>
                                <p className="mt-2 font-mono text-xs text-muted">
                                    {slug}
                                </p>
                            </article>
                        );
                    })}
                </div>
            </section>

            <section
                aria-labelledby="pixie-symbol-sources-supports"
                className="mt-16"
            >
                <TitreSequence
                    id="pixie-symbol-sources-supports"
                    surTitre="Sources"
                    titre="Les seize supports de la matière documentaire"
                    description="Livre, presse, pellicule, bande et fichier numérique identifient la forme matérielle ou technique sous laquelle une source nous parvient."
                />

                <div className="mt-7 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
                    {sourceSupportsSymbolSlugs.map((slug) => {
                        const symbole = getSymbol("sources", "supports", slug);

                        return (
                            <article
                                key={slug}
                                className="bg-surface p-6 text-center"
                                style={{
                                    borderTop: `4px solid ${symbole.accent}`,
                                }}
                            >
                                <PixieSymbol
                                    registry="sources"
                                    collection="supports"
                                    slug={slug}
                                    size="xl"
                                    className="mx-auto"
                                />
                                <h4 className="mt-5 text-xl text-ink">
                                    {symbole.label}
                                </h4>
                                <p className="mt-2 font-mono text-xs text-muted">
                                    {slug}
                                </p>
                            </article>
                        );
                    })}
                </div>
            </section>

            <section
                aria-labelledby="pixie-symbol-sources-documents"
                className="mt-16"
            >
                <TitreSequence
                    id="pixie-symbol-sources-documents"
                    surTitre="Sources"
                    titre="Les seize documents qui portent la preuve"
                    description="Correspondance, contrats, scénarios, documents de production et recherches distinguent la nature précise de chaque témoignage conservé par le Codex."
                />

                <div className="mt-7 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
                    {sourceDocumentsSymbolSlugs.map((slug) => {
                        const symbole = getSymbol("sources", "documents", slug);

                        return (
                            <article
                                key={slug}
                                className="bg-surface p-6 text-center"
                                style={{
                                    borderTop: `4px solid ${symbole.accent}`,
                                }}
                            >
                                <PixieSymbol
                                    registry="sources"
                                    collection="documents"
                                    slug={slug}
                                    size="xl"
                                    className="mx-auto"
                                />
                                <h4 className="mt-5 text-xl text-ink">
                                    {symbole.label}
                                </h4>
                                <p className="mt-2 font-mono text-xs text-muted">
                                    {slug}
                                </p>
                            </article>
                        );
                    })}
                </div>
            </section>

            <section
                aria-labelledby="pixie-symbol-sources-archives"
                className="mt-16"
            >
                <TitreSequence
                    id="pixie-symbol-sources-archives"
                    surTitre="Sources"
                    titre="Les seize repères du classement archivistique"
                    description="Cotes, inventaires, contenants et instruments de consultation rendent visibles la provenance et la localisation documentaire d’une source."
                />

                <div className="mt-7 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
                    {sourceArchivesSymbolSlugs.map((slug) => {
                        const symbole = getSymbol("sources", "archives", slug);

                        return (
                            <article
                                key={slug}
                                className="bg-surface p-6 text-center"
                                style={{
                                    borderTop: `4px solid ${symbole.accent}`,
                                }}
                            >
                                <PixieSymbol
                                    registry="sources"
                                    collection="archives"
                                    slug={slug}
                                    size="xl"
                                    className="mx-auto"
                                />
                                <h4 className="mt-5 text-xl text-ink">
                                    {symbole.label}
                                </h4>
                                <p className="mt-2 font-mono text-xs text-muted">
                                    {slug}
                                </p>
                            </article>
                        );
                    })}
                </div>
            </section>

            <section
                aria-labelledby="pixie-symbol-sources-conservation"
                className="mt-16"
            >
                <TitreSequence
                    id="pixie-symbol-sources-conservation"
                    surTitre="Sources"
                    titre="Les seize gestes de la conservation"
                    description="Manipulation, protection, nettoyage, numérisation et contrôle climatique composent le vocabulaire précis de la préservation des sources."
                />

                <div className="mt-7 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
                    {sourceConservationSymbolSlugs.map((slug) => {
                        const symbole = getSymbol(
                            "sources",
                            "conservation",
                            slug,
                        );

                        return (
                            <article
                                key={slug}
                                className="bg-surface p-6 text-center"
                                style={{
                                    borderTop: `4px solid ${symbole.accent}`,
                                }}
                            >
                                <PixieSymbol
                                    registry="sources"
                                    collection="conservation"
                                    slug={slug}
                                    size="xl"
                                    className="mx-auto"
                                />
                                <h4 className="mt-5 text-xl text-ink">
                                    {symbole.label}
                                </h4>
                                <p className="mt-2 font-mono text-xs text-muted">
                                    {slug}
                                </p>
                            </article>
                        );
                    })}
                </div>
            </section>

            <section
                aria-labelledby="pixie-symbol-recompenses-trophees"
                className="mt-16"
            >
                <TitreSequence
                    id="pixie-symbol-recompenses-trophees"
                    surTitre="Distribution"
                    titre="Les quatre trophées des premières archives"
                    description="Statuette, plaque technique et médailles internationales distinguent les formes de récompenses déjà documentées sans créer un symbole propre à chaque attribution."
                />

                <div className="mt-7 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
                    {recompenseTrophySymbolSlugs.map((slug) => {
                        const symbole = getSymbol(
                            "recompenses",
                            "trophees",
                            slug,
                        );

                        return (
                            <article
                                key={slug}
                                className="bg-surface p-6 text-center"
                                style={{
                                    borderTop: `4px solid ${symbole.accent}`,
                                }}
                            >
                                <PixieSymbol
                                    registry="recompenses"
                                    collection="trophees"
                                    slug={slug}
                                    size="xl"
                                    className="mx-auto"
                                />
                                <h4 className="mt-5 text-xl text-ink">
                                    {symbole.label}
                                </h4>
                                <p className="mt-2 font-mono text-xs text-muted">
                                    {slug}
                                </p>
                            </article>
                        );
                    })}
                </div>
            </section>

            <section
                aria-labelledby="pixie-symbol-techniques-animation"
                className="mt-16"
            >
                <TitreSequence
                    id="pixie-symbol-techniques-animation"
                    surTitre="Distribution"
                    titre="La chaîne technique de l’animation"
                    description="Du dessin sur papier à l’encrage, au tournage, à la xérographie et à la mise en couleur numérique, les outils situent chaque étape de fabrication sans se confondre avec les accessoires généraux du cinéma."
                />

                <div className="mt-7 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2 lg:grid-cols-6">
                    {animationTechniqueSymbolSlugs.map((slug) => {
                        const symbole = getSymbol(
                            "techniques",
                            "animation",
                            slug,
                        );

                        return (
                            <article
                                key={slug}
                                className="bg-surface p-6 text-center"
                                style={{
                                    borderTop: `4px solid ${symbole.accent}`,
                                }}
                            >
                                <PixieSymbol
                                    registry="techniques"
                                    collection="animation"
                                    slug={slug}
                                    size="xl"
                                    className="mx-auto"
                                />
                                <h4 className="mt-5 text-xl text-ink">
                                    {symbole.label}
                                </h4>
                                <p className="mt-2 font-mono text-xs text-muted">
                                    {slug}
                                </p>
                            </article>
                        );
                    })}
                </div>
            </section>

            <section
                aria-labelledby="pixie-symbol-techniques-images"
                className="mt-16"
            >
                <TitreSequence
                    id="pixie-symbol-techniques-images"
                    surTitre="Distribution"
                    titre="La fabrique technique des images"
                    description="Objectifs, filtres, décors optiques, incrustations, compositing et restauration décrivent la construction de l’image depuis la prise de vues jusqu’à sa remise en état."
                />

                <div className="mt-7 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
                    {imageTechniqueSymbolSlugs.map((slug) => {
                        const symbole = getSymbol("techniques", "images", slug);

                        return (
                            <article
                                key={slug}
                                className="bg-surface p-6 text-center"
                                style={{
                                    borderTop: `4px solid ${symbole.accent}`,
                                }}
                            >
                                <PixieSymbol
                                    registry="techniques"
                                    collection="images"
                                    slug={slug}
                                    size="xl"
                                    className="mx-auto"
                                />
                                <h4 className="mt-5 text-xl text-ink">
                                    {symbole.label}
                                </h4>
                                <p className="mt-2 font-mono text-xs text-muted">
                                    {slug}
                                </p>
                            </article>
                        );
                    })}
                </div>
            </section>

            <section
                aria-labelledby="pixie-symbol-techniques-couleur"
                className="mt-16"
            >
                <TitreSequence
                    id="pixie-symbol-techniques-couleur"
                    surTitre="Distribution"
                    titre="La couleur entre en production"
                    description="Nuanciers, palettes, procédés trichromes, transferts et instruments de contrôle racontent la couleur depuis sa conception artistique jusqu’à sa restitution à l’écran."
                />

                <div className="mt-7 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
                    {couleurTechniqueSymbolSlugs.map((slug) => {
                        const symbole = getSymbol(
                            "techniques",
                            "couleur",
                            slug,
                        );

                        return (
                            <article
                                key={slug}
                                className="bg-surface p-6 text-center"
                                style={{
                                    borderTop: `4px solid ${symbole.accent}`,
                                }}
                            >
                                <PixieSymbol
                                    registry="techniques"
                                    collection="couleur"
                                    slug={slug}
                                    size="xl"
                                    className="mx-auto"
                                />
                                <h4 className="mt-5 text-xl text-ink">
                                    {symbole.label}
                                </h4>
                                <p className="mt-2 font-mono text-xs text-muted">
                                    {slug}
                                </p>
                            </article>
                        );
                    })}
                </div>
            </section>

            <section
                aria-labelledby="pixie-symbol-techniques-son"
                className="mt-16"
            >
                <TitreSequence
                    id="pixie-symbol-techniques-son"
                    surTitre="Distribution"
                    titre="Le son entre en studio"
                    description="Microphones, enregistrement optique et magnétique, synchronisation, mixage, montage et bruitage suivent la fabrication du son depuis le plateau jusqu’à la piste finale."
                />

                <div className="mt-7 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
                    {sonTechniqueSymbolSlugs.map((slug) => {
                        const symbole = getSymbol("techniques", "son", slug);

                        return (
                            <article
                                key={slug}
                                className="bg-surface p-6 text-center"
                                style={{
                                    borderTop: `4px solid ${symbole.accent}`,
                                }}
                            >
                                <PixieSymbol
                                    registry="techniques"
                                    collection="son"
                                    slug={slug}
                                    size="xl"
                                    className="mx-auto"
                                />
                                <h4 className="mt-5 text-xl text-ink">
                                    {symbole.label}
                                </h4>
                                <p className="mt-2 font-mono text-xs text-muted">
                                    {slug}
                                </p>
                            </article>
                        );
                    })}
                </div>
            </section>

            <section
                aria-labelledby="pixie-symbol-techniques-effets"
                className="mt-16"
            >
                <TitreSequence
                    id="pixie-symbol-techniques-effets"
                    surTitre="Distribution"
                    titre="Les effets entrent en scène"
                    description="Eau, fumée, pluie, vent, flammes, miniatures, surimpressions et particules réunissent les procédés physiques, optiques et numériques qui transforment le plateau et l’image."
                />

                <div className="mt-7 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
                    {effetsTechniqueSymbolSlugs.map((slug) => {
                        const symbole = getSymbol("techniques", "effets", slug);

                        return (
                            <article
                                key={slug}
                                className="bg-surface p-6 text-center"
                                style={{
                                    borderTop: `4px solid ${symbole.accent}`,
                                }}
                            >
                                <PixieSymbol
                                    registry="techniques"
                                    collection="effets"
                                    slug={slug}
                                    size="xl"
                                    className="mx-auto"
                                />
                                <h4 className="mt-5 text-xl text-ink">
                                    {symbole.label}
                                </h4>
                                <p className="mt-2 font-mono text-xs text-muted">
                                    {slug}
                                </p>
                            </article>
                        );
                    })}
                </div>
            </section>

            <section
                aria-labelledby="pixie-symbol-techniques-imagineering"
                className="mt-16"
            >
                <TitreSequence
                    id="pixie-symbol-techniques-imagineering"
                    surTitre="Distribution"
                    titre="L’imaginaire devient attraction"
                    description="Plans, maquettes, véhicules, décors, illusions, Audio-Animatronics et systèmes de contrôle suivent la transformation d’une idée en expérience physique, programmable et maintenable."
                />

                <div className="mt-7 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
                    {imagineeringTechniqueSymbolSlugs.map((slug) => {
                        const symbole = getSymbol(
                            "techniques",
                            "imagineering",
                            slug,
                        );

                        return (
                            <article
                                key={slug}
                                className="bg-surface p-6 text-center"
                                style={{
                                    borderTop: `4px solid ${symbole.accent}`,
                                }}
                            >
                                <PixieSymbol
                                    registry="techniques"
                                    collection="imagineering"
                                    slug={slug}
                                    size="xl"
                                    className="mx-auto"
                                />
                                <h4 className="mt-5 text-xl text-ink">
                                    {symbole.label}
                                </h4>
                                <p className="mt-2 font-mono text-xs text-muted">
                                    {slug}
                                </p>
                            </article>
                        );
                    })}
                </div>
            </section>

            <section
                aria-labelledby="pixie-symbol-index-personnages"
                className="mt-16"
            >
                <TitreSequence
                    id="pixie-symbol-index-personnages"
                    surTitre="Distribution"
                    titre="Les neuf scènes des Personnages"
                    description="Le symbole principal et huit lectures éditoriales suivent la naissance, l’apparence, le caractère, la gestuelle, la voix, les relations, la trajectoire et l’héritage d’un personnage."
                />

                <div className="mt-7 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-3">
                    {personnageIndexSymbolSlugs.map((slug) => {
                        const symbole = getSymbol("index", "personnages", slug);

                        return (
                            <article
                                key={slug}
                                className="bg-surface p-6 text-center"
                                style={{
                                    borderTop: `4px solid ${symbole.accent}`,
                                }}
                            >
                                <PixieSymbol
                                    registry="index"
                                    collection="personnages"
                                    slug={slug}
                                    size="xl"
                                    className="mx-auto"
                                />
                                <h4 className="mt-5 text-xl text-ink">
                                    {symbole.label}
                                </h4>
                                <p className="mt-2 font-mono text-xs text-muted">
                                    {slug}
                                </p>
                            </article>
                        );
                    })}
                </div>
            </section>

            <section
                aria-labelledby="pixie-symbol-index-createurs"
                className="mt-16"
            >
                <TitreSequence
                    id="pixie-symbol-index-createurs"
                    surTitre="Distribution"
                    titre="Les neuf gestes des Créateurs"
                    description="La lumière du geste relie le symbole principal aux origines, à la formation, aux débuts, à la pratique, à la signature, aux collaborations, à la trajectoire et à la transmission."
                />

                <div className="mt-7 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
                    {createurIndexSymbolSlugs.map((slug) => {
                        const symbole = getSymbol("index", "createurs", slug);

                        return (
                            <article
                                key={slug}
                                className="bg-surface p-6 text-center"
                                style={{
                                    borderTop: `4px solid ${symbole.accent}`,
                                }}
                            >
                                <PixieSymbol
                                    registry="index"
                                    collection="createurs"
                                    slug={slug}
                                    size="xl"
                                    className="mx-auto"
                                />
                                <h4 className="mt-5 text-xl text-ink">
                                    {symbole.label}
                                </h4>
                                <p className="mt-2 font-mono text-xs text-muted">
                                    {slug}
                                </p>
                            </article>
                        );
                    })}
                </div>
            </section>

            <section
                aria-labelledby="pixie-symbol-index-oeuvres"
                className="mt-16"
            >
                <TitreSequence
                    id="pixie-symbol-index-oeuvres"
                    surTitre="Distribution"
                    titre="Les neuf plans des Œuvres"
                    description="La bobine des imaginaires relie le symbole principal à la genèse, la fabrication, au repère, au langage, aux relations, à la diffusion, à la réception et à l’héritage."
                />

                <div className="mt-7 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-3">
                    {oeuvreIndexSymbolSlugs.map((slug) => {
                        const symbole = getSymbol("index", "oeuvres", slug);

                        return (
                            <article
                                key={slug}
                                className="bg-surface p-6 text-center"
                                style={{
                                    borderTop: `4px solid ${symbole.accent}`,
                                }}
                            >
                                <PixieSymbol
                                    registry="index"
                                    collection="oeuvres"
                                    slug={slug}
                                    size="xl"
                                    className="mx-auto"
                                />
                                <h4 className="mt-5 text-xl text-ink">
                                    {symbole.label}
                                </h4>
                                <p className="mt-2 font-mono text-xs text-muted">
                                    {slug}
                                </p>
                            </article>
                        );
                    })}
                </div>
            </section>

            <section
                aria-labelledby="pixie-symbol-index-epoques"
                className="mt-16"
            >
                <TitreSequence
                    id="pixie-symbol-index-epoques"
                    surTitre="Distribution"
                    titre="Les neuf vitrines des Époques"
                    description="Le musée des objets rend visible la progression du temps, des fondations aux transitions, mutations, tensions, ruptures, innovations, repères et héritages."
                />

                <div className="mt-7 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-3">
                    {epoqueIndexSymbolSlugs.map((slug) => {
                        const symbole = getSymbol("index", "epoques", slug);

                        return (
                            <article
                                key={slug}
                                className="bg-surface p-6 text-center"
                                style={{
                                    borderTop: `4px solid ${symbole.accent}`,
                                }}
                            >
                                <PixieSymbol
                                    registry="index"
                                    collection="epoques"
                                    slug={slug}
                                    size="xl"
                                    className="mx-auto"
                                />
                                <h4 className="mt-5 text-xl text-ink">
                                    {symbole.label}
                                </h4>
                                <p className="mt-2 font-mono text-xs text-muted">
                                    {slug}
                                </p>
                            </article>
                        );
                    })}
                </div>
            </section>

            <section
                aria-labelledby="pixie-symbol-index-chansons"
                className="mt-16"
            >
                <TitreSequence
                    id="pixie-symbol-index-chansons"
                    surTitre="Distribution"
                    titre="Les neuf mouvements des Chansons"
                    description="La chanson prend vie entre écriture, mélodie, arrangement, interprétation et fonction narrative, puis se prolonge par ses reprises et son héritage."
                />

                <div className="mt-7 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-3">
                    {chansonIndexSymbolSlugs.map((slug) => {
                        const symbole = getSymbol("index", "chansons", slug);

                        return (
                            <article
                                key={slug}
                                className="bg-surface p-6 text-center"
                                style={{
                                    borderTop: `4px solid ${symbole.accent}`,
                                }}
                            >
                                <PixieSymbol
                                    registry="index"
                                    collection="chansons"
                                    slug={slug}
                                    size="xl"
                                    className="mx-auto"
                                />
                                <h4 className="mt-5 text-xl text-ink">
                                    {symbole.label}
                                </h4>
                                <p className="mt-2 font-mono text-xs text-muted">
                                    {slug}
                                </p>
                            </article>
                        );
                    })}
                </div>
            </section>

            <section
                aria-labelledby="pixie-symbol-dimensions"
                className="mt-16"
            >
                <TitreSequence
                    id="pixie-symbol-dimensions"
                    surTitre="Dimensions"
                    titre="Cinq tailles de projection"
                    description="La taille décrit toujours la boîte extérieure réservée au symbole."
                />

                <div className="mt-7 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2 lg:grid-cols-5">
                    {dimensions.map(([size, pixels]) => (
                        <article
                            key={size}
                            className="flex min-h-44 flex-col items-center justify-end bg-surface p-5"
                        >
                            <div className="flex flex-1 items-center">
                                <PixieSymbol
                                    registry="index"
                                    collection="oeuvres"
                                    slug="principal"
                                    size={size}
                                />
                            </div>
                            <p className="mt-4 font-mono text-xs text-accent">
                                {size}
                            </p>
                            <p className="mt-1 text-xs text-muted">{pixels}</p>
                        </article>
                    ))}
                </div>
            </section>

            <section
                aria-labelledby="pixie-symbol-accessibilite"
                className="mt-16"
            >
                <TitreSequence
                    id="pixie-symbol-accessibilite"
                    surTitre="Accessibilité"
                    titre="Silencieux lorsqu’un libellé est déjà visible"
                    description="Le symbole reste décoratif dans une carte ou un titre déjà nommé. Il devient informatif uniquement lorsqu’il porte seul le sens de l’index."
                />

                <div className="mt-7 grid gap-px overflow-hidden border border-line bg-line md:grid-cols-2">
                    <article className="bg-surface p-6">
                        <p className="text-xs font-eyebrow uppercase tracking-[0.16em] text-muted">
                            Décoratif
                        </p>
                        <div className="mt-6 flex items-center gap-5">
                            <PixieSymbol
                                registry="index"
                                collection="createurs"
                                slug="principal"
                                size="lg"
                            />
                            <p className="text-xl text-ink">Créateurs</p>
                        </div>
                    </article>
                    <article className="bg-surface p-6">
                        <p className="text-xs font-eyebrow uppercase tracking-[0.16em] text-muted">
                            Informatif
                        </p>
                        <div className="mt-6">
                            <PixieSymbol
                                registry="index"
                                collection="createurs"
                                slug="principal"
                                size="lg"
                                decorative={false}
                                label="Index des Créateurs"
                            />
                        </div>
                    </article>
                </div>
            </section>

            <section
                aria-labelledby="pixie-symbol-regie"
                className="mt-16 border border-line-strong bg-surface-muted p-6 shadow-soft sm:p-8"
            >
                <TitreSequence
                    id="pixie-symbol-regie"
                    surTitre="Régie"
                    titre="Composer un PixieSymbol"
                    description="Modifier l’index, la taille et le rôle accessible met à jour le rendu et le code d’utilisation."
                />

                <div className="mt-7">
                    <PixieSymbolPlayground />
                </div>
            </section>

            <section
                aria-labelledby="pixie-symbol-reference"
                className="mt-16 border border-line-strong bg-surface-muted p-6 shadow-soft sm:p-8"
            >
                <TitreSequence
                    id="pixie-symbol-reference"
                    surTitre="Générique technique"
                    titre="API du composant"
                />

                <div className="mt-7">
                    <AtelierPropertiesTable properties={proprietes} />
                </div>

                <div className="mt-10">
                    <h4 className="text-xl text-ink">Types spécifiques</h4>
                    <p className="mt-2 text-sm leading-6 text-muted">
                        Les coordonnées et tailles admises par le registre
                        actuel.
                    </p>
                    <div className="mt-4">
                        <AtelierTypesTable types={typesSpecifiques} />
                    </div>
                </div>
            </section>
        </AtelierFicheAccessoire>
    );
}
