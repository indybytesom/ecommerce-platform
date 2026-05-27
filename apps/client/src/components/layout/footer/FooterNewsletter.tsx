export default function FooterNewsletter() {
  return (
    <div className="flex flex-col justify-between gap-10 lg:flex-row lg:items-center">
      {/* LEFT */}
      <div className="max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gray-400">
          Newsletter
        </p>

        <h2 className="mt-4 text-4xl font-bold leading-tight tracking-tight md:text-5xl">
          Stay updated with modern ecommerce trends.
        </h2>

        <p className="mt-6 max-w-xl text-base leading-8 text-gray-600">
          Get updates about new arrivals, exclusive offers, and modern shopping
          experiences directly in your inbox.
        </p>
      </div>

      {/* RIGHT */}
      <form className="flex w-full max-w-xl flex-col gap-4 sm:flex-row">
        <input
          type="email"
          placeholder="Enter your email"
          className="h-14 flex-1 rounded-2xl border border-gray-300 bg-white px-5 text-sm outline-none transition focus:border-black"
        />

        <button
          type="submit"
          className="h-14 rounded-2xl bg-black px-8 text-sm font-medium text-white transition hover:opacity-90"
        >
          Subscribe
        </button>
      </form>
    </div>
  );
}
