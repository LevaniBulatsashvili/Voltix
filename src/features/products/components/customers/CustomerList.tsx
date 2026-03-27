import type { ICustomer } from "../../../../types/customer";
import CustomerCard from "../../../../components/cards/CustomerCard";
import { User, User2, UserCheck, UserPlus } from "lucide-react";

interface ICustomerList {
  customers: ICustomer[];
  startIndex: number;
  visibleCount: number;
}

const avatarIcons = [User, User2, UserCheck, UserPlus];

const CustomerList = ({
  customers,
  startIndex,
  visibleCount,
}: ICustomerList) => {
  const visibleCustomers = customers.slice(
    startIndex,
    startIndex + visibleCount,
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {visibleCustomers.map((customer, index) => {
        const AvatarIcon =
          avatarIcons[(startIndex + index) % avatarIcons.length];
        return (
          <CustomerCard
            key={startIndex + index}
            customer={customer}
            AvatarIcon={AvatarIcon}
          />
        );
      })}
    </div>
  );
};

export default CustomerList;
