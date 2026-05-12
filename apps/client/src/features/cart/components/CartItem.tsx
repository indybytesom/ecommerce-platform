// "use client";

// import {
//   decrementQuantity,
//   incrementQuantity,
//   removeFromCart,
// } from "../cartSlice";

// import { CartItem as CartItemType } from "../cartTypes";

// import { useAppDispatch } from "@/store/hooks";

// type CartItemProps = {
//   item: CartItemType;
// };

// export default function CartItem({ item }: CartItemProps) {
//   const dispatch = useAppDispatch();

//   return (
//     <div className="flex gap-4 border-b pb-6">
//       {/* IMAGE */}
//       <div className="h-24 w-24 rounded-xl bg-gray-100" />

//       {/* INFO */}
//       <div className="flex flex-1 flex-col">
//         <div className="flex items-start justify-between gap-4">
//           <div>
//             <h3 className="font-medium">{item.title}</h3>

//             {item.size && (
//               <p className="mt-1 text-sm text-gray-500">Size: {item.size}</p>
//             )}
//           </div>

//           <button
//             onClick={() => dispatch(removeFromCart(item))}
//             className="text-sm text-gray-400 hover:text-black"
//           >
//             Remove
//           </button>
//         </div>

//         <div className="mt-auto flex items-center justify-between pt-4">
//           {/* QUANTITY */}
//           <div className="flex items-center overflow-hidden rounded-lg border">
//             <button
//               onClick={() => dispatch(decrementQuantity(item))}
//               className="flex h-9 w-9 items-center justify-center"
//             >
//               -
//             </button>

//             <div className="flex h-9 min-w-[40px] items-center justify-center border-x text-sm">
//               {item.quantity}
//             </div>

//             <button
//               onClick={() => dispatch(incrementQuantity(item))}
//               className="flex h-9 w-9 items-center justify-center"
//             >
//               +
//             </button>
//           </div>

//           {/* PRICE */}
//           <p className="font-semibold">${item.price * item.quantity}</p>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";
import Image from "next/image";
import { Trash2 } from "lucide-react";
import {
  decrementQuantity,
  incrementQuantity,
  removeFromCart,
} from "../cartSlice";
import { CartItem as CartItemType } from "../cartTypes";
import { useAppDispatch } from "@/store/hooks";
import Link from "next/link";

type CartItemProps = {
  item: CartItemType;
};

export default function CartItem({ item }: CartItemProps) {
  // console.log("item ::", item);
  const dispatch = useAppDispatch();

  return (
    <div className="flex gap-4 border-b pb-6">
      {/* IMAGE */}
      <div className="relative h-24 w-24 overflow-hidden rounded-xl bg-gray-100">
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-cover"
        />
      </div>

      {/* INFO */}
      <div className="flex flex-1 flex-col">
        <div className="flex items-start justify-between gap-4">
          <div>
            <Link
              href={`/products/${item.slug}`}
              className="font-medium transition hover:underline"
            >
              {item.title}
            </Link>

            {item.size && (
              <p className="mt-1 text-sm text-gray-500">Size: {item.size}</p>
            )}
          </div>

          {/* REMOVE */}
          <button
            onClick={() => dispatch(removeFromCart(item))}
            className="text-gray-400 transition hover:text-red-500"
          >
            <Trash2 size={18} />
          </button>
        </div>

        <div className="mt-auto flex items-center justify-between pt-4">
          {/* QUANTITY */}
          <div className="flex items-center overflow-hidden rounded-lg border">
            <button
              onClick={() => dispatch(decrementQuantity(item))}
              className="flex h-9 w-9 items-center justify-center"
            >
              -
            </button>

            <div className="flex h-9 min-w-[40px] items-center justify-center border-x text-sm">
              {item.quantity}
            </div>

            <button
              onClick={() => dispatch(incrementQuantity(item))}
              className="flex h-9 w-9 items-center justify-center"
            >
              +
            </button>
          </div>

          {/* PRICE */}
          <p className="font-semibold">${item.price * item.quantity}</p>
        </div>
      </div>
    </div>
  );
}
