import { products } from "@/data/products";

export const searchProducts = (query: string) => {
  if (!query.trim()) {
    return [];
  }

  const normalizedQuery = query.toLowerCase();

  return products.filter((product) => {
    return (
      product.title.toLowerCase().includes(normalizedQuery) ||
      product.category.toLowerCase().includes(normalizedQuery) ||
      product.description.toLowerCase().includes(normalizedQuery)
    );
  });
};
