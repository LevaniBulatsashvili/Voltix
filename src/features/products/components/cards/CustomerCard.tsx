import { Check } from "lucide-react";
import type { ICustomer } from "../../../../types/Customer";
import formatCustomerName from "../../utils/formatCustomerName";
import type { FC, SVGProps } from "react";

interface CustomerCardProps {
  customer: ICustomer;
  AvatarIcon: FC<SVGProps<SVGSVGElement>>;
}

const CustomerCard = ({ customer, AvatarIcon }: CustomerCardProps) => {
  return (
    <div className="bg-gray-50 p-7 rounded-2xl shadow hover:shadow-lg transition h-80 overflow-auto">
      {customer.rating && (
        <div className="text-3xl flex items-center gap-1 mb-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <span
              key={i}
              className={`text-yellow-500 ${
                i < customer.rating ? "opacity-100" : "opacity-50"
              }`}
            >
              ★
            </span>
          ))}
        </div>
      )}

      <div className="flex items-center mb-4">
        <div className="w-12 h-12 mr-4 rounded-full bg-gray-200 flex items-center justify-center">
          <AvatarIcon className="w-8 h-8 text-gray-700" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <p className="text-xl font-bold">
              {formatCustomerName(customer.name)}
            </p>
            <div className="w-4 h-4 rounded-full bg-green-500 flex items-center justify-center">
              <Check className="w-3 h-3 text-white" />
            </div>
          </div>
          <p className="text-sm text-gray-500">{customer.location}</p>
        </div>
      </div>

      <p className="text-gray-700">{customer.comment}</p>
    </div>
  );
};

export default CustomerCard;
