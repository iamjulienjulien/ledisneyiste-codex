export type AtelierCodeBlockFrame = "bordered" | "bare";

export type AtelierCodeTokenKind =
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

export type AtelierCodeBlockProps = Readonly<{
    children: string;
    frame?: AtelierCodeBlockFrame;
}>;
