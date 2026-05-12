import Link from "next/link";

export default function FooterBrand() {
  return (
    <div>
      <Link href="/">
        <h2 className="text-xl font-bold">Ecommerce</h2>
      </Link>

      <p className="mt-4 max-w-sm text-sm leading-7 text-gray-600">
        Modern ecommerce platform built with scalable architecture and modern
        technologies.
      </p>
    </div>
  );
}
