import {
  selectFeaturedProducts,
  selectProductBySlug,
  selectProducts,
  selectRelatedProducts,
} from "./productSelectors";

export const getProducts = () => {
  return selectProducts();
};

export const getProductBySlug = (slug: string) => {
  return selectProductBySlug(slug);
};

export const getFeaturedProducts = () => {
  return selectFeaturedProducts();
};

export const getRelatedProducts = (
  category: string,
  currentProductId: number,
  limit = 4,
) => {
  return selectRelatedProducts(category, currentProductId, limit);
};
