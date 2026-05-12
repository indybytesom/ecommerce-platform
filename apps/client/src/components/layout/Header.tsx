"use client";
import { useState } from "react";
import { Menu, ShoppingBag, Search } from "lucide-react";
import Container from "@/components/ui/Container";
import Logo from "./header/Logo";
import Navigation from "./header/Navigation";
import HeaderActions from "./header/HeaderActions";
import MobileMenu from "./header/MobileMenu";
import CartDrawer from "@/features/cart/components/CartDrawer";
import { openCart } from "@/features/cart/cartSlice";
import { selectCartQuantity } from "@/features/cart/cartSelectors";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import SearchDrawer from "@/features/products/components/SearchDrawer";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dispatch = useAppDispatch();
  const cartQuantity = useAppSelector(selectCartQuantity);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 border-b bg-white/95 backdrop-blur">
        <Container>
          <div className="flex h-20 items-center justify-between">
            <Logo />

            <div className="hidden items-center gap-10 lg:flex">
              <Navigation />
              <HeaderActions onSearchOpen={() => setIsSearchOpen(true)} />
            </div>

            <div className="flex items-center gap-4 lg:hidden">
              {/* SEARCH */}
              <button onClick={() => setIsSearchOpen(true)}>
                <Search size={24} />
              </button>

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

      <CartDrawer />

      <SearchDrawer
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </>
  );
}
