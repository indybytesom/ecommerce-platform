"use client";
import { useState } from "react";
import { toast } from "sonner";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addReview } from "@/features/reviews/reviewsSlice";
import {
  selectIsAuthenticated,
  selectUser,
} from "@/features/auth/authSelectors";
import StarRating from "./StarRating";
import { selectUserReviewForProduct } from "@/features/reviews/reviewsSelectors";
import { selectProfile } from "@/features/profile/profileSelectors";
import { getFullName } from "@/features/profile/profileUtils";

type ReviewFormProps = {
  productId: number;
};

export default function ReviewForm({ productId }: ReviewFormProps) {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const existingReview = useAppSelector(
    selectUserReviewForProduct(productId, user?.id),
  );
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const profile = useAppSelector(selectProfile);
  const fullName = getFullName(profile.firstName, profile.lastName, user?.name);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isAuthenticated || !user) {
      toast.error("Please login to leave a review");
      return;
    }

    if (existingReview) {
      toast.error("You already reviewed this product");
      return;
    }

    if (!comment.trim()) {
      toast.error("Please enter your review");
      return;
    }

    setIsSubmitting(true);

    dispatch(
      addReview({
        id: crypto.randomUUID(),
        productId,
        userId: user.id,
        userName: fullName,
        rating,
        comment: comment.trim(),
        createdAt: new Date().toISOString(),
      }),
    );

    toast.success("Review submitted");
    setComment("");
    setRating(5);
    setTimeout(() => {
      setIsSubmitting(false);
    }, 400);
  };

  return (
    <div className="mt-8 rounded-3xl border border-gray-200 bg-white p-6">
      <h3 className="text-xl font-semibold">Write a Review</h3>

      {existingReview && (
        <div className="mt-3 mb-6 rounded-2xl border border-yellow-200 bg-yellow-50 px-4 py-3 text-sm text-yellow-700">
          You already reviewed this product.
        </div>
      )}

      <form onSubmit={handleSubmit} className="mt-6 space-y-6">
        {/* RATING */}
        <div>
          <p className="mb-3 text-sm font-medium">Your Rating</p>

          <StarRating
            rating={rating}
            interactive
            onChange={setRating}
            size={24}
          />
        </div>

        {/* COMMENT */}
        <div>
          <label className="mb-3 block text-sm font-medium">Your Review</label>

          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={5}
            placeholder="Share your experience with this product..."
            className="w-full rounded-2xl border border-gray-300 px-4 py-4 outline-none transition focus:border-black"
          />
        </div>

        {/* ACTION */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-full bg-black px-6 py-3 text-sm font-medium text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? "Submitting..." : "Submit Review"}
        </button>
      </form>
    </div>
  );
}
