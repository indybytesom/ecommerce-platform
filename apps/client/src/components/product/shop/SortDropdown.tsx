// export default function SortDropdown() {
//   return (
//     <select className="rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none">
//       <option>Featured</option>
//       <option>Latest</option>
//       <option>Price: Low to High</option>
//       <option>Price: High to Low</option>
//     </select>
//   );
// }

"use client";
import { useRouter, useSearchParams } from "next/navigation";

export default function SortDropdown() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSortChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value === "default") {
      params.delete("sort");
    } else {
      params.set("sort", value);
    }

    router.push(`/shop?${params.toString()}`);
  };

  return (
    <select
      onChange={(e) => handleSortChange(e.target.value)}
      className="rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none"
    >
      <option value="default">Featured</option>

      <option value="latest">Latest</option>

      <option value="price-low">Price: Low to High</option>

      <option value="price-high">Price: High to Low</option>
    </select>
  );
}
