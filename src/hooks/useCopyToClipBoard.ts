import { useState } from "react";

export const useCopyToClipboard = (timeout = 1500) => {
  const [copied, setCopied] = useState<string | null>(null);

  const copy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(text);
    setTimeout(() => setCopied(null), timeout);
  };

  const isCopied = (text: string) => copied === text;

  return { copy, isCopied };
};
