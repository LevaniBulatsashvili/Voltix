interface OrderStatus {
  status: string;
  statusText: string;
}

const statusStyles: Record<string, string> = {
  delivered: "bg-green-50 text-green-800 border-green-300",
  pending: "bg-amber-50 text-amber-800 border-amber-300",
  cancelled: "bg-red-50   text-red-800   border-red-300",
  default: "bg-blue-50  text-blue-800  border-blue-300",
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
