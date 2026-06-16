"use client";
import { useState } from "react";
import { Menu, ShoppingBag, Search } from "lucide-react";
import Container from "@/components/ui/Container";
import Logo from "./header/Logo";
import Navigation from "./header/Navigation";
import HeaderActions from "./header/HeaderActions";
import MobileMenu from "./header/MobileMenu";
import { openCart } from "@/features/cart/cartSlice";
import { selectCartQuantity } from "@/features/cart/cartSelectors";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import Link from "next/link";
import { selectWishlistCount } from "@/features/wishlist/wishlistSelectors";
import { Heart } from "lucide-react";
import { useSearch } from "@/hooks/searchContext";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dispatch = useAppDispatch();
  const cartQuantity = useAppSelector(selectCartQuantity);
  const wishlistCount = useAppSelector(selectWishlistCount);
  const { openSearch } = useSearch();

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-gray-200 bg-white/80 backdrop-blur-xl">
        <Container>
          <div className="flex h-20 items-center justify-between">
            <Logo />

            <div className="hidden items-center gap-10 lg:flex">
              <Navigation />
              <HeaderActions onSearchOpen={openSearch} />
            </div>

            <div className="flex items-center gap-4 lg:hidden">
              {/* SEARCH */}
              <button onClick={openSearch}>
                <Search size={24} />
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
              <button onClick={() => dispatch(openCart())} className="relative">
                <ShoppingBag size={26} />

                {cartQuantity > 0 && (
                  <span className="absolute -right-2 -top-2 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-black px-1 text-xs text-white">
                    {cartQuantity}
                  </span>
                )}
              </button>

              {/* MENU */}
              <button onClick={() => setIsMobileMenuOpen(true)}>
                <Menu size={28} />
              </button>
            </div>
          </div>
        </Container>
      </header>

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </>
  );
}
