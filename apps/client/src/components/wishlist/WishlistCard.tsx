"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingBag, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Product } from "@/types/product";
import { useAppDispatch } from "@/store/hooks";
import { removeFromWishlist } from "@/features/wishlist/wishlistSlice";
import { addToCart } from "@/features/cart/cartSlice";
import { motion } from "framer-motion";

type WishlistCardProps = Product;

export default function WishlistCard({
  id,
  slug,
  title,
  category,
  // description,
  price,
  oldPrice,
  badge,
  images,
  sizes,
  inStock,
  stockCount,
  // sku,
}: WishlistCardProps) {
  const dispatch = useAppDispatch();

  const handleRemove = () => {
    dispatch(removeFromWishlist(id));

    toast.success("Removed from wishlist");
  };

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        productId: id,
        title,
        slug,
        image: images[0],
        price,
        quantity: 1,
        size: sizes[0],
        stock: stockCount,
      }),
    );
    dispatch(removeFromWishlist(id));
    toast.success("Added to cart");
  };

  return (
    <motion.div
      layout
      initial={{
        opacity: 0,
        y: 30,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      exit={{
        opacity: 0,
        scale: 0.9,
      }}
      transition={{
        duration: 0.3,
      }}
      className="group overflow-hidden rounded-3xl border border-gray-200 bg-white transition-all duration-500 hover:shadow-2xl"
    >
      {/* IMAGE */}
      <Link href={`/products/${slug}`}>
        <div className="relative aspect-[4/5] overflow-hidden bg-gray-100">
          <Image
            src={images?.[0]}
            alt={title}
            fill
            className="object-cover transition duration-500 group-hover:scale-105"
          />

          {badge && (
            <span className="absolute left-4 top-4 rounded-full bg-black px-3 py-1 text-xs text-white">
              {badge}
            </span>
          )}
        </div>
      </Link>

      {/* CONTENT */}
      <div className="p-5">
        <p className="text-sm text-gray-500">{category}</p>

        <Link href={`/products/${slug}`}>
          <h3 className="mt-2 text-lg font-semibold transition hover:text-gray-600">
            {title}
          </h3>
        </Link>

        <div className="mt-3 flex items-center gap-3">
          <span className="font-semibold">${price}</span>

          {oldPrice && (
            <span className="text-sm text-gray-400 line-through">
              ${oldPrice}
            </span>
          )}
        </div>

        {/* ACTIONS */}
        <div className="mt-6 flex gap-3">
          <motion.button
            whileTap={{ scale: 0.96 }}
            whileHover={{ scale: 1.01 }}
            onClick={handleAddToCart}
            disabled={!inStock}
            className="flex flex-1 items-center justify-center gap-2 rounded-full bg-black px-4 py-3 text-sm font-medium text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:bg-gray-300"
          >
            <ShoppingBag size={16} />

            {inStock ? "Add to Cart" : "Out of Stock"}
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.96 }}
            whileHover={{ scale: 1.01 }}
            onClick={handleRemove}
            className="flex h-12 w-12 items-center justify-center rounded-full border border-gray-300 transition hover:border-red-500 hover:text-red-500"
          >
            <Trash2 size={18} />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
