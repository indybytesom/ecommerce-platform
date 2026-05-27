import WishlistGrid from "@/components/wishlist/WishlistGrid";

export default function WishlistPage() {
  return (
    <main className="min-h-screen px-4 py-10 md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10">
          <h1 className="text-4xl font-bold">Wishlist</h1>
          <p className="mt-3 text-gray-500">Your saved favorite products.</p>
        </div>

        <WishlistGrid />
      </div>
    </main>
  );
}
