"use client";

import { useState } from "react";
import { PixieButton } from "@/components/ui/PixieButton";
import {
    PixieDustToast,
    type PixieDustToastDismissReason,
} from "@/components/ui/PixieDustToast";

const reasonLabels = {
    timeout: "Le délai est terminé.",
    dismiss: "La fermeture a été demandée.",
    action: "L’action a été exécutée.",
    escape: "La touche Échap a fermé le message.",
    swipe: "Le balayage a fermé le message.",
} as const satisfies Record<PixieDustToastDismissReason, string>;

export function PixieDustToastSwipeDemo() {
    const [open, setOpen] = useState(true);
    const [reason, setReason] = useState<PixieDustToastDismissReason | null>(
        null,
    );

    function replay() {
        setReason(null);
        setOpen(true);
    }

    return (
        <div className="grid w-full gap-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="text-xs leading-5 text-muted">
                    Balayer vers la fin ou utiliser la fermeture.
                </p>
                {!open ? (
                    <PixieButton
                        type="button"
                        size="xs"
                        variant="outline"
                        color="bleu-reperage"
                        onClick={replay}
                    >
                        Rejouer
                    </PixieButton>
                ) : null}
            </div>

            <PixieDustToast
                open={open}
                onOpenChange={setOpen}
                onDismiss={setReason}
                tone="info"
                variant="outline"
                motion="pop"
                width="full"
                swipeDirection="end"
                duration={false}
                title="Raccord mobile"
            >
                Le geste reste facultatif et possède une commande équivalente.
            </PixieDustToast>

            <p
                aria-live="polite"
                className="min-h-5 font-mono text-xs text-muted"
            >
                {reason ? reasonLabels[reason] : "Notification ouverte"}
            </p>
        </div>
    );
}
