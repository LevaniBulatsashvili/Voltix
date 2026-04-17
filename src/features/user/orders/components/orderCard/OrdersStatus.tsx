interface OrderStatus {
  status: string;
}

const statusStyles: Record<string, string> = {
  delivered: "bg-green-50 text-green-700",
  pending: "bg-amber-50 text-amber-700",
  cancelled: "bg-red-50 text-red-700",
  default: "bg-blue-50 text-blue-700",
};

const OrderStatus = ({ status }: OrderStatus) => {
  const style = statusStyles[status] ?? statusStyles.default;

  return (
    <span
      className={`text-sm font-semibold px-2.5 py-1 rounded-full capitalize border-2 ${style}`}
    >
      {status}
    </span>
  );
};

export default OrderStatus;
