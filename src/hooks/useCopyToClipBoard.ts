import { notify } from "@/lib/toast/toast";
import { useState } from "react";

export const useCopyToClipboard = (timeout = 1500) => {
  const [copied, setCopied] = useState<string | null>(null);

  const copy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(text);
      setTimeout(() => setCopied(null), timeout);
    } catch {
      notify.error("errors.failed_to_copy")
    }
  };

  const isCopied = (text: string) => copied === text;

  return { copy, isCopied };
};
