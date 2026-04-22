import { Box } from "lucide-react";

interface IEmptyState {
  title: string;
  description?: string;
  className?: string;
}

const EmptyState = ({ title, description, className }: IEmptyState) => {
  return (
    <div
      className={`w-full flex flex-col items-center justify-center px-8 py-12 text-center mx-auto border rounded-2xl ${className}`}
    >
      <Box className="size-16 opacity-85 mb-6" />
      <h3 className="text-xl font-semibold mb-2 capitalize">{title}</h3>
      {description && <p className="opacity-85 text-sm">{description}</p>}
    </div>
  );
};

export default EmptyState;
