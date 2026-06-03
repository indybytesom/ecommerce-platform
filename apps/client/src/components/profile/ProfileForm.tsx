"use client";
import { useState } from "react";
import { toast } from "sonner";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { updateProfile } from "@/features/profile/profileSlice";
import { selectProfile } from "@/features/profile/profileSelectors";
import { selectUser } from "@/features/auth/authSelectors";

export default function ProfileForm() {
  const dispatch = useAppDispatch();
  const profile = useAppSelector(selectProfile);
  const [firstName, setFirstName] = useState(profile.firstName);
  const [lastName, setLastName] = useState(profile.lastName);
  const [phone, setPhone] = useState(profile.phone);
  const user = useAppSelector(selectUser);

  const handleSave = () => {
    if (!firstName.trim() || !lastName.trim()) {
      toast.error("Please enter your name");
      return;
    }

    dispatch(
      updateProfile({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        phone: phone.trim(),
      }),
    );

    toast.success("Profile updated successfully");
  };

  return (
    <div className="rounded-3xl border border-gray-200 bg-white p-6">
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium">First Name</label>

          <input
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-black"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">Last Name</label>

          <input
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-black"
          />
        </div>
      </div>

      <div className="mt-6">
        <label className="mb-2 block text-sm font-medium">Email Address</label>

        <input
          value={user?.email || ""}
          disabled
          className="w-full rounded-xl border border-gray-200 bg-gray-100 px-4 py-3 text-gray-500"
        />
      </div>

      <div className="mt-6">
        <label className="mb-2 block text-sm font-medium">Phone Number</label>

        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-black"
        />
      </div>

      <button
        onClick={handleSave}
        className="mt-8 rounded-full bg-black px-6 py-3 text-white"
      >
        Save Changes
      </button>
    </div>
  );
}
