export type CartItem = {
  productId: number;

  title: string;
  slug: string;
  image: string;

  price: number;

  size?: string;
  color?: string;

  quantity: number;

  stock: number;
};

export type CartState = {
  items: CartItem[];
  isCartOpen: boolean;
};
