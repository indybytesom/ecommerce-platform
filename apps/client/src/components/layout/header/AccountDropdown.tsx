"use client";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";
import { accountMenuLinks } from "@/constants/navigation";
import { logout } from "@/features/auth/authSlice";
import { selectUser } from "@/features/auth/authSelectors";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { selectProfile } from "@/features/profile/profileSelectors";

import {
  getFullName,
  getProfileInitials,
} from "@/features/profile/profileUtils";
import Image from "next/image";

export default function AccountDropdown() {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const profile = useAppSelector(selectProfile);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (!user) {
    return null;
  }

  const fullName = getFullName(profile.firstName, profile.lastName, user.name);

  const initials = getProfileInitials(
    profile.firstName,
    profile.lastName,
    user.name,
  );

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-3 rounded-full border border-gray-200 px-2 py-1.5 transition hover:border-gray-400"
      >
        {profile.avatar ? (
          <Image
            src={profile.avatar}
            alt={fullName}
            className="h-9 w-9 rounded-full border border-gray-200 object-cover"
            width={100}
            height={100}
          />
        ) : (
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-black text-xs font-semibold text-white">
            {initials}
          </div>
        )}

        <ChevronDown size={16} />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-13 z-50 w-56 rounded-2xl border border-gray-200 bg-white p-2 shadow-xl">
          <div className="border-b px-3 py-3">
            <p className="text-sm font-semibold">{fullName}</p>

            <p className="mt-1 text-xs text-gray-500">{user.email}</p>
          </div>

          <div className="py-2">
            {accountMenuLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="flex rounded-xl px-3 py-2 text-sm font-medium transition hover:bg-gray-100"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="border-t pt-2">
            <button
              onClick={() => {
                dispatch(logout());

                setIsOpen(false);
              }}
              className="flex w-full rounded-xl px-3 py-2 text-sm font-medium text-red-500 transition hover:bg-red-50"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
