// import Image from "next/image";
import Link from "next/link";
// import brandIcon from "/images/brand/brand-icon.png";

export default function Logo() {
  return (
    <Link href="/" className="flex">
      <h1 className="text-xl font-black tracking-tight md:text-2xl">Ecommerce</h1>
      {/* <Image
        src="/images/brand/brand-icon.png"
        alt=""
        className="w-full max-w-[80px] h-auto"
        fill
      /> */}
    </Link>
  );
}
