import { useEffect, useRef } from "react";

export function useClickOutside(
  refs:
    | React.RefObject<HTMLElement | null>
    | React.RefObject<HTMLElement | null>[],
  handler: () => void,
) {
  const handlerRef = useRef(handler);

  useEffect(() => {
    handlerRef.current = handler;
  });

  useEffect(() => {
    const refsArray = Array.isArray(refs) ? refs : [refs];
    const listener = (event: MouseEvent) => {
      if (refsArray.some((ref) => ref.current?.contains(event.target as Node)))
        return;
      handlerRef.current();
    };
    document.addEventListener("mousedown", listener);
    return () => document.removeEventListener("mousedown", listener);
  }, [refs]);
}
