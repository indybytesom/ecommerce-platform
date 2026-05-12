import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

export default function HeroSection() {
  return (
    <section className="bg-gray-50">
      <Container>
        <div className="grid min-h-[70vh] lg:min-h-[85vh] items-center gap-10 py-12 lg:grid-cols-2 lg:gap-20 lg:py-24">
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
              <Button>Shop Now</Button>

              <Button variant="secondary">Explore Collections</Button>
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="relative order-1 mb-2 lg:order-2 lg:mb-0">
            <div className="aspect-[6/5] overflow-hidden rounded-3xl bg-gray-200" />
          </div>
        </div>
      </Container>
    </section>
  );
}
