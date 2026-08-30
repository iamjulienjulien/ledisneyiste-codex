export type AtelierCodeBlockFrame = "bordered" | "bare";

export type AtelierCodeBlockProps = Readonly<{
    children: string;
    frame?: AtelierCodeBlockFrame;
}>;
