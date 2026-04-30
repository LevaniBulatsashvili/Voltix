import { useState, useEffect, useRef, type ReactNode } from "react";

interface InfoDropdownProps {
  children: ReactNode;
  title?: string;
  className?: string;
  contentClassName?: string;
}

const InfoDropdown = ({
  children,
  title,
  className = "",
  contentClassName = "",
}: InfoDropdownProps) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className={`z-100 ${className}`}>
      <button
        onClick={() => setOpen((p) => !p)}
        className="size-7 rounded-full border text-sm font-medium flex items-center justify-center hover:bg-gray-100 transition"
        title={title}
      >
        i
      </button>

      {open && (
        <div
          className={`absolute top-8 -right-4 w-[calc(100vw-2rem)] max-w-60 bg-background text-primary border rounded-xl shadow-sm p-3 flex flex-col gap-2 ${contentClassName}`}
        >
          {children}
        </div>
      )}
    </div>
  );
};

export default InfoDropdown;
