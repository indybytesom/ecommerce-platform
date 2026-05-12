import Image from "next/image";
import Link from "next/link";

import { Product } from "@/types/product";

type ProductCardProps = Product;

export default function ProductCard({
  slug,
  title,
  category,
  price,
  oldPrice,
  badge,
  images,
  inStock,
}: ProductCardProps) {
  return (
    <Link
      href={`/products/${slug}`}
      className="group block"
    >
      {/* IMAGE */}
      <div className="relative overflow-hidden rounded-xl md:rounded-2xl lg:rounded-3xl bg-gray-100">
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
        <p className="text-sm text-gray-500">
          {category}
        </p>

        <h3 className="mt-2 text-lg font-semibold">
          {title}
        </h3>

        <div className="mt-3 flex items-center gap-3">
          <span className="font-semibold">
            ${price}
          </span>

          {oldPrice && (
            <span className="text-sm text-gray-400 line-through">
              ${oldPrice}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}