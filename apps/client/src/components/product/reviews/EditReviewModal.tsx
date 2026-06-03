"use client";
import { useState } from "react";
import { X } from "lucide-react";
import { toast } from "sonner";

import StarRating from "./StarRating";

type EditReviewModalProps = {
  isOpen: boolean;
  initialRating: number;
  initialComment: string;
  onClose: () => void;
  onSave: (rating: number, comment: string) => void;
};

export default function EditReviewModal({
  isOpen,
  initialRating,
  initialComment,
  onClose,
  onSave,
}: EditReviewModalProps) {
  const [rating, setRating] = useState(() => initialRating);
  const [comment, setComment] = useState(() => initialComment);

  if (!isOpen) {
    return null;
  }

  const handleSave = () => {
    if (!comment.trim()) {
      toast.error("Please enter a review");
      return;
    }

    onSave(rating, comment.trim());
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-xl rounded-3xl bg-white p-6 shadow-2xl">
        <div className="mb-6 flex items-center justify-between">
          <h3 className="text-2xl font-semibold">Edit Review</h3>

          <button onClick={onClose}>
            <X />
          </button>
        </div>

        <div className="space-y-6">
          <StarRating
            rating={rating}
            interactive
            onChange={setRating}
            size={24}
          />

          <textarea
            rows={6}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full rounded-2xl border border-gray-300 px-4 py-4 outline-none focus:border-black"
          />

          <div className="flex justify-end gap-3">
            <button
              onClick={onClose}
              className="rounded-full border border-gray-300 px-5 py-3"
            >
              Cancel
            </button>

            <button
              onClick={handleSave}
              className="rounded-full bg-black px-5 py-3 text-white"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
