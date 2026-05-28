"use client";
import { useEffect } from "react";
import { Product } from "@/types/product";
import { useAppDispatch } from "@/store/hooks";
import { addRecentlyViewed } from "@/features/recentlyViewed/recentlyViewedSlice";

type RecentlyViewedTrackerProps = {
  product: Product;
};

export default function RecentlyViewedTracker({
  product,
}: RecentlyViewedTrackerProps) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(addRecentlyViewed(product));
  }, [dispatch, product]);

  return null;
}
