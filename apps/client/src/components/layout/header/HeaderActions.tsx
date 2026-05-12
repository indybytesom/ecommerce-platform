"use client";
import Button from "@/components/ui/Button";
import { selectCartQuantity } from "@/features/cart/cartSelectors";
import { useAppSelector } from "@/store/hooks";
import { openCart } from "@/features/cart/cartSlice";
import { useAppDispatch } from "@/store/hooks";

type HeaderActionsProps = {
  onSearchOpen: () => void;
};

export default function HeaderActions({ onSearchOpen }: HeaderActionsProps) {
  const cartQuantity = useAppSelector(selectCartQuantity);
  const dispatch = useAppDispatch();

  return (
    <div className="flex items-center gap-5 text-sm font-medium">
      <button onClick={onSearchOpen} className="transition hover:text-gray-500">
        Search
      </button>

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

      <Button variant="secondary">Login</Button>
    </div>
  );
}
