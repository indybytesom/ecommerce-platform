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
              className={`transition hover:text-gray-500 ${
                pathname === item.href ? "text-black" : "text-gray-500"
              }`}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
