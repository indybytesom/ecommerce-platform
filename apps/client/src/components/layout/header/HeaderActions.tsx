"use client";
import Link from "next/link";
import {
  selectAuthHydrated,
  selectIsAuthenticated,
} from "@/features/auth/authSelectors";
import { selectCartQuantity } from "@/features/cart/cartSelectors";
import { openCart } from "@/features/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { Search, ShoppingBag } from "lucide-react";
import AccountDropdown from "./AccountDropdown";
import { Heart } from "lucide-react";
import { selectWishlistCount } from "@/features/wishlist/wishlistSelectors";

type HeaderActionsProps = {
  onSearchOpen: () => void;
};

export default function HeaderActions({ onSearchOpen }: HeaderActionsProps) {
  const dispatch = useAppDispatch();
  const cartQuantity = useAppSelector(selectCartQuantity);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const isHydrated = useAppSelector(selectAuthHydrated);
  const wishlistCount = useAppSelector(selectWishlistCount);

  return (
    <div className="flex items-center gap-4">
      {/* SEARCH */}
      <button onClick={onSearchOpen} className="transition hover:text-gray-500">
        <Search size={21} />
      </button>

      <Link
        href="/wishlist"
        className="relative transition hover:text-gray-500"
      >
        <Heart size={21} />

        {wishlistCount > 0 && (
          <span className="absolute -right-2 -top-2 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-black px-1 text-xs text-white">
            {wishlistCount}
          </span>
        )}
      </Link>

      {/* CART */}
      <button
        className="relative transition hover:text-gray-500"
        onClick={() => dispatch(openCart())}
      >
        <ShoppingBag size={22} />

        {cartQuantity > 0 && (
          <span className="absolute -right-2 -top-2 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-black px-1 text-xs text-white">
            {cartQuantity}
          </span>
        )}
      </button>

      {/* AUTH */}
      {!isHydrated ? (
        <div className="h-10 w-10 animate-pulse rounded-full bg-gray-200" />
      ) : isAuthenticated ? (
        <AccountDropdown />
      ) : (
        <Link
          href="/login"
          className="rounded-full border border-black px-5 py-2 text-sm font-medium transition hover:bg-black hover:text-white"
        >
          Login
        </Link>
      )}
    </div>
  );
}
