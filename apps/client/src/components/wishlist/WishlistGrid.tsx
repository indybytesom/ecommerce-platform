"use client";
import ProductCard from "@/components/product/ProductCard";
import EmptyWishlist from "./EmptyWishlist";
import { useAppSelector } from "@/store/hooks";
import { selectWishlistItems } from "@/features/wishlist/wishlistSelectors";

export default function WishlistGrid() {
  const items = useAppSelector(selectWishlistItems);

  if (items.length === 0) {
    return <EmptyWishlist />;
  }

  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-3">
      {items.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </div>
  );
}
