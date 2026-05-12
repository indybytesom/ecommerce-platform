import ProductCard from "@/components/product/ProductCard";
import { products } from "@/data/products";

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
  const filteredProducts = [...products]
    .filter((product) => {
      const matchesCategory = !category || product.category === category;

      const matchesSize = !size || product.sizes?.includes(size);

      const matchesAvailability =
        !availability ||
        (availability === "In Stock" ? product.inStock : !product.inStock);

      const matchesPrice = !price || product.price <= Number(price);

      return (
        matchesCategory && matchesSize && matchesAvailability && matchesPrice
      );
    })
    .sort((a, b) => {
      if (sort === "price-low") {
        return a.price - b.price;
      }

      if (sort === "price-high") {
        return b.price - a.price;
      }

      return 0;
    });

  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
      {filteredProducts.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </div>
  );
}
