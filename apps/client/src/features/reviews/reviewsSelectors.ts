import { RootState } from "@/store/store";

export const selectReviewsByProduct =
  (productId: number) => (state: RootState) =>
    state.reviews.reviews.filter((review) => review.productId === productId);

export const selectUserReviewForProduct =
  (productId: number, userId?: string) => (state: RootState) => {
    if (!userId) {
      return null;
    }

    return (
      state.reviews.reviews.find(
        (review) => review.productId === productId && review.userId === userId,
      ) || null
    );
  };
