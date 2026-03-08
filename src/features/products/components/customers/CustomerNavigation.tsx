import { ChevronLeft, ChevronRight } from "lucide-react";
import type { FC, SVGProps } from "react";

interface ICustomerNavigation {
  onPrev: () => void;
  onNext: () => void;
  PrevDisabled: boolean;
  NextDisabled: boolean;
  PrevIcon?: FC<SVGProps<SVGSVGElement>>;
  NextIcon?: FC<SVGProps<SVGSVGElement>>;
  className?: string;
}

const CustomerNavigation = ({
  onPrev,
  onNext,
  PrevDisabled,
  NextDisabled,
  PrevIcon = ChevronLeft,
  NextIcon = ChevronRight,
  className = "flex gap-4",
}: ICustomerNavigation) => (
  <div className={className}>
    <button
      onClick={onPrev}
      className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition disabled:opacity-40"
      disabled={PrevDisabled}
    >
      <PrevIcon className="w-6 h-6 text-gray-700" />
    </button>
    <button
      onClick={onNext}
      className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition disabled:opacity-40"
      disabled={NextDisabled}
    >
      <NextIcon className="w-6 h-6 text-gray-700" />
    </button>
  </div>
);
export default CustomerNavigation;
