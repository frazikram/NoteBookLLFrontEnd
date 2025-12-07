// src/lib/api.ts
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080";

export interface Notebook {
  id: string;
  userId: string;
  title: string;
  description: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Note {
  id: string;
  notebookId: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export type ChatRole = "USER" | "ASSISTANT" | "SYSTEM";

export interface ChatSession {
  id: string;
  userId: string;
  notebookId: string | null;
  title: string | null;
  createdAt: string;
}

export interface ChatMessage {
  id: string;
  chatSessionId: string;
  role: ChatRole;
  content: string;
  createdAt: string;
}

export interface RagSource {
  id: string;
  title: string;
  preview: string;
  score: number;
}

export interface RagAskResponse {
  reply: string;
  sources: RagSource[];
}

export interface ChatSendResponse {
  userMessage: ChatMessage;
  assistantMessage: ChatMessage;
  sources: RagSource[];
}


async function apiFetch<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    cache: "no-store",          // 👈 important: always fresh
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options?.headers ?? {}),
    },
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    console.error("API error", res.status, res.statusText, body);
    throw new Error(`API error: ${res.status} ${res.statusText}`);
  }

  return res.json() as Promise<T>;
}


/**
 * Notebooks
 */

export function getNotebooks() {
  return apiFetch<Notebook[]>("/notebooks");
}

export function getNotebook(id: string) {
  return apiFetch<Notebook>(`/notebooks/${id}`);
}

export function getNotebookNotes(notebookId: string) {
  return apiFetch<Note[]>(`/notebooks/${notebookId}/notes`);
}

// you can add create/update/delete later as needed
// export function createNotebook(payload: { title: string; description?: string | null }) { ... }

/**
 * Chat sessions
 */

export function listChatSessions(notebookId?: string) {
  const query = notebookId ? `?notebookId=${encodeURIComponent(notebookId)}` : "";
  return apiFetch<ChatSession[]>(`/chat/sessions${query}`);
}

export function createChatSession(payload: {
  notebookId?: string;
  title?: string | null;
}) {
  return apiFetch<ChatSession>("/chat/sessions", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function listChatMessages(sessionId: string) {
  return apiFetch<ChatMessage[]>(`/chat/sessions/${sessionId}/messages`);
}

export function sendChatMessage(sessionId: string, content: string) {
  return apiFetch<ChatSendResponse>(`/chat/sessions/${sessionId}/messages`, {
    method: "POST",
    body: JSON.stringify({ content }),
  });
}

/**
 * RAG ask (not used in UI yet, but ready)
 */

export function askRag(payload: { question: string; notebookId: string }) {
  return apiFetch<RagAskResponse>("/rag/ask", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}
export function createNotebook(payload: {
  title: string;
  description?: string | null;
}) {
  return apiFetch<Notebook>("/notebooks", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}
