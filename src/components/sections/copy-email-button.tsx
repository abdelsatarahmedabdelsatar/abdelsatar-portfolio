"use client";

import { Check, Copy } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

type CopyStatus = "idle" | "copied" | "failed";

const statusMessages: Record<CopyStatus, string> = {
  idle: "",
  copied: "copied",
  failed: "Couldn't copy. Please copy it manually.",
};

export function CopyEmailButton({ email }: { email: string }) {
  const [status, setStatus] = useState<CopyStatus>("idle");

  useEffect(() => {
    if (status === "idle") return;
    const timer = setTimeout(() => setStatus("idle"), 2500);
    return () => clearTimeout(timer);
  }, [status]);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(email);
      setStatus("copied");
    } catch {
      setStatus("failed");
    }
  }

  return (
    <span className="inline-flex items-center gap-2">
      <Button variant="ghost" size="icon" onClick={copyEmail} aria-label="Copy email address">
        {status === "copied" ? <Check className="text-accent" /> : <Copy />}
      </Button>
      <span role="status" className="text-xs text-muted-foreground">
        {statusMessages[status]}
      </span>
    </span>
  );
}
