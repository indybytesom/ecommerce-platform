"use client";
import { useAppSelector } from "@/store/hooks";
import { selectReviewsByProduct } from "@/features/reviews/reviewsSelectors";
import { calculateAverageRating } from "@/features/reviews/reviewsUtils";
import ReviewSummary from "./ReviewSummary";
import ReviewCard from "./ReviewCard";
import Container from "@/components/ui/Container";
import ReviewForm from "./ReviewForm";

type ProductReviewsProps = {
  productId: number;
};

export default function ProductReviews({ productId }: ProductReviewsProps) {
  const reviews = useAppSelector(selectReviewsByProduct(productId));

  const averageRating = calculateAverageRating(reviews);

  return (
    <section className="mt-20">
      <Container>
        <ReviewSummary
          averageRating={averageRating}
          totalReviews={reviews.length}
        />

        <ReviewForm productId={productId} />

        {/* EMPTY */}
        {reviews.length === 0 ? (
          <div className="mt-8 rounded-3xl border border-dashed border-gray-300 bg-gray-50 p-12 text-center">
            <h3 className="text-xl font-semibold">No reviews yet</h3>

            <p className="mt-3 text-gray-500">
              Be the first customer to review this product.
            </p>
          </div>
        ) : (
          <div className="mt-8 space-y-6">
            {reviews.map((review, index) => (
              <ReviewCard key={review.id} review={review} index={index} />
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}
