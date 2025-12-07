import { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type Props = ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({ className, ...props }: Props) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-lg border border-muted px-4 py-2 text-sm font-medium",
        "bg-background hover:bg-muted/70 transition-colors disabled:opacity-50 disabled:cursor-not-allowed",
        className
      )}
      {...props}
    />
  );
}
