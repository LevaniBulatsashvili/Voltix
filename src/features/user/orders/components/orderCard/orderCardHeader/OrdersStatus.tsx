interface OrderStatus {
  status: string;
  statusText: string;
}

const statusStyles: Record<string, string> = {
  delivered: "bg-green-50 text-green-700",
  pending: "bg-amber-50 text-amber-700",
  cancelled: "bg-red-50 text-red-700",
  default: "bg-blue-50 text-blue-700",
};

const OrderStatus = ({ status, statusText }: OrderStatus) => {
  const style = statusStyles[status] ?? statusStyles.default;

  return (
    <span
      className={`text-sm font-semibold px-2.5 py-1 rounded-full border-2 ${style}`}
    >
      {statusText}
    </span>
  );
};

export default OrderStatus;
