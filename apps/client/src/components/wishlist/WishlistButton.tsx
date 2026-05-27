"use client";
import { Heart } from "lucide-react";

type WishlistButtonProps = {
  isActive?: boolean;
  onClick: () => void;
};

export default function WishlistButton({
  isActive,
  onClick,
}: WishlistButtonProps) {
  return (
    <button
      type="button"
      aria-label={isActive ? "Remove from wishlist" : "Add to wishlist"}
      onClick={onClick}
      className={`absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border bg-white transition-all duration-300 ${
        isActive
          ? "border-black text-black"
          : "border-gray-200 text-gray-500 hover:border-black hover:text-black"
      }`}
    >
      <Heart
        size={18}
        className={`transition-all duration-300 ${
          isActive ? "fill-black scale-110" : ""
        }`}
      />
    </button>
  );
}
