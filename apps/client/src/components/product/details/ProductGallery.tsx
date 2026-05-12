// "use client";

// import { useState } from "react";

// const images = [1, 2, 3, 4];

// export default function ProductGallery() {
//   const [activeImage, setActiveImage] = useState(0);

//   return (
//     <div className="flex flex-col gap-5">
//       {/* MAIN IMAGE */}
//       <div className="overflow-hidden rounded-3xl bg-gray-100">
//         <div className="aspect-square bg-gray-200 transition-all duration-300" />
//       </div>

//       {/* THUMBNAILS */}
//       <div className="grid grid-cols-4 gap-4">
//         {images.map((_, index) => (
//           <button
//             key={index}
//             onClick={() => setActiveImage(index)}
//             className={`overflow-hidden rounded-2xl border-2 transition ${
//               activeImage === index
//                 ? "border-black"
//                 : "border-transparent hover:border-gray-300"
//             }`}
//           >
//             <div className="aspect-square bg-gray-200" />
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// }

"use client";

import Image from "next/image";
import { useState } from "react";
import { Product } from "@/types/product";

type ProductGalleryProps = {
  product: Product;
};

export default function ProductGallery({ product }: ProductGalleryProps) {
  const [activeImage, setActiveImage] = useState(0);

  return (
    <div className="flex flex-col gap-5">
      {/* MAIN IMAGE */}
      <div className="overflow-hidden rounded-2xl lg:rounded-3xl bg-gray-100">
        <div className="relative aspect-square">
          <Image
            src={product.images[activeImage]}
            alt={product.title}
            fill
            className="object-cover transition-all duration-300"
            priority
          />
        </div>
      </div>

      {/* THUMBNAILS */}
      <div className="grid grid-cols-4 gap-4">
        {product.images.map((image, index) => (
          <button
            key={image}
            onClick={() => setActiveImage(index)}
            className={`overflow-hidden rounded-xl lg:rounded-2xl border-2 transition ${
              activeImage === index
                ? "border-black"
                : "border-transparent hover:border-gray-300"
            }`}
          >
            <div className="relative aspect-square">
              <Image
                src={image}
                alt={`${product.title} thumbnail ${index + 1}`}
                fill
                className="object-cover"
              />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
