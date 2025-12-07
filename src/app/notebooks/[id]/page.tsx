import { ChatPanel } from "@/components/chat/ChatPanel";
import { getNotebook, getNotebookNotes } from "@/lib/api";
import { RagAskPanel } from "@/components/rag/RagAskPanel";
import { NotesPanel } from "@/components/notes/NotesPanel";

type NotebookPageProps = {
  params: { id: string };
};

export default async function NotebookPage({ params }: NotebookPageProps) {
  const notebookId = params.id;

  const [notebook, notes] = await Promise.all([
    getNotebook(notebookId),
    getNotebookNotes(notebookId),
  ]);

  return (
    <div className="flex h-full">
      <aside className="w-80 border-r border-muted p-4 space-y-4">
        <h1 className="text-lg font-semibold">{notebook.title}</h1>
        <p className="text-sm text-muted-foreground">
          {notebook.description ?? "N/A"}
        </p>

        <NotesPanel notebookId={notebookId} initialNotes={notes} />
      </aside>

      <section className="flex-1 flex flex-col">
        <ChatPanel
          notebookId={notebookId}
          notebookTitle={notebook.title}
        />
        <RagAskPanel notebookId={notebookId} />
      </section>
    </div>
  );
}
