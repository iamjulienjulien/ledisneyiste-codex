import {
    Fraunces,
    Grandstander,
    IBM_Plex_Mono,
    League_Spartan,
    Source_Sans_3,
} from "next/font/google";

export const fontBrand = Grandstander({
    subsets: ["latin"],
    variable: "--font-grandstander",
    display: "swap",
});

export const fontDisplay = Fraunces({
    subsets: ["latin"],
    variable: "--font-fraunces",
    display: "swap",
});

export const fontBody = Source_Sans_3({
    subsets: ["latin"],
    variable: "--font-source-sans-3",
    display: "swap",
});

export const fontEyebrow = League_Spartan({
    subsets: ["latin"],
    variable: "--font-league-spartan",
    display: "swap",
});

export const fontMono = IBM_Plex_Mono({
    weight: ["400", "500"],
    subsets: ["latin"],
    variable: "--font-ibm-plex-mono",
    display: "swap",
});
