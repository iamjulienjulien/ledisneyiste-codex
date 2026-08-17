import type { CSSProperties } from "react";
import Image from "next/image";
import { getSymbol, type SymbolSelection } from "@/registry/symbols";
import styles from "./PixieSymbol.module.css";

const tailles = {
    xs: 24,
    sm: 32,
    md: 48,
    lg: 64,
    xl: 96,
} as const;

export type PixieSymbolSize = keyof typeof tailles | number;

type PixieSymbolOptions = Readonly<{
    size?: PixieSymbolSize;
    decorative?: boolean;
    label?: string;
    className?: string;
}>;

export type PixieSymbolProps = Readonly<SymbolSelection & PixieSymbolOptions>;

type PixieSymbolStyle = CSSProperties & {
    "--pixie-symbol-size": `${number}px`;
    "--pixie-symbol-accent": `var(--${string})`;
};

function getTaille(size: PixieSymbolSize) {
    if (typeof size === "number") {
        return Number.isFinite(size) && size > 0 ? size : tailles.md;
    }

    return tailles[size];
}

export function PixieSymbol({
    registry,
    collection,
    slug,
    size = "md",
    decorative = true,
    label,
    className = "",
}: PixieSymbolProps) {
    const symbole = getSymbol(registry, collection, slug);
    const taille = getTaille(size);
    const style: PixieSymbolStyle = {
        "--pixie-symbol-size": `${taille}px`,
        "--pixie-symbol-accent": symbole.accent,
    };

    return (
        <span
            className={`${styles.root} ${className}`.trim()}
            style={style}
            data-pixie-symbol={`${registry}.${collection}.${slug}`}
        >
            <Image
                src={symbole.src}
                alt={decorative ? "" : (label ?? symbole.label)}
                width={384}
                height={384}
                sizes={`${taille}px`}
                className={styles.image}
                aria-hidden={decorative || undefined}
                draggable={false}
            />
        </span>
    );
}
