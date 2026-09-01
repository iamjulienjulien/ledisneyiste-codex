import type { CodexFamily } from "@/types/codex";
import type { ProjectionIdentiteCodex } from "@/types/identite";

export type CodexCommonIdentiteNiveau = "h1" | "h2" | "h3";

export type CodexCommonIdentitePresence = "hero" | "card" | "list";

export type CodexCommonIdentiteProps<
    Famille extends CodexFamily = CodexFamily,
> = Readonly<{
    identite: ProjectionIdentiteCodex<Famille>;
    niveau: CodexCommonIdentiteNiveau;
    presence: CodexCommonIdentitePresence;
    className?: string;
    titleClassName?: string;
}>;
