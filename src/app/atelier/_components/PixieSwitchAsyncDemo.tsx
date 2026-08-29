"use client";

import { useEffect, useRef, useState } from "react";
import { PixieField } from "@/components/ui/PixieField";
import { PixieSwitch } from "@/components/ui/PixieSwitch";

export function PixieSwitchAsyncDemo() {
    const [checked, setChecked] = useState(false);
    const [pending, setPending] = useState(false);
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(
        () => () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        },
        [],
    );

    const applyPreference = (nextChecked: boolean) => {
        setPending(true);
        timeoutRef.current = setTimeout(() => {
            setChecked(nextChecked);
            setPending(false);
        }, 900);
    };

    return (
        <PixieField
            controlId="switch-async"
            label="Synchronisation des archives"
            description={
                pending
                    ? "La préférence rejoint la régie…"
                    : checked
                      ? "La synchronisation automatique est active."
                      : "La synchronisation automatique est inactive."
            }
        >
            <PixieSwitch
                id="switch-async"
                checked={checked}
                onCheckedChange={applyPreference}
                pending={pending}
                variant="projector"
                motion="spring"
                effect="dust"
                color="bleu-reperage"
                checkedIcon="✓"
                uncheckedIcon="–"
            />
        </PixieField>
    );
}
