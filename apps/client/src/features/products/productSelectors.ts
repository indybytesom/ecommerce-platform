import { products } from "@/data/products";

export const selectProducts = () => {
  return products;
};

export const selectProductBySlug = (slug: string) => {
  return products.find((product) => product.slug === slug);
};

export const selectFeaturedProducts = () => {
  return products.slice(0, 4);
};

export const selectRelatedProducts = (
  category: string,
  currentProductId: number,
  limit = 4,
) => {
  return products
    .filter(
      (product) =>
        product.category === category && product.id !== currentProductId,
    )
    .slice(0, limit);
};
