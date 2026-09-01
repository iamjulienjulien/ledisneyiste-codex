import type { ReactNode } from "react";

export type CodexFicheSectionProps = Readonly<{
    eyebrow?: string;
    titre?: string;
    description?: string;
    symbole?: ReactNode;
    children: ReactNode;
}>;
