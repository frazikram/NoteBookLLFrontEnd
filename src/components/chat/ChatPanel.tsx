"use client";

import { useEffect, useState, FormEvent } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  ChatMessage,
  ChatSession,
  listChatSessions,
  createChatSession,
  listChatMessages,
  sendChatMessage,
} from "@/lib/api";

type Props = {
  notebookId: string;
  notebookTitle: string;
};

export function ChatPanel({ notebookId, notebookTitle }: Props) {
  const [session, setSession] = useState<ChatSession | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isBootstrapping, setIsBootstrapping] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Bootstrap: ensure there's a chat session for this notebook
  useEffect(() => {
    let cancelled = false;

    async function bootstrap() {
      setIsBootstrapping(true);
      setError(null);

      try {
        // 1) list sessions for this notebook
        const sessions = await listChatSessions(notebookId);

        let chosen: ChatSession;
        if (sessions.length > 0) {
          chosen = sessions[0];
        } else {
          // 2) create a new session if none exist
          chosen = await createChatSession({
            notebookId,
            title: `Chat for ${notebookTitle}`,
          });
        }

        if (cancelled) return;

        setSession(chosen);

        // 3) load messages for chosen session
        const msgs = await listChatMessages(chosen.id);
        if (cancelled) return;

        setMessages(msgs);
      } catch (err) {
        console.error(err);
        if (!cancelled) {
          setError("Failed to load chat session.");
        }
      } finally {
        if (!cancelled) {
          setIsBootstrapping(false);
        }
      }
    }

    bootstrap();

    return () => {
      cancelled = true;
    };
  }, [notebookId, notebookTitle]);

  const handleSend = async (e: FormEvent) => {
    e.preventDefault();
    if (!session || isSending || !input.trim()) return;

    const text = input.trim();
    setInput("");
    setIsSending(true);
    setError(null);

    try {
      const res = await sendChatMessage(session.id, text);

      // The backend returns both user + assistant messages
      setMessages((prev) => [
        ...prev,
        res.userMessage,
        res.assistantMessage,
      ]);

      // You can also use res.sources for a "Sources used" panel later
    } catch (err) {
      console.error(err);
      setError("Failed to send message.");
    } finally {
      setIsSending(false);
    }
  };

  if (isBootstrapping) {
    return (
      <div className="flex-1 flex items-center justify-center text-sm text-muted-foreground">
        Initializing chat…
      </div>
    );
  }

  if (error && !session) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center gap-2 text-sm">
        <p className="text-red-400">{error}</p>
        <Button onClick={() => window.location.reload()}>Retry</Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <div className="border-b border-muted px-4 py-2 text-xs text-muted-foreground flex justify-between">
        <span>
          Chat session: {session?.title ?? "(untitled)"} • Notebook: {notebookTitle}
        </span>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.length === 0 && (
          <div className="text-sm text-muted-foreground">
            Ask a question about <span className="font-semibold">{notebookTitle}</span> to get started.
          </div>
        )}
        {messages.map((m) => (
          <div
            key={m.id}
            className={`max-w-xl px-3 py-2 rounded text-sm whitespace-pre-wrap ${
              m.role === "USER"
                ? "ml-auto bg-primary text-primary-foreground"
                : "mr-auto bg-muted"
            }`}
          >
            {m.content}
          </div>
        ))}
      </div>

      <form
        onSubmit={handleSend}
        className="border-t border-muted p-3 flex gap-2"
      >
        <Input
          placeholder="Ask a question about this notebook..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={isSending || !session}
        />
        <Button type="submit" disabled={isSending || !session}>
          {isSending ? "Sending..." : "Send"}
        </Button>
      </form>

      {error && session && (
        <div className="px-4 py-2 text-xs text-red-400">{error}</div>
      )}
    </div>
  );
}
