import type { CodexIndexView } from "@/types/index-view";

export function resolveCodexIndexView(
    view: string | string[] | undefined,
): CodexIndexView {
    return view === "list" ? "list" : "cards";
}
