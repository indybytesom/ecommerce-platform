import { getProducts } from "./productQueries";

export const searchProducts = (query: string) => {
  if (!query.trim()) {
    return [];
  }

  const products = getProducts();
  const normalizedQuery = query.toLowerCase();

  return products.filter((product) => {
    return (
      product.title.toLowerCase().includes(normalizedQuery) ||
      product.category.toLowerCase().includes(normalizedQuery) ||
      product.description.toLowerCase().includes(normalizedQuery)
    );
  });
};
