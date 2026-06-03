import EmptyState from "@/components/common/EmptyState";

export default function EmptyOrders() {
  return (
    <EmptyState
      title="No Orders Yet"
      description="You haven't placed any orders yet. Start shopping to see your orders here."
      buttonText="Continue Shopping"
      href="/shop"
    />
  );
}
