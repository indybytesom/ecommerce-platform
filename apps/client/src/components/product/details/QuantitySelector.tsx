// "use client";

// import { useState } from "react";

// export default function QuantitySelector() {
//   const [quantity, setQuantity] = useState(1);

//   const increaseQuantity = () => {
//     setQuantity((prev) => prev + 1);
//   };

//   const decreaseQuantity = () => {
//     if (quantity === 1) return;

//     setQuantity((prev) => prev - 1);
//   };

//   return (
//     <div className="flex items-center overflow-hidden rounded-xl border border-gray-300 w-fit">
//       <button
//         onClick={decreaseQuantity}
//         className="flex h-12 w-12 items-center justify-center text-xl transition hover:bg-gray-100"
//       >
//         -
//       </button>

//       <div className="flex h-12 min-w-[60px] items-center justify-center border-x border-gray-300 text-sm font-medium">
//         {quantity}
//       </div>

//       <button
//         onClick={increaseQuantity}
//         className="flex h-12 w-12 items-center justify-center text-xl transition hover:bg-gray-100"
//       >
//         +
//       </button>
//     </div>
//   );
// }

"use client";

type QuantitySelectorProps = {
  quantity: number;
  increaseQuantity: () => void;
  decreaseQuantity: () => void;
};

export default function QuantitySelector({
  quantity,
  increaseQuantity,
  decreaseQuantity,
}: QuantitySelectorProps) {
  return (
    <div className="flex w-fit items-center overflow-hidden rounded-xl border border-gray-300">
      <button
        onClick={decreaseQuantity}
        className="flex h-12 w-12 items-center justify-center text-xl transition hover:bg-gray-100"
      >
        -
      </button>

      <div className="flex h-12 min-w-[60px] items-center justify-center border-x border-gray-300 text-sm font-medium">
        {quantity}
      </div>

      <button
        onClick={increaseQuantity}
        className="flex h-12 w-12 items-center justify-center text-xl transition hover:bg-gray-100"
      >
        +
      </button>
    </div>
  );
}
