import type { Metadata } from "next";
import "./globals.css";
import { ReactNode } from "react";
import { AppShell } from "@/components/layout/AppShell";

export const metadata: Metadata = {
  title: "NotebookLLM",
  description: "Notebook-centric LLM UI"
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
