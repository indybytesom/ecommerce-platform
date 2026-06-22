"use client";
import { useAppSelector } from "@/store/hooks";
import { selectAddresses } from "@/features/addresses/addressesSelectors";
import AddressCard from "./AddressCard";
import { useAppDispatch } from "@/store/hooks";
import { removeAddress } from "@/features/addresses/addressesSlice";
import { toast } from "sonner";
import { setDefaultAddress } from "@/features/addresses/addressesSlice";
import { Address } from "@/features/addresses/addressesTypes";

type AddressListProps = {
  onEdit: (address: Address) => void;
};

export default function AddressList({ onEdit }: AddressListProps) {
  const dispatch = useAppDispatch();
  const addresses = useAppSelector(selectAddresses);

  const handleDelete = (id: string) => {
    dispatch(removeAddress(id));

    toast.success("Address removed successfully");
  };

  const handleSetDefault = (id: string) => {
    dispatch(setDefaultAddress(id));

    toast.success("Default address updated");
  };

  if (addresses.length === 0) {
    return (
      <div className="mt-8 rounded-3xl border border-dashed border-gray-300 p-8 text-center text-gray-500">
        No addresses added yet.
      </div>
    );
  }

  return (
    <div className="mt-8 grid gap-4">
      {addresses.map((address) => (
        <AddressCard
          key={address.id}
          address={address}
          onDelete={handleDelete}
          onSetDefault={handleSetDefault}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
}
