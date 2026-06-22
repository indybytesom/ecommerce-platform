"use client";
import { useState } from "react";
import AddressForm from "@/components/addresses/AddressForm";
import AddressList from "@/components/addresses/AddressList";
import { Address } from "@/features/addresses/addressesTypes";
import EditAddressModal from "@/components/addresses/EditAddressModal";
import { AnimatePresence } from "framer-motion";

export default function AddressesPage() {
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Addresses</h1>

        <p className="mt-2 text-gray-500">Manage your shipping addresses.</p>
      </div>

      <AddressForm />
      <AddressList onEdit={setEditingAddress} />
      <AnimatePresence>
        {editingAddress && (
          <EditAddressModal
            address={editingAddress}
            onClose={() => setEditingAddress(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
