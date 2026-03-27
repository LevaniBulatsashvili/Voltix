import { useState } from "react";
import type { ICustomer } from "../../../../types/customer";
import CustomerList from "./CustomerList";
import CustomerNavigation from "./CustomerNavigation";
import { useVisibleCount } from "../../hooks/useVisibleCount";
import { useTranslation } from "react-i18next";

interface ICustomers {
  title: string;
  customers: ICustomer[];
}

const Customers = ({ title, customers }: ICustomers) => {
  const { t } = useTranslation();
  const visibleCount = useVisibleCount();
  const [startIndex, setStartIndex] = useState(0);

  const handlePrev = () => setStartIndex((prev) => Math.max(prev - 1, 0));
  const handleNext = () =>
    setStartIndex((prev) =>
      Math.min(prev + 1, customers.length - visibleCount),
    );

  return (
    <div className="w-[90%] mx-auto mb-20 sm:mb-30">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4 sm:mb-10">
        <h2 className="text-4xl sm:text-5xl font-extrabold uppercase text-primary text-center sm:text-start">
          {t(title)}
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
