"use client";

import { motion } from "framer-motion";

import ProductCard from "@/components/product/ProductCard";

import { useAppSelector } from "@/store/hooks";

import { selectRecentlyViewedItems } from "@/features/recentlyViewed/recentlyViewedSelectors";
import Container from "@/components/ui/Container";

type RecentlyViewedProps = {
  currentProductId: number;
};

export default function RecentlyViewed({
  currentProductId,
}: RecentlyViewedProps) {
  const items = useAppSelector(selectRecentlyViewedItems);

  const filteredItems = items.filter((item) => item.id !== currentProductId);

  if (filteredItems.length === 0) {
    return null;
  }

  return (
    <section className="mt-24 border-t border-gray-200 pt-20">
      <Container>
        <div className="mb-10">
          <p className="text-sm uppercase tracking-[0.2em] text-gray-400">
            Your Activity
          </p>

          <h2 className="mt-3 text-3xl font-bold">Recently Viewed</h2>

          <p className="mt-3 text-gray-500">Products you recently explored.</p>
        </div>

        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.4,
          }}
          className="grid grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-4"
        >
          {filteredItems.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
