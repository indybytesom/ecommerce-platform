"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Button from "@/components/ui/Button";
import { ShoppingBag, X } from "lucide-react";
import { navigationLinks } from "@/constants/navigation";
import { openCart } from "@/features/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { selectCartQuantity } from "@/features/cart/cartSelectors";
import { logout } from "@/features/auth/authSlice";
import {
  selectIsAuthenticated,
  selectUser,
} from "@/features/auth/authSelectors";
import { accountMenuLinks } from "@/constants/navigation";

type MobileMenuProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const cartQuantity = useAppSelector(selectCartQuantity);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const user = useAppSelector(selectUser);

  return (
    <>
      {/* OVERLAY */}
      <div
        onClick={onClose}
        className={`fixed inset-0 z-50 bg-black/40 backdrop-blur-sm transition-opacity duration-500 ease-out lg:hidden ${
          isOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      />

      {/* DRAWER */}
      <div
        className={`fixed right-0 top-0 z-50 flex h-full w-[82%] max-w-sm flex-col bg-white px-5 py-4 transition-transform duration-500 ease-out lg:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* HEADER */}
        <div className="flex items-center justify-between border-b pb-4">
          <h2 className="text-lg font-bold">Menu</h2>

          <button onClick={onClose}>
            <X />
          </button>
        </div>

        {/* NAVIGATION */}
        <ul className="mt-8 flex flex-col gap-2">
          {navigationLinks.map((item) => (
            <li
              key={item.href}
              className={`rounded-xl px-3 py-3 text-base font-medium transition ${
                pathname === item.href
                  ? "bg-black text-white"
                  : "hover:bg-gray-100"
              }`}
            >
              <Link href={item.href} onClick={onClose}>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* ACCOUNT LINKS */}
        {isAuthenticated && (
          <div className="mt-8 border-t pt-6">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">
              Account
            </p>

            <div className="flex flex-col gap-2">
              {accountMenuLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className="rounded-xl px-3 py-3 text-base font-medium transition hover:bg-gray-100"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* ACTIONS */}
        <div className="mt-10 flex flex-col gap-4">
          {/* AUTH */}
          {isAuthenticated && user ? (
            <div className="rounded-2xl border p-4">
              <p className="text-sm text-gray-500">Signed in as</p>
              <p className="mt-1 font-medium">{user.name}</p>
              <button
                onClick={() => {
                  dispatch(logout());

                  onClose();
                }}
                className="mt-4 text-sm font-medium transition hover:text-gray-500"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link href="/login" onClick={onClose}>
              <Button variant="secondary" className="w-full">
                Login
              </Button>
            </Link>
          )}

          {/* CART */}
          <Button
            onClick={() => {
              onClose();

              dispatch(openCart());
            }}
            className="flex h-12 items-center justify-center gap-2 rounded-2xl"
          >
            <ShoppingBag size={18} />

            <span>Cart</span>

            {cartQuantity > 0 && (
              <span className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-white px-1 text-xs text-black">
                {cartQuantity}
              </span>
            )}
          </Button>
        </div>

        <div className="mt-auto border-t pt-6">
          <p className="text-xs text-gray-400">Modern ecommerce experience.</p>
        </div>
      </div>
    </>
  );
}
