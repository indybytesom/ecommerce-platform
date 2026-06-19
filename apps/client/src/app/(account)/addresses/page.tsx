import AddressForm from "@/components/addresses/AddressForm";
import AddressList from "@/components/addresses/AddressList";

export default function AddressesPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Addresses</h1>

        <p className="mt-2 text-gray-500">Manage your shipping addresses.</p>
      </div>

      <AddressForm />
      <AddressList />
    </div>
  );
}
