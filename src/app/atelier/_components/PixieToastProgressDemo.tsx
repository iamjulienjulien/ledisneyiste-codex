"use client";

import { useState } from "react";
import { PixieButton } from "@/components/ui/PixieButton";
import { PixieToast } from "@/components/ui/PixieToast";

export function PixieToastProgressDemo() {
    const [open, setOpen] = useState(true);

    function replay() {
        setOpen(false);
        window.requestAnimationFrame(() => setOpen(true));
    }

    return (
        <div className="grid w-full gap-5">
            <PixieButton
                type="button"
                size="xs"
                variant="outline"
                color="vert-cellulo"
                onClick={replay}
            >
                Relancer le compte à rebours
            </PixieButton>

            <PixieToast
                open={open}
                onOpenChange={setOpen}
                tone="success"
                progress="bar"
                duration={10000}
                pauseOnInteraction
                title="Fiche enregistrée"
            >
                La barre se suspend au survol et au focus.
            </PixieToast>
        </div>
    );
}
