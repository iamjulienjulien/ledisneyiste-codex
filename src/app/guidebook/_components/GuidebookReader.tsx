"use client";

import { useSyncExternalStore } from "react";
import { PixieButton } from "@/components/ui/PixieButton";
import {
    PixieDocs,
    type PixieDocsNavigationMode,
    type PixieDocsProps,
} from "@/components/ui/PixieDocs";
import { PixiePanel } from "@/components/ui/PixiePanel";
import styles from "./GuidebookReader.module.css";

const navigationModeStorageKey = "guidebook-navigation-mode:v1";
const navigationModeChangeEvent = "guidebook-navigation-mode-change";
const navigationModes = [
    ["inline", "Intégrée"],
    ["floating", "Flottante"],
] as const satisfies readonly [PixieDocsNavigationMode, string][];
let volatileNavigationMode: PixieDocsNavigationMode = "inline";
let storedNavigationModeRead = false;

function isNavigationMode(
    value: string | null,
): value is PixieDocsNavigationMode {
    return value === "inline" || value === "floating";
}

function getNavigationModeSnapshot(): PixieDocsNavigationMode {
    if (!storedNavigationModeRead) {
        storedNavigationModeRead = true;

        try {
            const storedMode = window.localStorage.getItem(
                navigationModeStorageKey,
            );

            if (isNavigationMode(storedMode)) {
                volatileNavigationMode = storedMode;
            }
        } catch {
            // Le mode volatil conserve le contrôle lorsque le stockage est fermé.
        }
    }

    return volatileNavigationMode;
}

function getServerNavigationModeSnapshot(): PixieDocsNavigationMode {
    return "inline";
}

function subscribeToNavigationMode(onStoreChange: () => void) {
    const handleStorage = (event: StorageEvent) => {
        if (event.key === navigationModeStorageKey) {
            volatileNavigationMode = isNavigationMode(event.newValue)
                ? event.newValue
                : "inline";
            onStoreChange();
        }
    };

    window.addEventListener("storage", handleStorage);
    window.addEventListener(navigationModeChangeEvent, onStoreChange);

    return () => {
        window.removeEventListener("storage", handleStorage);
        window.removeEventListener(navigationModeChangeEvent, onStoreChange);
    };
}

function saveNavigationMode(mode: PixieDocsNavigationMode) {
    volatileNavigationMode = mode;

    try {
        window.localStorage.setItem(navigationModeStorageKey, mode);
    } catch {
        // La préférence reste active pour la session courante.
    }

    window.dispatchEvent(new Event(navigationModeChangeEvent));
}

type GuidebookReaderProps = Omit<
    PixieDocsProps,
    "navigationMode" | "onNavigate"
>;

export function GuidebookReader(props: GuidebookReaderProps) {
    const navigationMode = useSyncExternalStore(
        subscribeToNavigationMode,
        getNavigationModeSnapshot,
        getServerNavigationModeSnapshot,
    );

    return (
        <div className={styles.root}>
            <PixiePanel
                as="aside"
                variant="outline"
                padding="sm"
                radius="medium"
                color="violet-ombre-portee"
                className={styles.controlPanel}
                aria-label="Réglage de la bibliothèque"
            >
                <div className={styles.controlLayout}>
                    <div className={styles.controlCopy}>
                        <p className={styles.controlEyebrow}>
                            Cadre de lecture
                        </p>
                        <p className={styles.controlDescription}>
                            Choisir la présence de la bibliothèque sur grand
                            écran.
                        </p>
                    </div>

                    <div
                        className={styles.modeGroup}
                        role="group"
                        aria-label="Présence de la bibliothèque"
                    >
                        {navigationModes.map(([mode, label]) => {
                            const selected = navigationMode === mode;

                            return (
                                <PixieButton
                                    key={mode}
                                    size="sm"
                                    variant={selected ? "soft" : "ghost"}
                                    color="violet-ombre-portee"
                                    aria-pressed={selected}
                                    onClick={() => saveNavigationMode(mode)}
                                    className={styles.modeButton}
                                >
                                    {label}
                                </PixieButton>
                            );
                        })}
                    </div>
                </div>
            </PixiePanel>

            <PixieDocs {...props} navigationMode={navigationMode} />
        </div>
    );
}
