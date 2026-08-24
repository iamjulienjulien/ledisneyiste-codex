"use client";

import { useState } from "react";
import { PixieButton } from "@/components/ui/PixieButton";
import { PixieDustToast } from "@/components/ui/PixieDustToast";

export function PixieDustToastActionDemo() {
    const [open, setOpen] = useState(true);

    return (
        <div className="grid w-full gap-6">
            {!open ? (
                <PixieButton
                    type="button"
                    size="sm"
                    variant="outline"
                    color="vert-cellulo"
                    onClick={() => setOpen(true)}
                >
                    Rejouer le déplacement
                </PixieButton>
            ) : null}

            <PixieDustToast
                open={open}
                onOpenChange={setOpen}
                tone="success"
                title="Fiche déplacée"
                actionLabel="Annuler"
                onAction={() => setOpen(false)}
                duration={false}
            >
                La fiche rejoint Le temps des pionniers.
            </PixieDustToast>
        </div>
    );
}
