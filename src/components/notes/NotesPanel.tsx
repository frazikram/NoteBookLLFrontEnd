"use client";

import { useState } from "react";
import type { Note } from "@/lib/api";
import { Button } from "@/components/ui/button";

type Props = {
  notebookId: string;
  initialNotes: Note[];
};

export function NotesPanel({ notebookId, initialNotes }: Props) {
  const [notes, setNotes] = useState<Note[]>(initialNotes);
  const [selectedId, setSelectedId] = useState<string | null>(
    initialNotes[0]?.id ?? null
  );
  const [isCreating, setIsCreating] = useState(false);

  const selectedNote = notes.find((n) => n.id === selectedId) ?? null;

  const handleCreate = async () => {
    if (isCreating) return;

    const title = window.prompt("Note title:", "New note");
    if (!title || !title.trim()) return;

    const content =
      window.prompt("Note content:", "") ?? "";

    try {
      setIsCreating(true);
      const res = await import("@/lib/api").then((m) =>
        m.createNote(notebookId, {
          title: title.trim(),
          content: content ?? "",
        })
      );

      setNotes((prev) => [...prev, res]);
      setSelectedId(res.id);
    } catch (err) {
      console.error(err);
      window.alert("Failed to create note. Check console/logs.");
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-xs uppercase text-muted-foreground">Notes</p>
        <Button
          className="h-7 px-2 text-xs"
          onClick={handleCreate}
          disabled={isCreating}
        >
          {isCreating ? "Creating..." : "New"}
        </Button>
      </div>

      {notes.length === 0 ? (
        <p className="text-xs text-muted-foreground">
          No notes yet. Click “New” to create one.
        </p>
      ) : (
        <div className="space-y-2">
          <ul className="space-y-1 text-sm max-h-40 overflow-y-auto">
            {notes.map((n) => (
              <li
                key={n.id}
                className={`px-2 py-1 rounded cursor-pointer hover:bg-muted/70 ${
                  n.id === selectedId ? "bg-muted" : ""
                }`}
                onClick={() => setSelectedId(n.id)}
              >
                <div className="font-medium">{n.title}</div>
                <div className="text-xs text-muted-foreground line-clamp-2">
                  {n.content}
                </div>
              </li>
            ))}
          </ul>

          {selectedNote && (
            <div className="mt-2 border border-muted rounded-md px-3 py-2">
              <div className="text-sm font-semibold mb-1">
                {selectedNote.title}
              </div>
              <div className="text-sm whitespace-pre-wrap text-muted-foreground">
                {selectedNote.content || "No content yet."}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
