"use client";
import { useAppSelector } from "@/store/hooks";
import { selectProfile } from "@/features/profile/profileSelectors";
import { selectUser } from "@/features/auth/authSelectors";
import {
  getFullName,
  getProfileInitials,
} from "@/features/profile/profileUtils";
import Image from "next/image";

export default function ProfileCard() {
  const profile = useAppSelector(selectProfile);
  const user = useAppSelector(selectUser);

  const fullName = getFullName(profile.firstName, profile.lastName, user?.name);

  const initials = getProfileInitials(
    profile.firstName,
    profile.lastName,
    user?.name,
  );

  return (
    <div className="mb-8 rounded-3xl border border-gray-200 bg-white p-6">
      <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:text-left">
        {profile.avatar ? (
          <Image
            src={profile.avatar}
            alt={fullName}
            className="h-20 w-20 rounded-full object-cover border border-gray-200"
            width={100}
            height={100}
          />
        ) : (
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-black text-xl font-bold text-white">
            {initials}
          </div>
        )}

        <div className="flex-1">
          <h2 className="text-2xl font-semibold">{fullName}</h2>

          <p className="mt-1 text-gray-500">{user?.email}</p>

          <div className="mt-3 inline-flex rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
            Customer Account
          </div>
        </div>
      </div>
    </div>
  );
}
