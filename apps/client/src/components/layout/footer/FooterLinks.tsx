import Link from "next/link";

import {
  footerSections,
} from "@/constants/footerLinks";

export default function FooterLinks() {
  return (
    <div className="grid grid-cols-2 gap-12 sm:grid-cols-3">
      {footerSections.map(
        (section) => (
          <div key={section.title}>
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-400">
              {section.title}
            </h3>

            <ul className="mt-5 space-y-4 text-sm">
              {section.links.map(
                (link, i) => (
                  <li key={i}>
                    <Link
                      href={link.href}
                      className="text-gray-600 transition hover:text-black"
                    >
                      {link.label}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </div>
        ),
      )}
    </div>
  );
}