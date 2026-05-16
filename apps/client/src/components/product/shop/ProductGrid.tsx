"use client";
import EmptyState from "@/components/common/EmptyState";
import ProductCard from "@/components/product/ProductCard";
import { getProducts } from "@/features/products/productQueries";
import { filterProducts } from "@/features/products/productUtils";

type ProductGridProps = {
  category?: string;
  sort?: string;
  size?: string;
  availability?: string;
  price?: string;
};

export default function ProductGrid({
  category,
  sort,
  size,
  availability,
  price,
}: ProductGridProps) {
  const products = getProducts();
  const filteredProducts = filterProducts({
    products,
    category,
    sort,
    size,
    availability,
    price,
  });

  if (filteredProducts.length === 0) {
    return (
      <EmptyState
        title="No Products Found"
        description="Try adjusting your filters or explore other categories to find products."
        buttonText="Clear Filters"
        href="/shop"
      />
    );
  }

  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
      {filteredProducts.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </div>
  );
}
