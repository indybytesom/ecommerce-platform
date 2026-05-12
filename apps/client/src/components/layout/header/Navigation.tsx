import Link from "next/link";

import { navigationLinks } from "@/constants/navigation";

export default function Navigation() {
  return (
    <nav>
      <ul className="flex items-center gap-8 text-sm font-medium">
        {navigationLinks.map((item) => (
          <li key={item.href}>
            <Link href={item.href} className="transition hover:text-gray-500">
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
