"use client";
import { useState } from "react";
import { toast } from "sonner";
import { useAppDispatch } from "@/store/hooks";
import { addAddress } from "@/features/addresses/addressesSlice";
import { useAppSelector } from "@/store/hooks";
import { selectAddresses } from "@/features/addresses/addressesSelectors";

export default function AddressForm() {
  const dispatch = useAppDispatch();
  const addresses = useAppSelector(selectAddresses);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
  });

  const handleSave = () => {
    if (
      !formData.firstName.trim() ||
      !formData.lastName.trim() ||
      !formData.phone.trim() ||
      !formData.addressLine1.trim() ||
      !formData.city.trim() ||
      !formData.state.trim() ||
      !formData.postalCode.trim() ||
      !formData.country.trim()
    ) {
      toast.error("Please fill all required fields");
      return;
    }
    dispatch(
      addAddress({
        id: crypto.randomUUID(),
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        phone: formData.phone.trim(),
        addressLine1: formData.addressLine1.trim(),
        addressLine2: formData.addressLine2.trim(),
        city: formData.city.trim(),
        state: formData.state.trim(),
        postalCode: formData.postalCode.trim(),
        country: formData.country.trim(),
        isDefault: addresses.length === 0,
      }),
    );

    toast.success("Address added successfully");

    setFormData({
      firstName: "",
      lastName: "",
      phone: "",
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "",
      postalCode: "",
      country: "",
    });
  };

  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="rounded-3xl border border-gray-200 bg-white p-6">
      <h2 className="mb-6 text-xl font-semibold">Add New Address</h2>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium">First Name</label>

          <input
            value={formData.firstName}
            onChange={(e) => handleChange("firstName", e.target.value)}
            className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-black"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">Last Name</label>

          <input
            value={formData.lastName}
            onChange={(e) => handleChange("lastName", e.target.value)}
            className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-black"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">Phone Number</label>

          <input
            value={formData.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
            className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-black"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">Country</label>

          <input
            value={formData.country}
            onChange={(e) => handleChange("country", e.target.value)}
            className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-black"
          />
        </div>
      </div>

      <div className="mt-6">
        <label className="mb-2 block text-sm font-medium">Address Line 1</label>

        <input
          value={formData.addressLine1}
          onChange={(e) => handleChange("addressLine1", e.target.value)}
          className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-black"
        />
      </div>

      <div className="mt-6">
        <label className="mb-2 block text-sm font-medium">Address Line 2</label>

        <input
          value={formData.addressLine2}
          onChange={(e) => handleChange("addressLine2", e.target.value)}
          className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-black"
        />
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-3">
        <div>
          <label className="mb-2 block text-sm font-medium">City</label>

          <input
            value={formData.city}
            onChange={(e) => handleChange("city", e.target.value)}
            className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-black"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">State</label>

          <input
            value={formData.state}
            onChange={(e) => handleChange("state", e.target.value)}
            className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-black"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">Postal Code</label>

          <input
            value={formData.postalCode}
            onChange={(e) => handleChange("postalCode", e.target.value)}
            className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-black"
          />
        </div>
      </div>

      <div className="mt-8 flex gap-3">
        <button
          className="rounded-full bg-black px-6 py-3 text-white"
          onClick={handleSave}
        >
          Save Address
        </button>
      </div>
    </div>
  );
}
