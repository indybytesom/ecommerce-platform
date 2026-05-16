// import { products } from "@/data/products";

// export const getAllProducts = () => {
//   return products;
// };

// export const getProductBySlug = (slug: string) => {
//   return products.find((product) => product.slug === slug);
// };

// export const getFeaturedProducts = (limit = 4) => {
//   return products.slice(0, limit);
// };

// export const getRelatedProducts = (
//   category: string,
//   currentProductId: number,
//   limit = 4,
// ) => {
//   return products
//     .filter(
//       (product) =>
//         product.category === category && product.id !== currentProductId,
//     )
//     .slice(0, limit);
// };

import { Product } from "@/types/product";
interface FilterProductsParams {
  products: Product[];
  category?: string;
  sort?: string;
  size?: string;
  availability?: string;
  price?: string;
}

export const filterProducts = ({
  products,
  category,
  sort,
  size,
  availability,
  price,
}: FilterProductsParams) => {
  return [...products]
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
};
