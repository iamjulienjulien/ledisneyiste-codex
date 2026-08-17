import styles from "./AtelierTypeToken.module.css";

function getTypeKind(value: string) {
    if (value === "string" || /^(".*"|'.*')$/.test(value)) {
        return "string";
    }

    if (value === "number" || /^-?\d/.test(value)) {
        return "number";
    }

    if (value === "boolean" || value === "true" || value === "false") {
        return "boolean";
    }

    if (["null", "undefined", "void"].includes(value)) {
        return "nullish";
    }

    if (value === "bigint") {
        return "bigint";
    }

    if (value === "symbol") {
        return "symbol";
    }

    if (value === "object") {
        return "object";
    }

    return "reference";
}

export function AtelierTypeToken({
    value,
    chip = false,
}: Readonly<{ value: string; chip?: boolean }>) {
    return (
        <code
            className={`${styles.root} ${chip ? styles.chip : ""}`}
            data-type-kind={getTypeKind(value)}
        >
            {value}
        </code>
    );
}
