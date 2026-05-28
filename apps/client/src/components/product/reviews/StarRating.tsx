"use client";

import { Star } from "lucide-react";

type StarRatingProps = {
  rating: number;

  size?: number;

  interactive?: boolean;

  onChange?: (rating: number) => void;
};

export default function StarRating({
  rating,
  size = 18,
  interactive = false,
  onChange,
}: StarRatingProps) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => {
        const isFilled = star <= rating;

        return (
          <button
            key={star}
            type="button"
            disabled={!interactive}
            onClick={() => {
              if (!interactive || !onChange) return;

              onChange(star);
            }}
            className={`transition ${
              interactive ? "cursor-pointer hover:scale-110" : "cursor-default"
            }`}
          >
            <Star
              size={size}
              className={
                isFilled ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
              }
            />
          </button>
        );
      })}
    </div>
  );
}
