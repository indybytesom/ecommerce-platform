// "use client";
// import { useState } from "react";
// import { Check } from "lucide-react";
// const categories = ["Hoodies", "T-Shirts", "Denim", "Outerwear"];
// const sizes = ["S", "M", "L", "XL"];
// import { useRouter, useSearchParams } from "next/navigation";

// export default function ProductFilters() {
//   const [selectedCategories, setSelectedCategories] = useState([
//     "Hoodies",
//     "T-Shirts",
//   ]);
//   const [selectedSize, setSelectedSize] = useState("M");
//   const [availability, setAvailability] = useState(["In Stock"]);
//   const [price, setPrice] = useState(300);
//   const router = useRouter();
//   const searchParams = useSearchParams();

//   const toggleCategory = (category: string) => {
//     const params = new URLSearchParams(searchParams.toString());

//     if (params.get("category") === category) {
//       params.delete("category");
//     } else {
//       params.set("category", category);
//     }

//     router.push(`/shop?${params.toString()}`);
//   };

//   const toggleAvailability = (item: string) => {
//     setAvailability((prev) =>
//       prev.includes(item)
//         ? prev.filter((value) => value !== item)
//         : [...prev, item],
//     );
//   };

//   return (
//     <div className="sticky top-28 space-y-10">
//       {/* CATEGORY */}
//       <div className="border-b border-gray-200 pb-8">
//         <h3 className="text-sm font-semibold uppercase tracking-[0.2em]">
//           Categories
//         </h3>

//         <div className="mt-6 space-y-4">
//           {categories.map((item, index) => {
//             const checked = selectedCategories.includes(item);

//             return (
//               <button
//                 key={item}
//                 onClick={() => toggleCategory(item)}
//                 className="flex w-full items-center justify-between text-sm text-gray-700 transition hover:text-black"
//               >
//                 <div className="flex items-center gap-3">
//                   <div
//                     className={`flex h-4 w-4 items-center justify-center rounded border transition ${
//                       checked
//                         ? "border-black bg-black text-white"
//                         : "border-gray-300"
//                     }`}
//                   >
//                     {checked && <Check size={12} strokeWidth={3} />}
//                   </div>

//                   <span>{item}</span>
//                 </div>

//                 <span className="text-gray-400">{12 - index}</span>
//               </button>
//             );
//           })}
//         </div>
//       </div>

//       {/* SIZE */}
//       <div className="border-b border-gray-200 pb-8">
//         <h3 className="text-sm font-semibold uppercase tracking-[0.2em]">
//           Sizes
//         </h3>

//         <div className="mt-6 flex flex-wrap gap-3">
//           {sizes.map((size) => {
//             const active = selectedSize === size;

//             return (
//               <button
//                 key={size}
//                 onClick={() => setSelectedSize(size)}
//                 className={`flex h-11 w-11 items-center justify-center rounded-xl border text-sm font-medium transition ${
//                   active
//                     ? "border-black bg-black text-white"
//                     : "border-gray-300 hover:border-black"
//                 }`}
//               >
//                 {size}
//               </button>
//             );
//           })}
//         </div>
//       </div>

//       {/* PRICE */}
//       <div className="border-b border-gray-200 pb-8">
//         <div className="flex items-center justify-between">
//           <h3 className="text-sm font-semibold uppercase tracking-[0.2em]">
//             Price
//           </h3>

//           <span className="text-sm text-gray-500">$0 - ${price}</span>
//         </div>

//         <div className="mt-6">
//           <div className="relative">
//             <div className="h-1 rounded-full bg-gray-200" />

//             <div
//               className="absolute left-0 top-0 h-1 rounded-full bg-black"
//               style={{
//                 width: `${(price / 500) * 100}%`,
//               }}
//             />

//             <input
//               type="range"
//               min="0"
//               max="500"
//               value={price}
//               onChange={(e) => setPrice(Number(e.target.value))}
//               className="absolute left-0 top-1/2 h-1 w-full -translate-y-1/2 cursor-pointer appearance-none bg-transparent [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-black"
//             />
//           </div>
//         </div>
//       </div>

//       {/* AVAILABILITY */}
//       <div>
//         <h3 className="text-sm font-semibold uppercase tracking-[0.2em]">
//           Availability
//         </h3>

//         <div className="mt-6 space-y-4">
//           {["In Stock", "Out of Stock"].map((item, index) => {
//             const checked = availability.includes(item);

//             return (
//               <button
//                 key={item}
//                 onClick={() => toggleAvailability(item)}
//                 className="flex w-full items-center justify-between text-sm text-gray-700 transition hover:text-black"
//               >
//                 <div className="flex items-center gap-3">
//                   <div
//                     className={`flex h-4 w-4 items-center justify-center rounded border transition ${
//                       checked
//                         ? "border-black bg-black text-white"
//                         : "border-gray-300"
//                     }`}
//                   >
//                     {checked && <Check size={12} strokeWidth={3} />}
//                   </div>

//                   <span>{item}</span>
//                 </div>

//                 <span className="text-gray-400">{index === 0 ? 24 : 3}</span>
//               </button>
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";
import { Check } from "lucide-react";
import { products } from "@/data/products";
import { useRouter, useSearchParams } from "next/navigation";

export default function ProductFilters() {
  const searchParams = useSearchParams();
  const categories = ["Hoodies", "T-Shirts", "Denim", "Outerwear"];
  const sizes = ["S", "M", "L", "XL"];
  const router = useRouter();
  const selectedCategory = searchParams.get("category");
  const selectedSize = searchParams.get("size");
  const selectedAvailability = searchParams.get("availability");
  const selectedPrice = Number(searchParams.get("price") || 500);

  const toggleCategory = (category: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (selectedCategory === category) {
      params.delete("category");
    } else {
      params.set("category", category);
    }

    router.push(`/shop?${params.toString()}`);
  };

  const toggleAvailability = (item: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (selectedAvailability === item) {
      params.delete("availability");
    } else {
      params.set("availability", item);
    }

    router.push(`/shop?${params.toString()}`);
  };

  return (
    <div className="sticky top-28 space-y-10">
      {/* CATEGORY */}
      <div className="border-b border-gray-200 pb-8">
        <h3 className="text-sm font-semibold uppercase tracking-[0.2em]">
          Categories
        </h3>

        <div className="mt-6 space-y-4">
          {categories.map((item, index) => {
            const checked = selectedCategory === item;

            return (
              <button
                key={index}
                onClick={() => toggleCategory(item)}
                className="flex w-full items-center justify-between text-sm text-gray-700 transition hover:text-black"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-4 w-4 items-center justify-center rounded border transition ${
                      checked
                        ? "border-black bg-black text-white"
                        : "border-gray-300"
                    }`}
                  >
                    {checked && <Check size={12} strokeWidth={3} />}
                  </div>

                  <span>{item}</span>
                </div>

                <span className="text-gray-400">
                  {
                    products.filter((product) => product.category === item)
                      .length
                  }
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* SIZE */}
      <div className="border-b border-gray-200 pb-8">
        <h3 className="text-sm font-semibold uppercase tracking-[0.2em]">
          Sizes
        </h3>

        <div className="mt-6 flex flex-wrap gap-3">
          {sizes.map((size, i) => {
            const active = selectedSize === size;

            return (
              <button
                key={i}
                onClick={() => {
                  const params = new URLSearchParams(searchParams.toString());

                  if (selectedSize === size) {
                    params.delete("size");
                  } else {
                    params.set("size", size);
                  }

                  router.push(`/shop?${params.toString()}`);
                }}
                className={`flex h-11 w-11 items-center justify-center rounded-xl border text-sm font-medium transition ${
                  active
                    ? "border-black bg-black text-white"
                    : "border-gray-300 hover:border-black"
                }`}
              >
                {size}
              </button>
            );
          })}
        </div>
      </div>

      {/* PRICE */}
      <div className="border-b border-gray-200 pb-8">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold uppercase tracking-[0.2em]">
            Price
          </h3>

          <span className="text-sm text-gray-500">$0 - ${selectedPrice}</span>
        </div>

        <div className="mt-6">
          <div className="relative">
            <div className="h-1 rounded-full bg-gray-200" />

            <div
              className="absolute left-0 top-0 h-1 rounded-full bg-black"
              style={{
                width: `${(selectedPrice / 500) * 100}%`,
              }}
            />

            <input
              type="range"
              min="0"
              max="500"
              value={selectedPrice}
              onChange={(e) => {
                const value = e.target.value;
                const params = new URLSearchParams(searchParams.toString());
                params.set("price", value);
                router.push(`/shop?${params.toString()}`);
              }}
              className="absolute left-0 top-1/2 h-1 w-full -translate-y-1/2 cursor-pointer appearance-none bg-transparent [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-black"
            />
          </div>
        </div>
      </div>

      {/* AVAILABILITY */}
      <div>
        <h3 className="text-sm font-semibold uppercase tracking-[0.2em]">
          Availability
        </h3>

        <div className="mt-6 space-y-4">
          {["In Stock", "Out of Stock"].map((item, index) => {
            const checked = selectedAvailability === item;

            return (
              <button
                key={index}
                onClick={() => toggleAvailability(item)}
                className="flex w-full items-center justify-between text-sm text-gray-700 transition hover:text-black"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-4 w-4 items-center justify-center rounded border transition ${
                      checked
                        ? "border-black bg-black text-white"
                        : "border-gray-300"
                    }`}
                  >
                    {checked && <Check size={12} strokeWidth={3} />}
                  </div>

                  <span>{item}</span>
                </div>

                <span className="text-gray-400">
                  {
                    products.filter((product) =>
                      item === "In Stock" ? product.inStock : !product.inStock,
                    ).length
                  }
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
