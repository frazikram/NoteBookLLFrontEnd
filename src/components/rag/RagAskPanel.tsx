"use client";

import { FormEvent, useState } from "react";
import { askRag, RagSource } from "@/lib/api";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type Props = {
  notebookId: string;
};

export function RagAskPanel({ notebookId }: Props) {
  const [question, setQuestion] = useState("");
  const [reply, setReply] = useState<string | null>(null);
  const [sources, setSources] = useState<RagSource[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const q = question.trim();
    if (!q || isLoading) return;

    setIsLoading(true);
    setError(null);
    setReply(null);
    setSources([]);

    try {
      const res = await askRag({ question: q, notebookId });
      setReply(res.reply);
      setSources(res.sources ?? []);
    } catch (err) {
      console.error(err);
      setError("Failed to ask question. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="border-t border-muted px-4 py-3 space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold">Ask this notebook (RAG)</h2>
        <span className="text-[10px] uppercase text-muted-foreground">
          /rag/ask
        </span>
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <Input
          placeholder="Ask a one-off question about this notebook..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          disabled={isLoading}
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Asking..." : "Ask"}
        </Button>
      </form>

      {error && (
        <p className="text-xs text-red-400">
          {error}
        </p>
      )}

      {reply && (
        <div className="mt-2 space-y-2">
          <div className="text-xs uppercase text-muted-foreground">
            Answer
          </div>
          <div className="text-sm whitespace-pre-wrap bg-muted/50 border border-muted rounded-lg px-3 py-2">
            {reply}
          </div>

          <div className="mt-3 space-y-1">
            <div className="text-xs uppercase text-muted-foreground">
              Sources
            </div>
            {sources.length === 0 ? (
              <p className="text-xs text-muted-foreground">
                No sources returned.
              </p>
            ) : (
              <ul className="space-y-1">
                {sources.map((s) => (
                  <li
                    key={s.id}
                    className="text-xs border border-muted rounded-md px-2 py-1"
                  >
                    <div className="flex justify-between">
                      <span className="font-medium">{s.title}</span>
                      <span className="text-[10px] text-muted-foreground">
                        score: {s.score}
                      </span>
                    </div>
                    <div className="text-[11px] text-muted-foreground line-clamp-2">
                      {s.preview}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
