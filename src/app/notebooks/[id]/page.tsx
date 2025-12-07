import { ChatPanel } from "@/components/chat/ChatPanel";
import { getNotebook, getNotebookNotes } from "@/lib/api";
import { RagAskPanel } from "@/components/rag/RagAskPanel";
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
        {notebook.description && (
          <p className="text-sm text-muted-foreground">{notebook.description}</p>
        )}

        <div>
          <p className="text-xs uppercase text-muted-foreground mb-2">
            Notes
          </p>
          {notes.length === 0 ? (
            <p className="text-xs text-muted-foreground">
              No notes yet. Create one from the UI later.
            </p>
          ) : (
            <ul className="space-y-1 text-sm">
              {notes.map((n) => (
                <li
                  key={n.id}
                  className="px-2 py-1 rounded hover:bg-muted/70 cursor-pointer"
                >
                  <div className="font-medium">{n.title}</div>
                  <div className="text-xs text-muted-foreground line-clamp-2">
                    {n.content}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
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
