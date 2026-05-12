import { products } from "@/data/products";

export const getAllProducts = () => {
  return products;
};

export const getProductBySlug = (slug: string) => {
  return products.find((product) => product.slug === slug);
};

export const getFeaturedProducts = (limit = 4) => {
  return products.slice(0, limit);
};

export const getRelatedProducts = (
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
