"use client";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { createPortal } from "react-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { Navigation, Keyboard } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

type FullscreenGalleryProps = {
  images: string[];
  title: string;
  activeImage: number;
  setActiveImage: React.Dispatch<React.SetStateAction<number>>;
  isOpen: boolean;
  onClose: () => void;
};

export default function FullscreenGallery({
  images,
  title,
  activeImage,
  setActiveImage,
  isOpen,
  onClose,
}: FullscreenGalleryProps) {
  const swiperRef = useRef<SwiperType | null>(null);

  useEffect(() => {
  if (!isOpen) return;

  swiperRef.current?.slideTo(activeImage, 0);
}, [activeImage, isOpen]);

  if (typeof window === "undefined") {
    return null;
  }

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          exit={{
            opacity: 0,
          }}
          className="fixed inset-0 z-[99999] bg-black"
        >
          {/* CLOSE */}
          <button
            onClick={onClose}
            className="absolute right-5 top-5 z-20 rounded-full bg-white/10 p-3 text-white backdrop-blur transition hover:bg-white/20"
          >
            <X size={22} />
          </button>

          {/* PREV */}
          <button className="gallery-prev absolute left-5 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white backdrop-blur transition hover:bg-white/20">
            <ChevronLeft size={24} />
          </button>

          {/* NEXT */}
          <button className="gallery-next absolute right-5 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white backdrop-blur transition hover:bg-white/20">
            <ChevronRight size={24} />
          </button>

          {/* SWIPER */}
          <div className="flex h-full items-center justify-center overflow-hidden">
            <Swiper
              modules={[Navigation, Keyboard]}
              navigation={{
                prevEl: ".gallery-prev",
                nextEl: ".gallery-next",
              }}
              keyboard={{
                enabled: true,
              }}
              initialSlide={activeImage}
              onSwiper={(swiper) => {
                swiperRef.current = swiper;

                swiper.slideTo(activeImage, 0);
              }}
              onSlideChange={(swiper) => {
                setActiveImage(swiper.activeIndex);
              }}
              spaceBetween={40}
              slidesPerView={1}
              className="h-full w-full"
            >
              {images.map((image, index) => (
                <SwiperSlide key={image}>
                  <div className="relative flex h-screen items-center justify-center p-6">
                    <motion.div
                      initial={{
                        opacity: 0,
                        scale: 0.96,
                      }}
                      animate={{
                        opacity: 1,
                        scale: 1,
                      }}
                      transition={{
                        duration: 0.3,
                      }}
                      className="relative h-full w-full max-w-6xl"
                    >
                      <Image
                        src={image}
                        alt={`${title} ${index + 1}`}
                        fill
                        priority
                        className="object-contain"
                      />
                    </motion.div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
