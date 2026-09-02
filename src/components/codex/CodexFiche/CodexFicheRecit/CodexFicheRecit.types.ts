import type { ReactNode } from "react";
import type { SymbolCollectionName } from "@/registry/symbols";
import type { BlocEditorialCodex } from "@/types/fiche";
import type { SourceCodex } from "@/types/source";

export type CodexFicheRecitProps<
    Collection extends SymbolCollectionName<"index">,
> = Readonly<{
    blocs: readonly BlocEditorialCodex<Collection>[];
    sources: readonly SourceCodex[];
    children: ReactNode;
}>;
