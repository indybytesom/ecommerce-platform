import { baseApi } from "../api/baseApi";
import { Review } from "@/features/reviews/reviewsTypes";

type CreateReviewRequest = Omit<Review, "id" | "createdAt">;

export const reviewsApi = baseApi.injectEndpoints({
  overrideExisting: false,

  endpoints: (builder) => ({
    getProductReviews: builder.query<Review[], number>({
      query: (productId) => `/products/${productId}/reviews`,
      providesTags: ["Reviews"],
    }),

    getMyReviews: builder.query<Review[], void>({
      query: () => "/reviews/me",
      providesTags: ["Reviews"],
    }),

    createReview: builder.mutation<Review, CreateReviewRequest>({
      query: (body) => ({
        url: "/reviews",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Reviews"],
    }),

    updateReview: builder.mutation<
      Review,
      { id: string; data: Partial<Review> }
    >({
      query: ({ id, data }) => ({
        url: `/reviews/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Reviews"],
    }),

    deleteReview: builder.mutation<void, string>({
      query: (id) => ({
        url: `/reviews/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Reviews"],
    }),
  }),
});

export const {
  useGetProductReviewsQuery,
  useGetMyReviewsQuery,
  useCreateReviewMutation,
  useUpdateReviewMutation,
  useDeleteReviewMutation,
} = reviewsApi;
