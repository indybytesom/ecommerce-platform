import ProductCard from "@/components/product/ProductCard";

import { Product } from "@/types/product";

type SearchResultsProps = {
  products: Product[];
  onProductClick?: () => void;
};

export default function SearchResults({
  products,
  onProductClick,
}: SearchResultsProps) {
  if (products.length === 0) {
    return (
      <div className="py-20 text-center text-gray-500">No products found.</div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 md:gap-6 lg:gap-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {products.map((product) => (
        <div key={product.id} onClick={onProductClick}>
          <ProductCard {...product} />
        </div>
      ))}
    </div>
  );
}
