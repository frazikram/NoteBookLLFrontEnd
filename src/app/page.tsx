import { NewNotebookButton } from "@/components/notebooks/NewNotebookButton";
import { NotebookList } from "@/components/notebooks/NotebookList";
import { getNotebooks } from "@/lib/api";

export const dynamic = "force-dynamic";
export default async function HomePage() {
  const notebooks = await getNotebooks();

  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">My Notebooks</h1>
        <NewNotebookButton />
      </div>
      <NotebookList notebooks={notebooks} />
    </div>
  );
}
