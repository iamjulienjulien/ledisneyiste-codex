"use client";

import { useState } from "react";
import { PixieButton } from "@/components/ui/PixieButton";
import { PixieToast } from "@/components/ui/PixieToast";

export function PixieToastActionDemo() {
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

            <PixieToast
                open={open}
                onOpenChange={setOpen}
                tone="success"
                title="Fiche déplacée"
                actionLabel="Annuler"
                onAction={() => undefined}
                duration={false}
            >
                La fiche rejoint Le temps des pionniers.
            </PixieToast>
        </div>
    );
}
