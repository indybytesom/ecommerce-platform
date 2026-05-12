export type Product = {
  id: number;
  slug: string;
  title: string;
  category: string;
  description: string;
  price: number;
  oldPrice?: number;
  badge?: string;
  images: string[];
  sizes: string[];
  inStock: boolean;
  stockCount: number;
  sku: string;
};
