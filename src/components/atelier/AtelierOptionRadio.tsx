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
        <label className="flex cursor-pointer items-center gap-2 text-sm text-ink-soft">
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
