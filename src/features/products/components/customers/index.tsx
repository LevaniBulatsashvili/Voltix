import { useState } from "react";
import type { ICustomer } from "../../../../types/Customer";
import CustomerList from "./CustomerList";
import CustomerNavigation from "./CustomerNavigation";
import { useVisibleCount } from "../../hooks/useVisibleCount";

interface ICustomers {
  title: string;
  customers: ICustomer[];
}

const Customers = ({ title, customers }: ICustomers) => {
  const visibleCount = useVisibleCount();
  const [startIndex, setStartIndex] = useState(0);

  const handlePrev = () => setStartIndex((prev) => Math.max(prev - 1, 0));
  const handleNext = () =>
    setStartIndex((prev) =>
      Math.min(prev + 1, customers.length - visibleCount),
    );

  return (
    <div className="w-[90%] mx-auto mb-30">
      <div className="flex items-center justify-between mb-10">
        <h2 className="text-5xl font-extrabold uppercase text-primary">
          {title}
        </h2>
        <CustomerNavigation
          onPrev={handlePrev}
          onNext={handleNext}
          PrevDisabled={startIndex === 0}
          NextDisabled={startIndex >= customers.length - visibleCount}
        />
      </div>

      <CustomerList
        customers={customers}
        startIndex={startIndex}
        visibleCount={visibleCount}
      />
    </div>
  );
};

export default Customers;
