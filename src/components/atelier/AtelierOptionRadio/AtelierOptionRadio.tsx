import styles from "./AtelierOptionRadio.module.css";

export function AtelierOptionRadio<Value extends string>({
    name,
    value,
    label,
    selectedValue,
    onChange,
}: Readonly<{
    name: string;
    value: Value;
    label: string;
    selectedValue: Value;
    onChange: (value: Value) => void;
}>) {
    return (
        <label className={styles.root}>
            <input
                type="radio"
                name={name}
                value={value}
                checked={selectedValue === value}
                onChange={() => onChange(value)}
                className="accent-accent"
            />
            {label}
        </label>
    );
}
