const Orders = () => {
  return (
    <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Your Orders</h2>
        <p className="text-gray-500">You have no recent orders.</p>
      </div>
    </div>
  );
};

export default Orders;
