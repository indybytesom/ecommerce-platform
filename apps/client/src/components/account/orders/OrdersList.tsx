"use client";
import { useAppSelector } from "@/store/hooks";

import {
  selectHasOrders,
  selectOrders,
} from "@/features/orders/orderSelectors";

import EmptyOrders from "./EmptyOrders";
import OrderCard from "./OrderCard";

export default function OrdersList() {
  const orders = useAppSelector(selectOrders);

  const hasOrders = useAppSelector(selectHasOrders);

  if (!hasOrders) {
    return <EmptyOrders />;
  }

  return (
    <div className="space-y-5">
      {orders.map((order) => (
        <OrderCard key={order.id} order={order} />
      ))}
    </div>
  );
}
