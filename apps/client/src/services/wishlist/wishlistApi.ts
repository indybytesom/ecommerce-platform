import { baseApi } from "../api/baseApi";
import { WishlistItem } from "@/features/wishlist/wishlistTypes";

export const wishlistApi = baseApi.injectEndpoints({
  overrideExisting: false,

  endpoints: (builder) => ({
    getWishlist: builder.query<WishlistItem[], void>({
      query: () => "/wishlist",
      providesTags: ["Wishlist"],
    }),

    addToWishlist: builder.mutation<WishlistItem, number>({
      query: (productId) => ({
        url: "/wishlist",
        method: "POST",
        body: {
          productId,
        },
      }),

      invalidatesTags: ["Wishlist"],
    }),

    removeFromWishlist: builder.mutation<void, number>({
      query: (productId) => ({
        url: `/wishlist/${productId}`,
        method: "DELETE",
      }),

      invalidatesTags: ["Wishlist"],
    }),

    clearWishlist: builder.mutation<void, void>({
      query: () => ({
        url: "/wishlist",
        method: "DELETE",
      }),

      invalidatesTags: ["Wishlist"],
    }),
  }),
});

export const {
  useGetWishlistQuery,
  useAddToWishlistMutation,
  useRemoveFromWishlistMutation,
  useClearWishlistMutation,
} = wishlistApi;
