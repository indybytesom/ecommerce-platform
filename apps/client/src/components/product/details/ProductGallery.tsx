"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Product } from "@/types/product";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import FullscreenGallery from "./FullscreenGallery";

type ProductGalleryProps = {
  product: Product;
};

export default function ProductGallery({ product }: ProductGalleryProps) {
  const [activeImage, setActiveImage] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isFullscreen) return;

      if (event.key === "Escape") {
        setIsFullscreen(false);
      }

      if (event.key === "ArrowRight") {
        setActiveImage((prev) =>
          prev === product.images.length - 1 ? 0 : prev + 1,
        );
      }

      if (event.key === "ArrowLeft") {
        setActiveImage((prev) =>
          prev === 0 ? product.images.length - 1 : prev - 1,
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isFullscreen, product.images.length]);

  return (
    <div className="flex flex-col gap-6 lg:sticky lg:top-28">
      {/* MAIN IMAGE */}
      <button
        onClick={() => setIsFullscreen(true)}
        className="overflow-hidden rounded-2xl bg-gray-100 lg:rounded-3xl"
      >
        <div className="relative aspect-square overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={product.images[activeImage]}
              initial={{
                opacity: 0,
                scale: 1.05,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              exit={{
                opacity: 0,
              }}
              transition={{
                duration: 0.35,
              }}
              className="absolute inset-0"
            >
              <Image
                src={product.images[activeImage]}
                alt={product.title}
                fill
                priority
                className="object-cover transition duration-700 hover:scale-105"
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </button>

      {/* THUMBNAILS */}
      <div className="grid grid-cols-4 gap-4">
        {product.images.map((image, index) => (
          <button
            key={image}
            onClick={() => setActiveImage(index)}
            className={`overflow-hidden rounded-xl border-2 transition-all duration-300 lg:rounded-2xl ${
              activeImage === index
                ? "scale-[0.97] border-black"
                : "border-transparent hover:border-gray-300"
            }`}
          >
            <div className="relative aspect-square">
              <Image
                src={image}
                alt={`${product.title} thumbnail ${index + 1}`}
                fill
                className="object-cover transition duration-500 hover:scale-105"
              />
            </div>
          </button>
        ))}
      </div>

      <FullscreenGallery
        images={product.images}
        title={product.title}
        activeImage={activeImage}
        setActiveImage={setActiveImage}
        isOpen={isFullscreen}
        onClose={() => setIsFullscreen(false)}
      />
    </div>
  );
}
