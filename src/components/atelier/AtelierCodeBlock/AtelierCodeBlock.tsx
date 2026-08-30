import { tokenizeCode } from "@/lib/code-tokens";
import type { AtelierCodeBlockProps } from "./AtelierCodeBlock.types";
import styles from "./AtelierCodeBlock.module.css";

export function AtelierCodeBlock({
    children,
    frame = "bordered",
}: AtelierCodeBlockProps) {
    const className = [styles.root, frame === "bare" ? styles.bare : ""]
        .filter(Boolean)
        .join(" ");

    return (
        <pre className={className}>
            <code className={styles.code}>
                {tokenizeCode(children).map((token, index) =>
                    token.kind ? (
                        <span className={styles[token.kind]} key={index}>
                            {token.value}
                        </span>
                    ) : (
                        token.value
                    ),
                )}
            </code>
        </pre>
    );
}
