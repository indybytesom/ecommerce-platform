"use client";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types/product";
type ProductCardProps = Product;
import WishlistButton from "@/components/wishlist/WishlistButton";
import {
  addToWishlist,
  removeFromWishlist,
} from "@/features/wishlist/wishlistSlice";
import { selectIsInWishlist } from "@/features/wishlist/wishlistSelectors";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { toast } from "sonner";

export default function ProductCard({
  id,
  slug,
  title,
  category,
  description,
  price,
  oldPrice,
  badge,
  images,
  sizes,
  inStock,
  stockCount,
  sku,
}: ProductCardProps) {
  const dispatch = useAppDispatch();

  const isWishlisted = useAppSelector(selectIsInWishlist(id));

  const handleWishlistToggle = () => {
    if (isWishlisted) {
      dispatch(removeFromWishlist(id));
      toast.success("Removed from wishlist");
    } else {
      dispatch(
        addToWishlist({
          id,
          slug,
          title,
          category,
          description,
          price,
          oldPrice,
          badge,
          images,
          sizes,
          inStock,
          stockCount,
          sku,
        }),
      );
      toast.success("Added to wishlist");
    }
  };
  return (
    <div className="group relative">
      <WishlistButton isActive={isWishlisted} onClick={handleWishlistToggle} />

      <Link href={`/products/${slug}`}>
        {/* IMAGE */}
        <div className="relative overflow-hidden rounded-xl bg-gray-100 transition-all duration-500 group-hover:-translate-y-1 group-hover:shadow-xl md:rounded-2xl lg:rounded-3xl">
          {/* BADGE */}
          {badge && (
            <span className="absolute left-4 top-4 z-10 rounded-full bg-black px-3 py-1 text-xs text-white">
              {badge}
            </span>
          )}

          {/* STOCK */}
          {!inStock && (
            <span className="absolute right-4 top-4 z-10 rounded-full bg-red-500 px-3 py-1 text-xs text-white">
              Out of Stock
            </span>
          )}

          <div className="relative aspect-[4/5] overflow-hidden">
            <Image
              src={images?.[0] || "/images/products/product-1.jpg"}
              alt={title}
              fill
              className="object-cover transition duration-500 group-hover:scale-105"
            />
          </div>
        </div>

        {/* CONTENT */}
        <div className="mt-5">
          <p className="text-sm text-gray-500">{category}</p>

          <h3 className="mt-2 text-lg font-semibold">{title}</h3>

          <div className="mt-3 flex items-center gap-3">
            <span className="font-semibold">${price}</span>

            {oldPrice && (
              <span className="text-sm text-gray-400 line-through">
                ${oldPrice}
              </span>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
}
