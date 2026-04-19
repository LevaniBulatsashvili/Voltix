interface IImageAddSlot {
  current: number;
  max: number;
  onClick: () => void;
  onDrop: (e: React.DragEvent) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDragLeave: () => void;
  isDragging?: boolean;
}

export const ImageAddSlot = ({
  current,
  max,
  onClick,
  onDrop,
  onDragOver,
  onDragLeave,
  isDragging,
}: IImageAddSlot) => (
  <button
    type="button"
    onClick={onClick}
    onDrop={onDrop}
    onDragOver={onDragOver}
    onDragLeave={onDragLeave}
    className={`w-28 h-28 rounded-lg border-2 border-dashed flex flex-col items-center justify-center gap-1 transition-colors shrink-0
      ${
        isDragging
          ? "border-blue-400 bg-blue-50 text-blue-400"
          : "border-gray-300 hover:border-gray-400 text-gray-400 hover:text-gray-500"
      }`}
  >
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 5v14M5 12h14"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
    <span className="text-xs">
      {current}/{max}
    </span>
  </button>
);
