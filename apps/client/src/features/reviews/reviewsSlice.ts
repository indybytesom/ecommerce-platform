import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ReviewsState, Review } from "./reviewsTypes";
import { loadReviewsState } from "@/store/persistence";
const persistedReviews = loadReviewsState();

const initialState: ReviewsState =
  persistedReviews || {
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
  },
});

export const { addReview, clearReviews } = reviewsSlice.actions;

export default reviewsSlice.reducer;
