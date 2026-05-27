import Link from "next/link";

export default function EmptyWishlist() {
  return (
    <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-gray-300 px-8 py-20 text-center">
      <h2 className="text-2xl font-semibold">Your wishlist is empty</h2>

      <p className="mt-4 max-w-md text-gray-500">
        Save products you love to your wishlist and access them anytime.
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
