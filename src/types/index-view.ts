export type CodexIndexView = "list" | "cards";

export type CodexIndexViewSwitchProps = Readonly<{
    pathname: `/${string}`;
    currentView: CodexIndexView;
}>;
