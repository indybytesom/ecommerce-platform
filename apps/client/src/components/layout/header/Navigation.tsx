"use client";
import Link from "next/link";
import { navigationLinks } from "@/constants/navigation";
import { usePathname } from "next/navigation";

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav>
      <ul className="flex items-center gap-8 text-sm font-medium">
        {navigationLinks.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className={`relative pb-1 transition ${
                pathname === item.href
                  ? "text-black"
                  : "text-gray-500 hover:text-black"
              }`}
            >
              {item.label}
              {pathname === item.href && (
                <span className="absolute bottom-0 left-0 h-[2px] w-full rounded-full bg-black" />
              )}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
