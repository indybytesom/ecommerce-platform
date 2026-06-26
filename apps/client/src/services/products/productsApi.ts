import { Product } from "@/types/product";
import { baseApi } from "../api/baseApi";

export const productsApi = baseApi.injectEndpoints({
  overrideExisting: false,

  endpoints: (builder) => ({
    getProducts: builder.query<Product[], void>({
      query: () => "/products",
    }),
  }),
});

export const { useGetProductsQuery } = productsApi;
