import { CartItem } from "@/features/cart/cartTypes";
import Image from "next/image";

interface OrderItemRowProps {
  item: CartItem;
}

export default function OrderItemRow({ item }: OrderItemRowProps) {
  return (
    <div className="flex items-center gap-4 border-b py-4">
      <Image
        src={item.image}
        alt={item.title}
        className="h-20 w-20 rounded-xl object-cover"
        width={100}
        height={100}
      />

      <div className="flex-1">
        <h3 className="font-medium">EEEE {item.title}</h3>

        <p className="mt-1 text-sm text-gray-500">Size: {item.size}</p>

        <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
      </div>

      <div className="text-right">
        <p className="font-semibold">
          ${(item.price * item.quantity).toFixed(2)}
        </p>
      </div>
    </div>
  );
}
