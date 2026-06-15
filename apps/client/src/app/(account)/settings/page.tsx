import SettingsPageContent from "@/components/account/settings/SettingsPageContent";

export default function SettingsPage() {
  return (
    <main>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Account Settings</h1>

        <p className="mt-2 text-sm text-gray-500">
          Manage notifications and preferences.
        </p>
      </div>

      <SettingsPageContent />
    </main>
  );
}
