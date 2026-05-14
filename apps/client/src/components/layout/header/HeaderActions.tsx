"use client";
import Link from "next/link";
import { logout } from "@/features/auth/authSlice";
import {
  selectAuthHydrated,
  selectIsAuthenticated,
  selectUser,
} from "@/features/auth/authSelectors";
import { selectCartQuantity } from "@/features/cart/cartSelectors";
import { openCart } from "@/features/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

type HeaderActionsProps = {
  onSearchOpen: () => void;
};

export default function HeaderActions({ onSearchOpen }: HeaderActionsProps) {
  const dispatch = useAppDispatch();
  const cartQuantity = useAppSelector(selectCartQuantity);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const user = useAppSelector(selectUser);
  const isHydrated = useAppSelector(selectAuthHydrated);

  return (
    <div className="flex items-center gap-5 text-sm font-medium">
      {/* SEARCH */}
      <button onClick={onSearchOpen} className="transition hover:text-gray-500">
        Search
      </button>

      {/* CART */}
      <button
        className="relative transition hover:text-gray-500"
        onClick={() => dispatch(openCart())}
      >
        Cart
        {cartQuantity > 0 && (
          <span className="absolute -right-3 -top-3 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-black px-1 text-xs text-white">
            {cartQuantity}
          </span>
        )}
      </button>

      {/* AUTH */}
      {!isHydrated ? (
        <div className="h-10 w-24 animate-pulse rounded-xl bg-gray-200" />
      ) : isAuthenticated && user ? (
        <div className="flex items-center gap-4">
          {/* AVATAR */}
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-sm font-semibold text-white">
            {user.name
              .split(" ")
              .map((word) => word[0])
              .join("")
              .slice(0, 2)
              .toUpperCase()}
          </div>

          {/* USER */}
          <div className="flex flex-col">
            <p className="text-sm font-medium leading-none">{user.name}</p>

            <button
              onClick={() => dispatch(logout())}
              className="mt-1 text-left text-xs text-gray-500 transition hover:text-black"
            >
              Logout
            </button>
          </div>
        </div>
      ) : (
        <Link
          href="/login"
          className="rounded-md border px-5 py-3 transition hover:bg-black hover:text-white"
        >
          Login
        </Link>
      )}
    </div>
  );
}
