"use client";
import { useAppSelector } from "@/store/hooks";

import {
  selectHasOrders,
  selectOrders,
} from "@/features/orders/orderSelectors";

import EmptyOrders from "./EmptyOrders";
import OrderCard from "./OrderCard";
import { useState } from "react";
import OrdersToolbar from "./OrdersToolbar";

export default function OrdersList() {
  const orders = useAppSelector(selectOrders);
  const hasOrders = useAppSelector(selectHasOrders);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");

  const filteredOrders = orders.filter((order) => {
    const matchesSearch = order.id.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = status === "all" || order.status === status;

    return matchesSearch && matchesStatus;
  });

  if (!hasOrders) {
    return <EmptyOrders />;
  }

  return (
    <>
      <OrdersToolbar
        search={search}
        setSearch={setSearch}
        status={status}
        setStatus={setStatus}
      />

      <div className="space-y-5">
        {filteredOrders.length === 0 ? (
          <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center text-gray-500">
            No matching orders found.
          </div>
        ) : (
          filteredOrders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))
        )}
      </div>
    </>
  );
}
