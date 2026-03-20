interface IUserOrders {
  userId: string;
}

const Orders = ({ userId }: IUserOrders) => {
  // Normally fetch with TanStack Query here

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Your Orders</h2>
      <p className="text-gray-500">You have no recent orders.</p>
    </div>
  );
};

export default Orders;
