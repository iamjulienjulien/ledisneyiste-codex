import { notFound, redirect } from "next/navigation";

export default function GuidebookPage() {
    if (process.env.NODE_ENV === "production") {
        notFound();
    }

    redirect("/guidebook/bienvenue");
}
