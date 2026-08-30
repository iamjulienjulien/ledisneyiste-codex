import type { SymbolDefinition } from "@/types/symbols";

const accents = {
    salles: "var(--atelier-animation-framboise-encrage)",
    television: "var(--atelier-animation-bleu-reperage)",
    video: "var(--atelier-animation-violet-ombre-portee)",
    numerique: "var(--atelier-animation-cyan-effets-optiques)",
    sceneEtParcs: "var(--atelier-animation-rose-aerographe)",
} as const;

export const symbolsDiffusion = {
    salles: {
        "facade-cinema": {
            src: "/symbols/diffusion/salles/facade-cinema.png",
            label: "Façade de cinéma",
            accent: accents.salles,
        },
        "marquise-premiere": {
            src: "/symbols/diffusion/salles/marquise-premiere.png",
            label: "Marquise de première",
            accent: accents.salles,
        },
        "guichet-billetterie": {
            src: "/symbols/diffusion/salles/guichet-billetterie.png",
            label: "Guichet de billetterie",
            accent: accents.salles,
        },
        "enseigne-programme": {
            src: "/symbols/diffusion/salles/enseigne-programme.png",
            label: "Enseigne de programme",
            accent: accents.salles,
        },
        "hall-cinema": {
            src: "/symbols/diffusion/salles/hall-cinema.png",
            label: "Hall de cinéma",
            accent: accents.salles,
        },
        "porte-salle": {
            src: "/symbols/diffusion/salles/porte-salle.png",
            label: "Porte de salle",
            accent: accents.salles,
        },
        "ecran-cinema": {
            src: "/symbols/diffusion/salles/ecran-cinema.png",
            label: "Écran de cinéma",
            accent: accents.salles,
        },
        "salle-projection": {
            src: "/symbols/diffusion/salles/salle-projection.png",
            label: "Salle de projection",
            accent: accents.salles,
        },
        "fauteuil-cinema": {
            src: "/symbols/diffusion/salles/fauteuil-cinema.png",
            label: "Fauteuil de cinéma",
            accent: accents.salles,
        },
        "projecteur-cabine": {
            src: "/symbols/diffusion/salles/projecteur-cabine.png",
            label: "Projecteur de cabine",
            accent: accents.salles,
        },
        "fenetre-projection": {
            src: "/symbols/diffusion/salles/fenetre-projection.png",
            label: "Fenêtre de projection",
            accent: accents.salles,
        },
        "bobines-programme": {
            src: "/symbols/diffusion/salles/bobines-programme.png",
            label: "Bobines de programme",
            accent: accents.salles,
        },
        "billet-seance": {
            src: "/symbols/diffusion/salles/billet-seance.png",
            label: "Billet de séance",
            accent: accents.salles,
        },
        "panneau-complet": {
            src: "/symbols/diffusion/salles/panneau-complet.png",
            label: "Panneau complet",
            accent: accents.salles,
        },
        "cinema-plein-air": {
            src: "/symbols/diffusion/salles/cinema-plein-air.png",
            label: "Cinéma de plein air",
            accent: accents.salles,
        },
        "drive-in": {
            src: "/symbols/diffusion/salles/drive-in.png",
            label: "Drive-in",
            accent: accents.salles,
        },
    },
    television: {
        "televiseur-cathodique": {
            src: "/symbols/diffusion/television/televiseur-cathodique.png",
            label: "Téléviseur cathodique",
            accent: accents.television,
        },
        "televiseur-couleur": {
            src: "/symbols/diffusion/television/televiseur-couleur.png",
            label: "Téléviseur couleur",
            accent: accents.television,
        },
        "televiseur-portable": {
            src: "/symbols/diffusion/television/televiseur-portable.png",
            label: "Téléviseur portable",
            accent: accents.television,
        },
        "televiseur-moderne": {
            src: "/symbols/diffusion/television/televiseur-moderne.png",
            label: "Téléviseur moderne",
            accent: accents.television,
        },
        "antenne-rateau": {
            src: "/symbols/diffusion/television/antenne-rateau.png",
            label: "Antenne râteau",
            accent: accents.television,
        },
        "antenne-interieure": {
            src: "/symbols/diffusion/television/antenne-interieure.png",
            label: "Antenne intérieure",
            accent: accents.television,
        },
        "parabole-satellite": {
            src: "/symbols/diffusion/television/parabole-satellite.png",
            label: "Parabole satellite",
            accent: accents.television,
        },
        "tour-emission": {
            src: "/symbols/diffusion/television/tour-emission.png",
            label: "Tour d’émission",
            accent: accents.television,
        },
        "regie-television": {
            src: "/symbols/diffusion/television/regie-television.png",
            label: "Régie de télévision",
            accent: accents.television,
        },
        "mire-television": {
            src: "/symbols/diffusion/television/mire-television.png",
            label: "Mire de télévision",
            accent: accents.television,
        },
        "telecommande-tv": {
            src: "/symbols/diffusion/television/telecommande-tv.png",
            label: "Télécommande de télévision",
            accent: accents.television,
        },
        "grille-programmes": {
            src: "/symbols/diffusion/television/grille-programmes.png",
            label: "Grille des programmes",
            accent: accents.television,
        },
        "generique-antenne": {
            src: "/symbols/diffusion/television/generique-antenne.png",
            label: "Générique d’antenne",
            accent: accents.television,
        },
        "programme-jeunesse": {
            src: "/symbols/diffusion/television/programme-jeunesse.png",
            label: "Programme jeunesse",
            accent: accents.television,
        },
        "retransmission-directe": {
            src: "/symbols/diffusion/television/retransmission-directe.png",
            label: "Retransmission en direct",
            accent: accents.television,
        },
        "magnetoscope-diffusion": {
            src: "/symbols/diffusion/television/magnetoscope-diffusion.png",
            label: "Magnétoscope de diffusion",
            accent: accents.television,
        },
    },
    video: {
        "cassette-vhs": {
            src: "/symbols/diffusion/video/cassette-vhs.png",
            label: "Cassette VHS",
            accent: accents.video,
        },
        "magnetoscope-vhs": {
            src: "/symbols/diffusion/video/magnetoscope-vhs.png",
            label: "Magnétoscope VHS",
            accent: accents.video,
        },
        laserdisc: {
            src: "/symbols/diffusion/video/laserdisc.png",
            label: "LaserDisc",
            accent: accents.video,
        },
        "lecteur-laserdisc": {
            src: "/symbols/diffusion/video/lecteur-laserdisc.png",
            label: "Lecteur LaserDisc",
            accent: accents.video,
        },
        "video-cd": {
            src: "/symbols/diffusion/video/video-cd.png",
            label: "Vidéo CD",
            accent: accents.video,
        },
        dvd: {
            src: "/symbols/diffusion/video/dvd.png",
            label: "DVD",
            accent: accents.video,
        },
        "lecteur-dvd": {
            src: "/symbols/diffusion/video/lecteur-dvd.png",
            label: "Lecteur DVD",
            accent: accents.video,
        },
        "blu-ray": {
            src: "/symbols/diffusion/video/blu-ray.png",
            label: "Blu-ray",
            accent: accents.video,
        },
        "lecteur-blu-ray": {
            src: "/symbols/diffusion/video/lecteur-blu-ray.png",
            label: "Lecteur Blu-ray",
            accent: accents.video,
        },
        "coffret-video": {
            src: "/symbols/diffusion/video/coffret-video.png",
            label: "Coffret vidéo",
            accent: accents.video,
        },
        "edition-collector": {
            src: "/symbols/diffusion/video/edition-collector.png",
            label: "Édition collector",
            accent: accents.video,
        },
        "jaquette-video": {
            src: "/symbols/diffusion/video/jaquette-video.png",
            label: "Jaquette vidéo",
            accent: accents.video,
        },
        "rayon-videoclub": {
            src: "/symbols/diffusion/video/rayon-videoclub.png",
            label: "Rayon de vidéoclub",
            accent: accents.video,
        },
        "borne-location": {
            src: "/symbols/diffusion/video/borne-location.png",
            label: "Borne de location",
            accent: accents.video,
        },
        "telecommande-video": {
            src: "/symbols/diffusion/video/telecommande-video.png",
            label: "Télécommande vidéo",
            accent: accents.video,
        },
        "chaine-home-cinema": {
            src: "/symbols/diffusion/video/chaine-home-cinema.png",
            label: "Chaîne home cinéma",
            accent: accents.video,
        },
    },
    numerique: {
        "serveur-streaming": {
            src: "/symbols/diffusion/numerique/serveur-streaming.png",
            label: "Serveur de streaming",
            accent: accents.numerique,
        },
        "plateforme-video": {
            src: "/symbols/diffusion/numerique/plateforme-video.png",
            label: "Plateforme vidéo",
            accent: accents.numerique,
        },
        "lecteur-streaming": {
            src: "/symbols/diffusion/numerique/lecteur-streaming.png",
            label: "Lecteur de streaming",
            accent: accents.numerique,
        },
        "boitier-connecte": {
            src: "/symbols/diffusion/numerique/boitier-connecte.png",
            label: "Boîtier connecté",
            accent: accents.numerique,
        },
        "television-connectee": {
            src: "/symbols/diffusion/numerique/television-connectee.png",
            label: "Télévision connectée",
            accent: accents.numerique,
        },
        "application-video": {
            src: "/symbols/diffusion/numerique/application-video.png",
            label: "Application vidéo",
            accent: accents.numerique,
        },
        "lecture-mobile": {
            src: "/symbols/diffusion/numerique/lecture-mobile.png",
            label: "Lecture mobile",
            accent: accents.numerique,
        },
        "visionnage-multi-ecrans": {
            src: "/symbols/diffusion/numerique/visionnage-multi-ecrans.png",
            label: "Visionnage multi-écrans",
            accent: accents.numerique,
        },
        "video-a-la-demande": {
            src: "/symbols/diffusion/numerique/video-a-la-demande.png",
            label: "Vidéo à la demande",
            accent: accents.numerique,
        },
        "achat-numerique": {
            src: "/symbols/diffusion/numerique/achat-numerique.png",
            label: "Achat numérique",
            accent: accents.numerique,
        },
        "telechargement-video": {
            src: "/symbols/diffusion/numerique/telechargement-video.png",
            label: "Téléchargement vidéo",
            accent: accents.numerique,
        },
        "catalogue-numerique": {
            src: "/symbols/diffusion/numerique/catalogue-numerique.png",
            label: "Catalogue numérique",
            accent: accents.numerique,
        },
        "profil-spectateur": {
            src: "/symbols/diffusion/numerique/profil-spectateur.png",
            label: "Profil spectateur",
            accent: accents.numerique,
        },
        "diffusion-adaptative": {
            src: "/symbols/diffusion/numerique/diffusion-adaptative.png",
            label: "Diffusion adaptative",
            accent: accents.numerique,
        },
        "premiere-en-ligne": {
            src: "/symbols/diffusion/numerique/premiere-en-ligne.png",
            label: "Première en ligne",
            accent: accents.numerique,
        },
        "archive-numerique": {
            src: "/symbols/diffusion/numerique/archive-numerique.png",
            label: "Archive numérique",
            accent: accents.numerique,
        },
    },
    "scene-et-parcs": {
        "scene-theatre": {
            src: "/symbols/diffusion/scene-et-parcs/scene-theatre.png",
            label: "Scène de théâtre",
            accent: accents.sceneEtParcs,
        },
        "scene-spectacle": {
            src: "/symbols/diffusion/scene-et-parcs/scene-spectacle.png",
            label: "Scène de spectacle",
            accent: accents.sceneEtParcs,
        },
        "scene-tournante": {
            src: "/symbols/diffusion/scene-et-parcs/scene-tournante.png",
            label: "Scène tournante",
            accent: accents.sceneEtParcs,
        },
        "pavillon-exposition": {
            src: "/symbols/diffusion/scene-et-parcs/pavillon-exposition.png",
            label: "Pavillon d’exposition",
            accent: accents.sceneEtParcs,
        },
        "entree-attraction": {
            src: "/symbols/diffusion/scene-et-parcs/entree-attraction.png",
            label: "Entrée d’attraction",
            accent: accents.sceneEtParcs,
        },
        "vehicule-attraction": {
            src: "/symbols/diffusion/scene-et-parcs/vehicule-attraction.png",
            label: "Véhicule d’attraction",
            accent: accents.sceneEtParcs,
        },
        "scene-audio-animatronique": {
            src: "/symbols/diffusion/scene-et-parcs/scene-audio-animatronique.png",
            label: "Scène Audio-Animatronic",
            accent: accents.sceneEtParcs,
        },
        "parcours-scene": {
            src: "/symbols/diffusion/scene-et-parcs/parcours-scene.png",
            label: "Parcours scénique",
            accent: accents.sceneEtParcs,
        },
        "theatre-plein-air": {
            src: "/symbols/diffusion/scene-et-parcs/theatre-plein-air.png",
            label: "Théâtre de plein air",
            accent: accents.sceneEtParcs,
        },
        parade: {
            src: "/symbols/diffusion/scene-et-parcs/parade.png",
            label: "Parade",
            accent: accents.sceneEtParcs,
        },
        "spectacle-nocturne": {
            src: "/symbols/diffusion/scene-et-parcs/spectacle-nocturne.png",
            label: "Spectacle nocturne",
            accent: accents.sceneEtParcs,
        },
        "projection-facade": {
            src: "/symbols/diffusion/scene-et-parcs/projection-facade.png",
            label: "Projection sur façade",
            accent: accents.sceneEtParcs,
        },
        "fontaines-spectacle": {
            src: "/symbols/diffusion/scene-et-parcs/fontaines-spectacle.png",
            label: "Fontaines en spectacle",
            accent: accents.sceneEtParcs,
        },
        "exposition-itinerante": {
            src: "/symbols/diffusion/scene-et-parcs/exposition-itinerante.png",
            label: "Exposition itinérante",
            accent: accents.sceneEtParcs,
        },
        "rencontre-publique": {
            src: "/symbols/diffusion/scene-et-parcs/rencontre-publique.png",
            label: "Rencontre publique",
            accent: accents.sceneEtParcs,
        },
        "plan-parc": {
            src: "/symbols/diffusion/scene-et-parcs/plan-parc.png",
            label: "Plan de parc",
            accent: accents.sceneEtParcs,
        },
    },
} as const satisfies Record<string, Record<string, SymbolDefinition>>;
