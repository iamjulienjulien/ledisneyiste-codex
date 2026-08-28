import type { ReactNode } from "react";
import type {
    AtelierCodeBlockProps,
    AtelierCodeTokenKind,
} from "./AtelierCodeBlock.types";
import styles from "./AtelierCodeBlock.module.css";

const keywords = new Set([
    "as",
    "async",
    "await",
    "break",
    "case",
    "catch",
    "class",
    "const",
    "continue",
    "default",
    "delete",
    "do",
    "else",
    "export",
    "extends",
    "finally",
    "for",
    "from",
    "function",
    "if",
    "implements",
    "import",
    "in",
    "instanceof",
    "interface",
    "let",
    "new",
    "of",
    "return",
    "satisfies",
    "static",
    "switch",
    "throw",
    "try",
    "type",
    "typeof",
    "var",
    "void",
    "while",
    "with",
    "yield",
]);

const literals = new Set(["false", "null", "true", "undefined"]);
const operatorPattern =
    /^(?:===|!==|=>|\?\?|\?\.|&&|\|\||==|!=|<=|>=|\+\+|--|\*\*|\+=|-=|\*=|\/=|\.\.\.|[+\-*/%=&|!<>?:~^])/;
const punctuationPattern = /^[{}[\](),.;]/;
const identifierPattern = /^[A-Za-z_$][\w$-]*/;
const numberPattern = /^(?:0[xob][\da-f]+|\d+(?:\.\d+)?(?:e[+-]?\d+)?)/i;

function nextNonSpace(code: string, start: number) {
    for (let index = start; index < code.length; index += 1) {
        if (!/\s/.test(code[index])) return code[index];
    }

    return "";
}

function previousNonSpace(code: string, start: number) {
    for (let index = start; index >= 0; index -= 1) {
        if (!/\s/.test(code[index])) return code[index];
    }

    return "";
}

function readQuoted(code: string, start: number, quote: string) {
    let index = start + 1;

    while (index < code.length) {
        if (code[index] === "\\") {
            index += 2;
            continue;
        }

        if (code[index] === quote) return index + 1;
        index += 1;
    }

    return code.length;
}

function token(
    value: string,
    kind: AtelierCodeTokenKind | undefined,
    key: number,
): ReactNode {
    if (!kind) return value;

    return (
        <span className={styles[kind]} key={key}>
            {value}
        </span>
    );
}

function highlight(code: string) {
    const nodes: ReactNode[] = [];
    let index = 0;
    let inTag = false;
    let key = 0;

    while (index < code.length) {
        const rest = code.slice(index);

        if (/^\s/.test(rest)) {
            const whitespace = rest.match(/^\s+/)?.[0] ?? rest[0];
            nodes.push(whitespace);
            index += whitespace.length;
            continue;
        }

        if (rest.startsWith("//")) {
            const end = code.indexOf("\n", index);
            const value = code.slice(index, end === -1 ? code.length : end);
            nodes.push(token(value, "comment", key++));
            index += value.length;
            continue;
        }

        if (rest.startsWith("/*")) {
            const end = code.indexOf("*/", index + 2);
            const value = code.slice(index, end === -1 ? code.length : end + 2);
            nodes.push(token(value, "comment", key++));
            index += value.length;
            continue;
        }

        if (["'", '"', "`"].includes(code[index])) {
            const end = readQuoted(code, index, code[index]);
            nodes.push(token(code.slice(index, end), "string", key++));
            index = end;
            continue;
        }

        const number = rest.match(numberPattern)?.[0];
        if (number) {
            nodes.push(token(number, "number", key++));
            index += number.length;
            continue;
        }

        const identifier = rest.match(identifierPattern)?.[0];
        if (identifier) {
            const previous = previousNonSpace(code, index - 1);
            const next = nextNonSpace(code, index + identifier.length);
            let kind: AtelierCodeTokenKind | undefined;

            if (keywords.has(identifier)) kind = "keyword";
            else if (literals.has(identifier)) kind = "literal";
            else if (inTag && next === "=") kind = "attribute";
            else if (inTag && (previous === "<" || previous === "/")) {
                kind = "tag";
            } else if (previous === ".") kind = "property";
            else if (next === "(") kind = "function";

            nodes.push(token(identifier, kind, key++));
            index += identifier.length;
            continue;
        }

        if (code[index] === "<" && /^<\/?[A-Za-z]/.test(rest)) {
            inTag = true;
        }

        const operator = rest.match(operatorPattern)?.[0];
        if (operator) {
            nodes.push(token(operator, "operator", key++));
            if (operator === ">") inTag = false;
            index += operator.length;
            continue;
        }

        const punctuation = rest.match(punctuationPattern)?.[0];
        if (punctuation) {
            nodes.push(token(punctuation, "punctuation", key++));
            index += punctuation.length;
            continue;
        }

        const value = code[index];
        nodes.push(value);
        if (value === ">") inTag = false;
        index += 1;
    }

    return nodes;
}

export function AtelierCodeBlock({
    children,
    frame = "bordered",
}: AtelierCodeBlockProps) {
    const className = [styles.root, frame === "bare" ? styles.bare : ""]
        .filter(Boolean)
        .join(" ");

    return (
        <pre className={className}>
            <code className={styles.code}>{highlight(children)}</code>
        </pre>
    );
}
