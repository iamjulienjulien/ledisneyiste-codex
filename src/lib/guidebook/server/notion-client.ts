import "server-only";
import { cache } from "react";
import { notionGuidebookManifest } from "./notion-manifest";
import { normalizeNotionPageId } from "./notion-identifiers";

const notionApiBaseUrl = "https://api.notion.com/v1";
const requestTimeout = 8_000;
const maximumRequestAttempts = 3;
const defaultRetryDelay = 1_000;
const maximumRetryDelay = 4_000;

export type NotionGuidebookClientErrorState =
    "deferred" | "restricted" | "unavailable";

export class NotionGuidebookClientError extends Error {
    constructor(
        public readonly state: NotionGuidebookClientErrorState,
        message: string,
    ) {
        super(message);
        this.name = "NotionGuidebookClientError";
    }
}

export type NotionGuidebookPageMetadata = Readonly<{
    pageId: string;
    parentPageId: string | null;
    updatedAt?: string;
}>;

export type NotionGuidebookMarkdown = Readonly<{
    markdown: string;
    truncated: boolean;
    unknownBlockCount: number;
}>;

function getNotionApiKey(): string {
    const apiKey = process.env.NOTION_API_KEY?.trim();

    if (!apiKey) {
        throw new NotionGuidebookClientError(
            "deferred",
            "La connexion Notion du Guidebook n’est pas configurée.",
        );
    }

    return apiKey;
}

export function isNotionGuidebookConfigured(): boolean {
    return Boolean(process.env.NOTION_API_KEY?.trim());
}

async function requestNotion(pathname: string): Promise<unknown> {
    const apiKey = getNotionApiKey();
    for (let attempt = 0; attempt < maximumRequestAttempts; attempt += 1) {
        let response: Response;

        try {
            response = await fetch(`${notionApiBaseUrl}${pathname}`, {
                headers: {
                    Authorization: `Bearer ${apiKey}`,
                    "Notion-Version": notionGuidebookManifest.apiVersion,
                },
                cache: "no-store",
                signal: AbortSignal.timeout(requestTimeout),
            });
        } catch {
            throw new NotionGuidebookClientError(
                "unavailable",
                "La passerelle Notion ne répond pas.",
            );
        }

        if (response.status === 429 && attempt < maximumRequestAttempts - 1) {
            const retryAfter = Number(response.headers.get("retry-after"));
            const delay = Math.min(
                Number.isFinite(retryAfter) && retryAfter > 0
                    ? retryAfter * 1_000
                    : defaultRetryDelay,
                maximumRetryDelay,
            );

            await new Promise((resolve) => setTimeout(resolve, delay));
            continue;
        }

        if (!response.ok) {
            const state =
                response.status === 403 || response.status === 404
                    ? "restricted"
                    : "unavailable";

            throw new NotionGuidebookClientError(
                state,
                state === "restricted"
                    ? "La page Notion autorisée reste inaccessible."
                    : "La passerelle Notion est momentanément indisponible.",
            );
        }

        try {
            return await response.json();
        } catch {
            throw new NotionGuidebookClientError(
                "unavailable",
                "La passerelle Notion a renvoyé une réponse illisible.",
            );
        }
    }

    throw new NotionGuidebookClientError(
        "unavailable",
        "La passerelle Notion a épuisé ses tentatives de lecture.",
    );
}

async function retrieveNotionPageMetadataUncached(
    pageId: string,
): Promise<NotionGuidebookPageMetadata> {
    const normalizedPageId = normalizeNotionPageId(pageId);

    if (!normalizedPageId) {
        throw new NotionGuidebookClientError(
            "restricted",
            "L’identifiant de page Notion déclaré est invalide.",
        );
    }

    const response = (await requestNotion(`/pages/${normalizedPageId}`)) as {
        id?: unknown;
        last_edited_time?: unknown;
        parent?: {
            type?: unknown;
            page_id?: unknown;
        };
    };
    const responsePageId =
        typeof response.id === "string"
            ? normalizeNotionPageId(response.id)
            : null;

    if (responsePageId !== normalizedPageId) {
        throw new NotionGuidebookClientError(
            "unavailable",
            "La passerelle Notion n’a pas confirmé la page attendue.",
        );
    }

    const parentPageId =
        response.parent?.type === "page_id" &&
        typeof response.parent.page_id === "string"
            ? normalizeNotionPageId(response.parent.page_id)
            : null;

    return {
        pageId: responsePageId,
        parentPageId,
        ...(typeof response.last_edited_time === "string"
            ? { updatedAt: response.last_edited_time }
            : {}),
    };
}

export const retrieveNotionPageMetadata = cache(
    retrieveNotionPageMetadataUncached,
);

export async function retrieveNotionPageMarkdown(
    pageId: string,
): Promise<NotionGuidebookMarkdown> {
    const normalizedPageId = normalizeNotionPageId(pageId);

    if (!normalizedPageId) {
        throw new NotionGuidebookClientError(
            "restricted",
            "L’identifiant de page Notion déclaré est invalide.",
        );
    }

    const response = (await requestNotion(
        `/pages/${normalizedPageId}/markdown`,
    )) as {
        id?: unknown;
        markdown?: unknown;
        truncated?: unknown;
        unknown_block_ids?: unknown;
    };
    const responsePageId =
        typeof response.id === "string"
            ? normalizeNotionPageId(response.id)
            : null;

    if (
        responsePageId !== normalizedPageId ||
        typeof response.markdown !== "string"
    ) {
        throw new NotionGuidebookClientError(
            "unavailable",
            "Le document Notion reçu ne respecte pas le contrat attendu.",
        );
    }

    return {
        markdown: response.markdown,
        truncated: response.truncated === true,
        unknownBlockCount: Array.isArray(response.unknown_block_ids)
            ? response.unknown_block_ids.length
            : 0,
    };
}
