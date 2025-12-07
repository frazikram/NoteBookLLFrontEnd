import Link from "next/link";
import { ReactNode } from "react";

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex bg-background text-foreground">
      <aside className="w-64 border-r border-muted px-4 py-6 flex flex-col">
        <div className="text-xl font-semibold mb-6">
          <Link href="/">NotebookLLM</Link>
        </div>
        <nav className="space-y-2 text-sm">
          <Link href="/" className="block hover:underline">
            Notebooks
          </Link>
          <Link href="/settings" className="block hover:underline">
            Settings
          </Link>
        </nav>
        <div className="mt-auto text-xs text-muted-foreground">
          Prototype UI
        </div>
      </aside>
      <main className="flex-1 flex flex-col">
        {children}
      </main>
    </div>
  );
}
