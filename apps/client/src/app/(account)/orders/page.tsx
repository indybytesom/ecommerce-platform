import OrdersList from "@/components/account/orders/OrdersList";

export default function OrdersPage() {
  return (
    <main className="min-h-screen px-4 py-10 md:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">
            My Orders
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            View and manage your recent orders.
          </p>
        </div>

        <OrdersList />
      </div>
    </main>
  );
}