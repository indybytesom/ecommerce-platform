"use client";
import Image from "next/image";
import Link from "next/link";

import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { useAppSelector } from "@/store/hooks";

export default function HeroSection() {
  const settings = useAppSelector((state) => state.accountSettings);
  console.log("settings ::", settings);

  return (
    <section className="overflow-hidden bg-gray-50">
      <Container>
        <div className="grid min-h-[70vh] items-center gap-10 py-12 lg:min-h-[85vh] lg:grid-cols-2 lg:gap-20 lg:py-24">
          {/* LEFT CONTENT */}
          <div className="order-2 max-w-2xl lg:order-1">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-gray-500 sm:text-sm">
              New Collection 2026
            </p>

            <h1 className="text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
              Discover Modern Fashion For Every Season
            </h1>

            <p className="mt-6 text-base leading-7 text-gray-600 sm:text-lg sm:leading-8">
              Explore premium collections designed with modern style, comfort,
              and quality.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link href="/shop">
                <Button>Shop Now</Button>
              </Link>

              <Link href="/collections">
                <Button variant="secondary">Explore Collections</Button>
              </Link>
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="relative order-1 lg:order-2">
            <div className="relative aspect-[6/5] overflow-hidden rounded-3xl">
              <Image
                src="/images/hero/hero-banner.jpg"
                alt="Modern fashion collection"
                fill
                priority
                className="object-cover transition duration-700 hover:scale-105"
              />

              {/* OVERLAY */}
              <div className="absolute inset-0 bg-black/10" />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
