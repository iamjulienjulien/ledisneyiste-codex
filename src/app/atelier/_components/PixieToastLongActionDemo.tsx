"use client";

import { useState } from "react";
import { PixieButton } from "@/components/ui/PixieButton";
import { PixieToast } from "@/components/ui/PixieToast";

export function PixieToastLongActionDemo() {
    const [open, setOpen] = useState(true);

    return (
        <div className="grid w-full gap-5">
            {!open ? (
                <PixieButton
                    type="button"
                    size="xs"
                    variant="outline"
                    color="ambre-projecteur"
                    onClick={() => setOpen(true)}
                >
                    Rejouer l’avertissement
                </PixieButton>
            ) : null}

            <PixieToast
                open={open}
                onOpenChange={setOpen}
                tone="warning"
                variant="spotlight"
                size="lg"
                layout="stacked"
                width="full"
                title="Plusieurs sources demandent une relecture"
                actionLabel="Ouvrir les sources"
                onAction={() => undefined}
                duration={false}
            >
                Trois références possèdent encore une date partielle. Le message
                reste disponible tant que la décision n’est pas prise.
            </PixieToast>
        </div>
    );
}
