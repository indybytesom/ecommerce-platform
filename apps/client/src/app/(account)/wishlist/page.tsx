import WishlistGrid from "@/components/wishlist/WishlistGrid";

export default function WishlistPage() {
  return (
    <main className="min-h-screen px-4 py-10 md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-400">
              Saved Products
            </p>

            <h1 className="mt-3 text-4xl font-bold tracking-tight">
              My Wishlist
            </h1>

            <p className="mt-4 max-w-2xl text-sm leading-7 text-gray-500">
              Products you’ve saved for later shopping and inspiration.
            </p>
          </div>
        </div>

        <WishlistGrid />
      </div>
    </main>
  );
}
