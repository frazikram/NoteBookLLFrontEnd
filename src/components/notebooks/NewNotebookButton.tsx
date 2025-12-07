"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { createNotebook } from "@/lib/api";

export function NewNotebookButton() {
  const [isCreating, setIsCreating] = useState(false);
  const router = useRouter();

  const handleClick = async () => {
    if (isCreating) return;

    const title = window.prompt("Notebook title:", "LLM Notebook");
    if (!title || !title.trim()) return;

    const description = window.prompt("Description (optional):", "") ?? null;

    try {
      setIsCreating(true);
      await createNotebook({
        title: title.trim(),
        description: description && description.trim().length > 0 ? description : null,
      });

      // re-fetch notebooks on the server page
      router.refresh();
    } catch (err) {
      console.error(err);
      window.alert("Failed to create notebook. Check the console/logs.");
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <Button onClick={handleClick} disabled={isCreating}>
      {isCreating ? "Creating..." : "New Notebook"}
    </Button>
  );
}
