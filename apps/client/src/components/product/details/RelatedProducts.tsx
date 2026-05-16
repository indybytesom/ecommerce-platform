import ProductCard from "@/components/product/ProductCard";
import Container from "@/components/ui/Container";
import { getRelatedProducts } from "@/features/products/productQueries";

type RelatedProductsProps = {
  category: string;
  currentProductId: number;
};

export default function RelatedProducts({
  category,
  currentProductId,
}: RelatedProductsProps) {
  const relatedProducts = getRelatedProducts(category, currentProductId);

  return (
    <section className="mt-16 border-t border-gray-200 pt-16 lg:mt-24 lg:pt-24">
      <Container>
        <div className="mb-10 flex items-end justify-between gap-6">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-gray-500">
              You May Also Like
            </p>

            <h2 className="mt-3 text-3xl font-bold lg:text-4xl">
              Related Products
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 xl:grid-cols-4">
          {relatedProducts.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </Container>
    </section>
  );
}
