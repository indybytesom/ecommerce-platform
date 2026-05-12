import Container from "@/components/ui/Container";
import ProductCard from "./ProductCard";
import { getFeaturedProducts } from "@/features/products/productUtils";

export default function FeaturedProducts() {
  const featuredProducts = getFeaturedProducts();

  return (
    <section className="py-20 lg:py-28">
      <Container>
        {/* HEADER */}
        <div className="mb-12 flex items-end justify-between gap-6">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.3em] text-gray-500">
              Featured Products
            </p>

            <h2 className="mt-4 text-3xl font-bold tracking-tight text-black sm:text-4xl">
              Latest Collections
            </h2>
          </div>

          <button className="hidden text-sm font-medium text-black transition hover:opacity-60 sm:block">
            View All
          </button>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 xl:grid-cols-4">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </Container>
    </section>
  );
}
