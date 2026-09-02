import "server-only";
import type { GuidebookNotionManifest } from "./manifest-types";

export const notionGuidebookManifest = {
    authorizedRootPageId: "343092fa3223806ea370cfe30eab948a",
    apiVersion: "2026-03-11",
    maxAncestorDepth: 12,
    entries: [
        {
            slug: "le-disneyiste",
            pageId: "343092fa3223806ea370cfe30eab948a",
        },
        {
            slug: "vision-doctrine",
            pageId: "3bd092fa3223811fa7caf8e745a6914a",
        },
        {
            slug: "manifeste",
            pageId: "3bd092fa3223810fbf7ac5ef4b2ad9db",
        },
        {
            slug: "disneyisme-hypothese-sociologique",
            pageId: "3bd092fa322381859cc6cf0d37f2ae05",
        },
        {
            slug: "positionnement-editorial",
            pageId: "3bd092fa32238155ac15c2b7004138be",
        },
        {
            slug: "le-disneyiste-persona-regard",
            pageId: "3bd092fa3223818280fbd0ff455ce2c2",
        },
        {
            slug: "le-je-signe-julien-julien",
            pageId: "3bd092fa322381c9a191c64bd36fd626",
        },
        {
            slug: "parole-enfant-louise-enfance-transmission",
            pageId: "3bd092fa3223811c9ba2f2ec2a6138a5",
        },
        {
            slug: "doctrine-independance",
            pageId: "3bd092fa32238115ad90ebb0b74bce0d",
        },
        {
            slug: "boussole-personnelle",
            pageId: "3bd092fa3223818a8d1df93372cfa8db",
        },
        {
            slug: "pistes-a-eprouver-apres-fondations",
            pageId: "3bd092fa3223819aab56f985bd3cb891",
        },
        {
            slug: "glossaire-du-disneyiste",
            pageId: "3ce092fa322381b6bc9afdffbadfc33a",
        },
    ],
} satisfies GuidebookNotionManifest;

export const notionGuidebookStatus = "candidate" as const;
