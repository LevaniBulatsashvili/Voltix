import type { IOrder } from "../../../../../types/profile";
import { usePrice } from "../../../cart/hooks/usePrice";

interface IOrders {
  orders: IOrder[];
}

const Orders = ({ orders }: IOrders) => {
  const { format } = usePrice();

  return (
    <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
      {orders.map((order) => (
        <div key={order.id} className="bg-white p-6 rounded-lg shadow">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">
              Order #{order.id.slice(0, 8)}
            </h2>
            <span
              className={`text-sm px-2 py-1 rounded ${
                order.status === "delivered"
                  ? "bg-green-100 text-green-600"
                  : order.status === "pending"
                    ? "bg-yellow-100 text-yellow-600"
                    : order.status === "cancelled"
                      ? "bg-red-100 text-red-600"
                      : "bg-blue-100 text-blue-600"
              }`}
            >
              {order.status}
            </span>
          </div>

          {/* Date */}
          <p className="text-sm text-gray-500 mb-2">
            {new Date(order.date).toLocaleDateString()}
          </p>

          {/* Items */}
          <div className="space-y-2 mb-4">
            {order.items?.map((item, idx) => (
              <div
                key={item.id ?? idx}
                className="flex justify-between text-sm"
              >
                <span>
                  {item.product?.name ?? "Product"} x{item.quantity}
                </span>
                <span>{format(item.total ?? item.price * item.quantity)}</span>
              </div>
            ))}
            <div className="flex justify-between text-sm">
              <span>Delivery Fee</span>
              <span>{format(order.delivery_fee)}</span>
            </div>
          </div>

          {/* Total */}
          <div className="border-t pt-3 flex justify-between font-medium">
            <span>Total</span>
            <span>{format(order.total_amount)}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Orders;
