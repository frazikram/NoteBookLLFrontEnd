import { InputHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type Props = InputHTMLAttributes<HTMLInputElement>;

export function Input({ className, ...props }: Props) {
  return (
    <input
      className={cn(
        "w-full rounded-md border border-muted bg-background px-3 py-2 text-sm outline-none",
        "focus:ring-1 focus:ring-muted",
        className
      )}
      {...props}
    />
  );
}
