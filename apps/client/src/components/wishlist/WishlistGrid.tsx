"use client";
import WishlistCard from "./WishlistCard";
import EmptyWishlist from "./EmptyWishlist";
import { useAppSelector } from "@/store/hooks";
import { selectWishlistItems } from "@/features/wishlist/wishlistSelectors";
import { useAppDispatch } from "@/store/hooks";
import { clearWishlist } from "@/features/wishlist/wishlistSlice";
import { addToCart } from "@/features/cart/cartSlice";
import { toast } from "sonner";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function WishlistGrid() {
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectWishlistItems);
  const [isMovingAll, setIsMovingAll] = useState(false);

  const handleMoveAllToCart = () => {
    if (isMovingAll) return;

    setIsMovingAll(true);
    items.forEach((product) => {
      dispatch(
        addToCart({
          productId: product.id,
          title: product.title,
          slug: product.slug,
          image: product.images[0],
          price: product.price,
          quantity: 1,
          size: product.sizes[0],
          stock: product.stockCount,
        }),
      );
    });

    dispatch(clearWishlist());
    toast.success("All wishlist items moved to cart");

    setTimeout(() => {
      setIsMovingAll(false);
    }, 500);
  };

  if (items.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <EmptyWishlist />
      </motion.div>
    );
  }

  return (
    <>
      <div className="mb-8 flex flex-col gap-4 rounded-3xl border border-gray-200 bg-white p-5 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-xl font-semibold">Saved Products</h2>

          <p className="mt-1 text-sm text-gray-500">
            {items.length} saved item
            {items.length > 1 ? "s" : ""}
          </p>
        </div>

        <button
          disabled={isMovingAll}
          onClick={() => {
            if (items.length === 0) return;

            handleMoveAllToCart();
          }}
          className="rounded-full bg-black px-6 py-3 text-sm font-medium text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isMovingAll ? "Moving..." : "Move All to Cart"}
        </button>
      </div>

      {/* <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-3">
        {items.map((product) => (
          <WishlistCard key={product.id} {...product} />
        ))}
      </div> */}

      <motion.div
        layout
        className="grid grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-3"
      >
        <AnimatePresence mode="popLayout">
          {items.map((product) => (
            <WishlistCard key={product.id} {...product} />
          ))}
        </AnimatePresence>
      </motion.div>
    </>
  );
}
