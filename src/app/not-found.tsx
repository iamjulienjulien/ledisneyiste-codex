import { CodexLayoutFooter } from "@/components/codex/CodexLayout/CodexLayoutFooter";
import { PixieContainer } from "@/components/ui/PixieContainer";
import { PixieLink } from "@/components/ui/PixieLink";

export default function NotFound() {
    return (
        <>
            <PixieContainer
                as="main"
                width="42"
                gutter="md"
                className="flex items-center justify-center py-16"
            >
                <section className="w-full">
                    <p className="text-sm font-medium font-eyebrow uppercase tracking-[0.24em] text-muted">
                        Erreur 404
                    </p>

                    <h1 className="mt-3 text-5xl text-ink sm:text-6xl">
                        Cette page s’est égarée hors du Codex.
                    </h1>

                    <p className="mt-6 max-w-xl text-lg leading-8 text-ink-soft">
                        L’entrée que vous cherchez n’existe pas encore ou a été
                        déplacée. Elle s’est peut-être aventurée un peu trop
                        loin dans les archives.
                    </p>

                    <div className="mt-10 grid gap-4 sm:grid-cols-2">
                        <PixieLink href="/" variant="action" indicator="back">
                            Revenir à l’accueil
                        </PixieLink>

                        <PixieLink
                            href="/personnages"
                            variant="action"
                            color="rouge-crayon"
                            indicator="arrow"
                        >
                            Explorer les personnages
                        </PixieLink>

                        <PixieLink
                            href="/contributeurs"
                            variant="action"
                            color="jaune-lampe"
                            indicator="arrow"
                        >
                            Explorer les créateurs
                        </PixieLink>

                        <PixieLink
                            href="/oeuvres"
                            variant="action"
                            color="gouache"
                            indicator="arrow"
                        >
                            Explorer les œuvres
                        </PixieLink>
                    </div>
                </section>
            </PixieContainer>

            <CodexLayoutFooter />
        </>
    );
}
