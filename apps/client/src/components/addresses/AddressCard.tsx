import { Address } from "@/features/addresses/addressesTypes";

type AddressCardProps = {
  address: Address;
  onDelete: (id: string) => void;
  onSetDefault: (id: string) => void;
};

export default function AddressCard({
  address,
  onDelete,
  onSetDefault,
}: AddressCardProps) {
  return (
    <div className="rounded-3xl border border-gray-200 bg-white p-5">
      <div className="space-y-1 text-sm">
        {address.isDefault && (
          <div className="mb-3 inline-flex rounded-full bg-black px-3 py-1 text-xs font-medium text-white">
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
      <div className="mt-4 flex items-center justify-between">
        {!address.isDefault && (
          <button
            onClick={() => onSetDefault(address.id)}
            className="text-sm font-bold text-black transition hover:text-gray-600"
          >
            Set as Default
          </button>
        )}
        <button
          onClick={() => onDelete(address.id)}
          className="text-sm font-medium text-red-600 transition hover:text-red-700"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
