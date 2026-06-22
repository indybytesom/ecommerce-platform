"use client";
import { useState } from "react";
import { Check, X } from "lucide-react";
import { toast } from "sonner";
import { Address } from "@/features/addresses/addressesTypes";
import { useAppDispatch } from "@/store/hooks";
import { updateAddress } from "@/features/addresses/addressesSlice";
import { setDefaultAddress } from "@/features/addresses/addressesSlice";
import { motion } from "framer-motion";

type EditAddressModalProps = {
  address: Address;
  onClose: () => void;
};

export default function EditAddressModal({
  address,
  onClose,
}: EditAddressModalProps) {
  const dispatch = useAppDispatch();
  const [isDefault, setIsDefault] = useState(address.isDefault);
  const [formData, setFormData] = useState({
    firstName: address.firstName,
    lastName: address.lastName,
    phone: address.phone,
    addressLine1: address.addressLine1,
    addressLine2: address.addressLine2 || "",
    city: address.city,
    state: address.state,
    postalCode: address.postalCode,
    country: address.country,
  });

  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleUpdate = () => {
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
      updateAddress({
        ...address,
        ...formData,
      }),
    );

    if (isDefault && !address.isDefault) {
      dispatch(setDefaultAddress(address.id));
    }

    toast.success("Address updated successfully");

    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
    >
      <motion.div
        initial={{
          opacity: 0,
          scale: 0.95,
          y: 20,
        }}
        animate={{
          opacity: 1,
          scale: 1,
          y: 0,
        }}
        exit={{
          opacity: 0,
          scale: 0.95,
          y: 20,
        }}
        transition={{
          duration: 0.2,
        }}
        className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl"
      >
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Edit Address</h2>

          <button onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <input
            value={formData.firstName}
            onChange={(e) => handleChange("firstName", e.target.value)}
            placeholder="First Name"
            className="rounded-xl border border-gray-300 px-4 py-3"
          />

          <input
            value={formData.lastName}
            onChange={(e) => handleChange("lastName", e.target.value)}
            placeholder="Last Name"
            className="rounded-xl border border-gray-300 px-4 py-3"
          />

          <input
            value={formData.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
            placeholder="Phone"
            className="rounded-xl border border-gray-300 px-4 py-3"
          />

          <input
            value={formData.country}
            onChange={(e) => handleChange("country", e.target.value)}
            placeholder="Country"
            className="rounded-xl border border-gray-300 px-4 py-3"
          />
        </div>

        <div className="mt-6">
          <input
            value={formData.addressLine1}
            onChange={(e) => handleChange("addressLine1", e.target.value)}
            placeholder="Address Line 1"
            className="w-full rounded-xl border border-gray-300 px-4 py-3"
          />
        </div>

        <div className="mt-6">
          <input
            value={formData.addressLine2}
            onChange={(e) => handleChange("addressLine2", e.target.value)}
            placeholder="Address Line 2"
            className="w-full rounded-xl border border-gray-300 px-4 py-3"
          />
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-3">
          <input
            value={formData.city}
            onChange={(e) => handleChange("city", e.target.value)}
            placeholder="City"
            className="rounded-xl border border-gray-300 px-4 py-3"
          />

          <input
            value={formData.state}
            onChange={(e) => handleChange("state", e.target.value)}
            placeholder="State"
            className="rounded-xl border border-gray-300 px-4 py-3"
          />

          <input
            value={formData.postalCode}
            onChange={(e) => handleChange("postalCode", e.target.value)}
            placeholder="Postal Code"
            className="rounded-xl border border-gray-300 px-4 py-3"
          />
        </div>

        <div className="mt-6">
          <label className="flex cursor-pointer items-center gap-3">
            <button
              type="button"
              disabled={address.isDefault}
              onClick={() => setIsDefault((prev) => !prev)}
              className={`
                flex h-5 w-5 items-center justify-center rounded border transition
                ${isDefault ? "border-black bg-black text-white" : "border-gray-300 bg-white"}
                ${address.isDefault ? "cursor-not-allowed opacity-70" : ""}
            `}
            >
              {isDefault && <Check size={14} />}
            </button>

            <span className="text-sm font-medium text-gray-700">
              {address.isDefault
                ? "This is your default address"
                : "Set as default address"}
            </span>
          </label>
        </div>
        <div className="mt-8 flex gap-3">
          <button
            onClick={handleUpdate}
            className="rounded-full bg-black px-6 py-3 text-white"
          >
            Update Address
          </button>

          <button
            onClick={onClose}
            className="rounded-full border border-gray-300 px-6 py-3"
          >
            Cancel
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
