"use client";
import { useAppSelector } from "@/store/hooks";
import { selectProfile } from "@/features/profile/profileSelectors";
import { getFullName } from "@/features/profile/profileUtils";

export default function AccountHeader() {
  const user = useAppSelector((state) => state.auth.user);
  const profile = useAppSelector(selectProfile);

  const fullName = getFullName(profile.firstName, profile.lastName, user?.name);

  return (
    <div className="mb-6 flex items-center justify-between rounded-2xl border border-gray-200 bg-white px-6 py-4 shadow-sm">
      <div>
        <h1 className="text-lg font-semibold">Welcome back</h1>

        <p className="text-sm text-gray-500">Manage your account and orders.</p>
      </div>

      <div className="text-right">
        <p className="font-medium">{fullName}</p>

        <p className="text-sm text-gray-500">{user?.email}</p>
      </div>
    </div>
  );
}
