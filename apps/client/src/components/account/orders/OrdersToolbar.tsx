"use client";

import { OrderStatus } from "@/features/orders/orderTypes";

const statuses: ("all" | OrderStatus)[] = [
  "all",
  "pending",
  "processing",
  "paid",
  "shipped",
  "delivered",
  "cancelled",
];

interface OrdersToolbarProps {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  status: string;
  setStatus: React.Dispatch<React.SetStateAction<string>>;
}

export default function OrdersToolbar({
  search,
  setSearch,
  status,
  setStatus,
}: OrdersToolbarProps) {
  return (
    <div className="mb-6 rounded-2xl border border-gray-200 bg-white p-5">
      {/* SEARCH */}
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search Order ID..."
        className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-black"
      />

      {/* FILTERS */}
      <div className="mt-4 flex flex-wrap gap-2">
        {statuses.map((item) => (
          <button
            key={item}
            onClick={() => setStatus(item)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              status === item
                ? "bg-black text-white"
                : "border border-gray-300 hover:border-black"
            }`}
          >
            {item.charAt(0).toUpperCase() + item.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
}
