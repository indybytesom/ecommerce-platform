import Link from "next/link";
import { Heart } from "lucide-react";

export default function EmptyWishlist() {
  return (
    <div className="flex flex-col items-center justify-center rounded-[32px] border border-dashed border-gray-300 bg-gray-50 px-6 py-20 text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-sm">
        <Heart size={34} className="text-gray-400" />
      </div>

      <h2 className="mt-8 text-3xl font-bold tracking-tight">
        Your wishlist is empty
      </h2>

      <p className="mt-4 max-w-md text-sm leading-7 text-gray-500">
        Save products you love to your wishlist and easily access them later.
      </p>

      <Link
        href="/shop"
        className="mt-8 rounded-full bg-black px-8 py-4 text-sm font-medium text-white transition hover:opacity-90"
      >
        Explore Products
      </Link>
    </div>
  );
}