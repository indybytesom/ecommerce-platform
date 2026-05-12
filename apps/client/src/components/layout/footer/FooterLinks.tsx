import Link from "next/link";

import { footerLinks } from "@/constants/footerLinks";

export default function FooterLinks() {
  return (
    <ul className="space-y-4 text-sm">
      {footerLinks.map((link) => (
        <li key={link.href}>
          <Link href={link.href} className="transition hover:text-gray-500">
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}
