"use client";

import Image from "next/image";
import Link from "next/link";
import { useAppSelector } from "@/store/hooks";

export default function DashboardRecentlyViewed() {
  const products = useAppSelector((state) => state.recentlyViewed.items);

  const recentProducts = products.slice(0, 3);

  return (
    <div className="rounded-3xl border border-gray-200 bg-white p-6">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-semibold">Recently Viewed</h2>

        <Link href="/shop" className="text-sm font-medium">
          View More
        </Link>
      </div>

      {recentProducts.length === 0 ? (
        <p className="text-sm text-gray-500">No recently viewed products.</p>
      ) : (
        <div className="space-y-4">
          {recentProducts.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.slug}`}
              className="flex items-center gap-4"
            >
              <div className="relative h-16 w-16 overflow-hidden rounded-xl">
                <Image
                  src={product.images?.[0]}
                  alt={product.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div>
                <h3 className="font-medium">{product.title}</h3>

                <p className="text-sm text-gray-500">${product.price}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
