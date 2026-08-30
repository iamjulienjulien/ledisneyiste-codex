export type CodeTokenKind =
    | "attribute"
    | "comment"
    | "function"
    | "keyword"
    | "literal"
    | "number"
    | "operator"
    | "property"
    | "punctuation"
    | "string"
    | "tag";

export type CodeToken = {
    value: string;
    kind?: CodeTokenKind;
};

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

export function tokenizeCode(code: string): CodeToken[] {
    const tokens: CodeToken[] = [];
    let index = 0;
    let inTag = false;

    const push = (value: string, kind?: CodeTokenKind) => {
        tokens.push(kind ? { value, kind } : { value });
        index += value.length;
    };

    while (index < code.length) {
        const rest = code.slice(index);

        if (/^\s/.test(rest)) {
            push(rest.match(/^\s+/)?.[0] ?? rest[0]);
            continue;
        }

        if (rest.startsWith("//")) {
            const end = code.indexOf("\n", index);
            push(code.slice(index, end === -1 ? code.length : end), "comment");
            continue;
        }

        if (rest.startsWith("/*")) {
            const end = code.indexOf("*/", index + 2);
            push(
                code.slice(index, end === -1 ? code.length : end + 2),
                "comment",
            );
            continue;
        }

        if (["'", '"', "`"].includes(code[index])) {
            const end = readQuoted(code, index, code[index]);
            push(code.slice(index, end), "string");
            continue;
        }

        const number = rest.match(numberPattern)?.[0];
        if (number) {
            push(number, "number");
            continue;
        }

        const identifier = rest.match(identifierPattern)?.[0];
        if (identifier) {
            const previous = previousNonSpace(code, index - 1);
            const next = nextNonSpace(code, index + identifier.length);
            let kind: CodeTokenKind | undefined;

            if (keywords.has(identifier)) kind = "keyword";
            else if (literals.has(identifier)) kind = "literal";
            else if (inTag && next === "=") kind = "attribute";
            else if (inTag && (previous === "<" || previous === "/")) {
                kind = "tag";
            } else if (previous === ".") kind = "property";
            else if (next === "(") kind = "function";

            push(identifier, kind);
            continue;
        }

        if (code[index] === "<" && /^<\/?[A-Za-z]/.test(rest)) {
            inTag = true;
        }

        const operator = rest.match(operatorPattern)?.[0];
        if (operator) {
            push(operator, "operator");
            if (operator === ">") inTag = false;
            continue;
        }

        const punctuation = rest.match(punctuationPattern)?.[0];
        if (punctuation) {
            push(punctuation, "punctuation");
            continue;
        }

        const value = code[index];
        push(value);
        if (value === ">") inTag = false;
    }

    return tokens;
}
