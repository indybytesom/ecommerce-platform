import { notFound } from "next/navigation";
import ProductGallery from "@/components/product/details/ProductGallery";
import ProductInfo from "@/components/product/details/ProductInfo";
import RelatedProducts from "@/components/product/details/RelatedProducts";
import Container from "@/components/ui/Container";
import { getProductBySlug } from "@/features/products/productQueries";

export default async function ProductDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <main className="py-16 lg:py-24">
      <Container>
        <div className="grid gap-14 lg:grid-cols-2">
          {/* LEFT */}
          <ProductGallery product={product} />

          {/* RIGHT */}
          <ProductInfo product={product} />
        </div>
      </Container>

      <RelatedProducts
        category={product.category}
        currentProductId={product.id}
      />
    </main>
  );
}
