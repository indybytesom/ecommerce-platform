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
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [city, setCity] = useState("");
  const [stateName, setStateName] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");

  const handleSave = () => {
    if (
      !firstName.trim() ||
      !lastName.trim() ||
      !phone.trim() ||
      !addressLine1.trim() ||
      !city.trim() ||
      !stateName.trim() ||
      !postalCode.trim() ||
      !country.trim()
    ) {
      toast.error("Please fill all required fields");
      return;
    }

    dispatch(
      addAddress({
        id: crypto.randomUUID(),
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        phone: phone.trim(),
        addressLine1: addressLine1.trim(),
        addressLine2: addressLine2.trim(),
        city: city.trim(),
        state: stateName.trim(),
        postalCode: postalCode.trim(),
        country: country.trim(),
        isDefault: addresses.length === 0,
      }),
    );

    toast.success("Address added successfully");

    setFirstName("");
    setLastName("");
    setPhone("");
    setAddressLine1("");
    setAddressLine2("");
    setCity("");
    setStateName("");
    setPostalCode("");
    setCountry("");
  };

  return (
    <div className="rounded-3xl border border-gray-200 bg-white p-6">
      <h2 className="mb-6 text-xl font-semibold">Add New Address</h2>

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

        <div>
          <label className="mb-2 block text-sm font-medium">Phone Number</label>

          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-black"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">Country</label>

          <input
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-black"
          />
        </div>
      </div>

      <div className="mt-6">
        <label className="mb-2 block text-sm font-medium">Address Line 1</label>

        <input
          value={addressLine1}
          onChange={(e) => setAddressLine1(e.target.value)}
          className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-black"
        />
      </div>

      <div className="mt-6">
        <label className="mb-2 block text-sm font-medium">Address Line 2</label>

        <input
          value={addressLine2}
          onChange={(e) => setAddressLine2(e.target.value)}
          className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-black"
        />
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-3">
        <div>
          <label className="mb-2 block text-sm font-medium">City</label>

          <input
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-black"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">State</label>

          <input
            value={stateName}
            onChange={(e) => setStateName(e.target.value)}
            className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-black"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">Postal Code</label>

          <input
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-black"
          />
        </div>
      </div>

      <button
        className="mt-8 rounded-full bg-black px-6 py-3 text-white"
        onClick={handleSave}
      >
        Save Address
      </button>
    </div>
  );
}
