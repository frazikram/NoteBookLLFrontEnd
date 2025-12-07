import Link from "next/link";
import type { Notebook } from "@/lib/api";

type Props = {
  notebooks: Notebook[];
};

export function NotebookList({ notebooks }: Props) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {notebooks.map((nb) => (
        <Link
          key={nb.id}
          href={`/notebooks/${nb.id}`}
          className="border border-muted rounded-lg p-4 hover:shadow-sm transition-shadow"
        >
          <h2 className="font-medium">{nb.title}</h2>
          {nb.description && (
            <p className="text-sm text-muted-foreground mt-1">
              {nb.description}
            </p>
          )}
          <p className="mt-2 text-xs text-muted-foreground">
            Created: {new Date(nb.createdAt).toLocaleString()}
          </p>
        </Link>
      ))}
    </div>
  );
}
