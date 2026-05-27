import Link from "next/link";
import {
  FaInstagram,
  FaFacebookF,
  FaXTwitter,
  FaLinkedinIn,
} from "react-icons/fa6";

export default function FooterBrand() {
  return (
    <div>
      <Link href="/">
        <h2 className="text-xl font-bold">Ecommerce</h2>
      </Link>

      <p className="mt-5 max-w-sm text-sm leading-7 text-gray-600">
        Premium ecommerce experience designed with scalable architecture, modern
        UX, and high-performance frontend technologies.
      </p>

      <div className="mt-8 flex items-center gap-3">
        <div className="rounded-full border border-gray-300 px-3 py-1 text-xs font-medium text-gray-600">
          Secure Checkout
        </div>

        <div className="rounded-full border border-gray-300 px-3 py-1 text-xs font-medium text-gray-600">
          Fast Delivery
        </div>
      </div>

      <div className="mt-10 flex items-center gap-4">
        <button className="flex h-11 w-11 items-center justify-center rounded-2xl border border-gray-200 text-gray-600 transition hover:border-black hover:text-black">
          <FaInstagram size={18} />
        </button>

        <button className="flex h-11 w-11 items-center justify-center rounded-2xl border border-gray-200 text-gray-600 transition hover:border-black hover:text-black">
          <FaFacebookF size={16} />
        </button>

        <button className="flex h-11 w-11 items-center justify-center rounded-2xl border border-gray-200 text-gray-600 transition hover:border-black hover:text-black">
          <FaXTwitter size={16} />
        </button>

        <button className="flex h-11 w-11 items-center justify-center rounded-2xl border border-gray-200 text-gray-600 transition hover:border-black hover:text-black">
          <FaLinkedinIn size={16} />
        </button>
      </div>
    </div>
  );
}
