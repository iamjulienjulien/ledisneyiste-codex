"use client";

import { useState } from "react";
import { PixieButton } from "@/components/ui/PixieButton";
import { PixieToast } from "@/components/ui/PixieToast";

export function PixieToastMasterDemo() {
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

            <PixieToast
                open={open}
                onOpenChange={setOpen}
                tone="success"
                title="Fiche enregistrée"
                motion="dust"
                progress="rail"
            >
                Les modifications rejoignent les archives du Codex.
            </PixieToast>
        </div>
    );
}
