import type { CodexIndexView } from "@/types/index-view";

export type CodexIndexViewSwitchProps = Readonly<{
    pathname: `/${string}`;
    currentView: CodexIndexView;
}>;
