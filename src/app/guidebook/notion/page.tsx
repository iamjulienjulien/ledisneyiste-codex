import { notFound, redirect } from "next/navigation";

export default function NotionGuidebookPage() {
    if (process.env.NODE_ENV === "production") {
        notFound();
    }

    redirect("/guidebook/notion/le-disneyiste");
}
