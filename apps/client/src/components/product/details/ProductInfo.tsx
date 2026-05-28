"use client";
import { useState } from "react";
import { Product } from "@/types/product";
import ProductAccordion from "./ProductAccordion";
import QuantitySelector from "./QuantitySelector";
import { useAppDispatch } from "@/store/hooks";
import { addToCart } from "@/features/cart/cartSlice";
import { Heart, ShieldCheck, Truck, RotateCcw } from "lucide-react";
import { toast } from "sonner";
import {
  addToWishlist,
  removeFromWishlist,
} from "@/features/wishlist/wishlistSlice";
import { selectIsInWishlist } from "@/features/wishlist/wishlistSelectors";
import { useAppSelector } from "@/store/hooks";

type ProductInfoProps = {
  product: Product;
};

export default function ProductInfo({ product }: ProductInfoProps) {
  const dispatch = useAppDispatch();
  const [selectedSize, setSelectedSize] = useState("S");
  const [quantity, setQuantity] = useState(1);
  const isWishlisted = useAppSelector(selectIsInWishlist(product.id));

  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decreaseQuantity = () => {
    if (quantity === 1) return;

    setQuantity((prev) => prev - 1);
  };

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        productId: product.id,
        title: product.title,
        slug: product.slug,
        image: product.images[0],
        price: product.price,
        size: selectedSize,
        quantity,
        stock: product.stockCount,
      }),
    );
  };

  const handleWishlistToggle = () => {
    if (isWishlisted) {
      dispatch(removeFromWishlist(product.id));
      toast.success("Removed from wishlist");
    } else {
      dispatch(addToWishlist(product));
      toast.success("Added to wishlist");
    }
  };

  return (
    <div className="max-w-xl">
      <p className="text-sm uppercase tracking-wide text-gray-500">
        {product.category}
      </p>

      <h1 className="mt-3 text-4xl font-bold">{product.title}</h1>

      <div className="mt-6 flex items-center gap-3">
        <span className="text-3xl font-semibold">${product.price}</span>

        {product.oldPrice && (
          <span className="text-lg text-gray-400 line-through">
            ${product.oldPrice}
          </span>
        )}
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-3">
        {product.inStock ? (
          <>
            <p className="text-sm font-semibold text-green-600">
              In Stock ({product.stockCount} available)
            </p>

            {product.stockCount <= 5 && (
              <span className="rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-600">
                Selling Fast
              </span>
            )}
          </>
        ) : (
          <p className="text-sm font-semibold text-red-500">Out of Stock</p>
        )}
      </div>

      <p className="mt-6 max-w-lg leading-7 text-gray-600">
        {product.description}
      </p>

      {/* VARIANTS */}
      <div className="mt-8 flex flex-wrap gap-3">
        {product.sizes.map((size) => (
          <button
            key={size}
            onClick={() => setSelectedSize(size)}
            className={`rounded-xl px-5 py-3 text-sm font-medium transition ${
              selectedSize === size
                ? "border border-black bg-black text-white"
                : "border border-gray-300 hover:border-black"
            }`}
          >
            {size}
          </button>
        ))}
      </div>

      {/* QUANTITY */}
      <div className="mt-10 rounded-3xl border border-gray-200 p-5">
        <div className="mb-4 flex items-center justify-between">
          <p className="text-sm font-semibold">Quantity</p>

          <p className="text-sm text-gray-500">Max: {product.stockCount}</p>
        </div>

        <QuantitySelector
          quantity={quantity}
          increaseQuantity={increaseQuantity}
          decreaseQuantity={decreaseQuantity}
        />
      </div>

      {/* ACTIONS */}
      <div className="mt-8 flex flex-col gap-4 sm:flex-row">
        <button
          onClick={handleAddToCart}
          disabled={!product.inStock}
          className="flex-1 rounded-2xl bg-black px-8 py-4 text-sm font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Add to Cart
        </button>

        <button
          disabled={!product.inStock}
          className="flex-1 rounded-2xl border border-black px-8 py-4 text-sm font-semibold transition hover:bg-black hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
        >
          Buy Now
        </button>

        <button
          onClick={handleWishlistToggle}
          className={`flex h-14 w-14 items-center justify-center rounded-2xl border transition ${
            isWishlisted
              ? "border-black bg-black text-white"
              : "border-gray-300 hover:border-black"
          }`}
        >
          <Heart size={20} className={isWishlisted ? "fill-white" : ""} />
        </button>
      </div>

      <div className="mt-10 grid gap-4 rounded-3xl border border-gray-200 p-5">
        <div className="flex items-start gap-4">
          <Truck className="mt-0.5" size={20} />

          <div>
            <p className="font-medium">Free Shipping</p>

            <p className="mt-1 text-sm text-gray-500">
              Free worldwide shipping on orders over $100.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <RotateCcw className="mt-0.5" size={20} />

          <div>
            <p className="font-medium">Easy Returns</p>

            <p className="mt-1 text-sm text-gray-500">
              30-day return policy for all eligible items.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <ShieldCheck className="mt-0.5" size={20} />

          <div>
            <p className="font-medium">Secure Checkout</p>

            <p className="mt-1 text-sm text-gray-500">
              Your payment information is processed securely.
            </p>
          </div>
        </div>
      </div>

      <ProductAccordion />
    </div>
  );
}
