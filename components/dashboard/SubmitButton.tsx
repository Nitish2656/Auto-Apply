"use client";

import { useFormStatus } from "react-dom";
import { Loader2 } from "lucide-react";

interface SubmitButtonProps {
  children: React.ReactNode;
  className?: string;
  loadingText?: string;
  icon?: React.ReactNode;
}

export function SubmitButton({ children, className, loadingText, icon }: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className={`${className} flex items-center justify-center gap-1.5 transition-all disabled:opacity-70 disabled:cursor-not-allowed`}
    >
      {pending ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin" />
          {loadingText || "Processing..."}
        </>
      ) : (
        <>
          {icon}
          {children}
        </>
      )}
    </button>
  );
}
