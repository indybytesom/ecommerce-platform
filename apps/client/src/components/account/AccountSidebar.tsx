"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { accountMenuLinks } from "@/constants/navigation";

export default function AccountSidebar() {
  const pathname = usePathname();

  return (
    <aside className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <h2 className="mb-6 text-lg font-semibold">My Account</h2>

      <nav className="space-y-2">
        {accountMenuLinks.map((link, i) => {
          const isActive = pathname === link.href;

          return (
            <Link
              key={i}
              href={link.href}
              className={clsx(
                "block rounded-xl px-4 py-3 text-sm font-medium transition",
                isActive
                  ? "bg-black text-white"
                  : "text-gray-600 hover:bg-gray-100 hover:text-black",
              )}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
