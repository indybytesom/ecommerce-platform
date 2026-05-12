"use client";
import { useState } from "react";
import { Product } from "@/types/product";
import ProductAccordion from "./ProductAccordion";
import QuantitySelector from "./QuantitySelector";
import { useAppDispatch } from "@/store/hooks";
import { addToCart } from "@/features/cart/cartSlice";

type ProductInfoProps = {
  product: Product;
};

export default function ProductInfo({ product }: ProductInfoProps) {
  const dispatch = useAppDispatch();
  const [selectedSize, setSelectedSize] = useState("S");
  const [quantity, setQuantity] = useState(1);

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

      <div className="mt-4">
        {product.inStock ? (
          <p className="text-sm font-medium text-green-600">
            In Stock ({product.stockCount} available)
          </p>
        ) : (
          <p className="text-sm font-medium text-red-500">Out of Stock</p>
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
      <div className="mt-10">
        <p className="mb-4 text-sm font-medium">Quantity</p>

        <QuantitySelector
          quantity={quantity}
          increaseQuantity={increaseQuantity}
          decreaseQuantity={decreaseQuantity}
        />
      </div>

      {/* ACTIONS */}
      <div className="mt-10 flex flex-col gap-4 sm:flex-row">
        <button
          onClick={handleAddToCart}
          disabled={!product.inStock}
          className="rounded-xl bg-black px-8 py-4 text-white disabled:cursor-not-allowed disabled:opacity-50"
        >
          Add to Cart
        </button>

        <button
          className="rounded-xl border border-black px-8 py-4"
          disabled={!product.inStock}
        >
          Buy Now
        </button>
      </div>

      <ProductAccordion />
    </div>
  );
}
