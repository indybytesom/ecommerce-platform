import { Product } from "@/types/product";

export const isProductInWishlist = (wishlist: Product[], productId: number) => {
  return wishlist.some((item) => item.id === productId);
};
