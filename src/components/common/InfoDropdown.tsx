import { cn } from "@/utils/cn";
import { useRef, useState, type ReactNode } from "react";
import { useClickOutside } from "@/hooks/useClickOutside";

interface InfoDropdownProps {
  children: ReactNode;
  title?: string;
  className?: string;
  contentClassName?: string;
}

const InfoDropdown = ({
  children,
  title,
  className,
  contentClassName,
}: InfoDropdownProps) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useClickOutside(ref, () => setOpen(false));

  return (
    <div ref={ref} className={cn("z-10", className)}>
      <button
        onClick={() => setOpen((p) => !p)}
        className="size-7 rounded-full border text-sm font-medium flex items-center justify-center hover:bg-gray-100 transition"
        title={title}
      >
        i
      </button>

      {open && (
        <div
          className={cn(
            "absolute top-8 -right-4 w-[calc(100vw-2rem)] max-w-60 bg-background text-primary border rounded-xl shadow-sm p-3 flex flex-col gap-2",
            contentClassName,
          )}
        >
          {children}
        </div>
      )}
    </div>
  );
};

export default InfoDropdown;
