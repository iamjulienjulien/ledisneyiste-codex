"use client";

import { useState } from "react";
import { PixieButton } from "@/components/ui/PixieButton";
import { PixieDustToast } from "@/components/ui/PixieDustToast";

export function PixieDustToastMasterDemo() {
    const [open, setOpen] = useState(false);

    return (
        <div className="grid min-h-52 content-between gap-8">
            <PixieButton
                type="button"
                color="vert-cellulo"
                onClick={() => setOpen(true)}
            >
                Enregistrer la fiche
            </PixieButton>

            <PixieDustToast
                open={open}
                onOpenChange={setOpen}
                tone="success"
                title="Fiche enregistrée"
            >
                Les modifications rejoignent les archives du Codex.
            </PixieDustToast>
        </div>
    );
}
