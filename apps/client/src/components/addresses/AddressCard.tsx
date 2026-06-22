import { Address } from "@/features/addresses/addressesTypes";
import { Edit, Trash2, CheckCircle2 } from "lucide-react";

type AddressCardProps = {
  address: Address;
  onDelete: (id: string) => void;
  onSetDefault: (id: string) => void;
  onEdit: (address: Address) => void;
};

export default function AddressCard({
  address,
  onDelete,
  onSetDefault,
  onEdit,
}: AddressCardProps) {
  return (
    <div className="rounded-3xl border border-gray-200 bg-white p-5">
      <div className="space-y-1 text-sm">
        {address.isDefault && (
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-black px-3 py-1 text-xs font-medium text-white">
            <CheckCircle2 size={14} />
            Default Address
          </div>
        )}
        <p className="font-semibold">
          {address.firstName} {address.lastName}
        </p>

        <p>{address.phone}</p>

        <p>{address.addressLine1}</p>

        {address.addressLine2 && <p>{address.addressLine2}</p>}

        <p>
          {address.city}, {address.state}
        </p>

        <p>
          {address.postalCode}, {address.country}
        </p>
      </div>
      <div className="mt-5 flex flex-wrap items-center gap-5 border-t border-gray-100 pt-4">
        <button
          className="flex items-center gap-2 text-sm font-medium text-gray-700 transition hover:text-black"
          onClick={() => onEdit(address)}
        >
          <Edit size={16} />
          Edit
        </button>

        {!address.isDefault && (
          <button
            onClick={() => onSetDefault(address.id)}
            className="flex items-center gap-2 text-sm font-medium text-gray-700 transition hover:text-black"
          >
            <CheckCircle2 size={16} />
            Set as Default
          </button>
        )}

        <button
          onClick={() => onDelete(address.id)}
          className="flex items-center gap-2 text-sm font-medium text-red-600 transition hover:text-red-700"
        >
          <Trash2 size={16} />
          Delete
        </button>
      </div>
    </div>
  );
}
