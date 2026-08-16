import ReferenceCodexLink from "@/components/codex/ReferenceCodexLink";
import type { ReferenceCodex } from "@/types/reference";

type EpoqueCodexProps = {
    epoque?: ReferenceCodex;
};

export default function EpoqueCodex({ epoque }: EpoqueCodexProps) {
    if (!epoque) {
        return null;
    }

    return (
        <div>
            <dt className="text-sm text-muted">Époque</dt>

            <dd className="mt-1 text-lg text-ink">
                <ReferenceCodexLink reference={epoque} />
            </dd>
        </div>
    );
}
