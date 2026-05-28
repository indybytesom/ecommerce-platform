import { Review } from "./reviewsTypes";

export const calculateAverageRating = (reviews: Review[]) => {
  if (reviews.length === 0) {
    return 0;
  }
  const total = reviews.reduce((sum, review) => sum + review.rating, 0);

  return Number((total / reviews.length).toFixed(1));
};

export const formatReviewDate = (date: string) => {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
};
