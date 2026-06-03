import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ReviewsState, Review } from "./reviewsTypes";
import { loadReviewsState } from "@/store/persistence";
const persistedReviews = loadReviewsState();

const initialState: ReviewsState = persistedReviews || {
  reviews: [],
};

const reviewsSlice = createSlice({
  name: "reviews",

  initialState,

  reducers: {
    addReview: (state, action: PayloadAction<Review>) => {
      state.reviews.unshift(action.payload);
    },

    clearReviews: (state) => {
      state.reviews = [];
    },

    updateReview: (
      state,
      action: PayloadAction<{
        reviewId: string;
        rating: number;
        comment: string;
      }>,
    ) => {
      const review = state.reviews.find(
        (item) => item.id === action.payload.reviewId,
      );

      if (!review) return;

      review.rating = action.payload.rating;
      review.comment = action.payload.comment;
    },

    deleteReview: (state, action: PayloadAction<string>) => {
      state.reviews = state.reviews.filter(
        (review) => review.id !== action.payload,
      );
    },
  },
});

export const { addReview, updateReview, deleteReview, clearReviews } =
  reviewsSlice.actions;

export default reviewsSlice.reducer;
