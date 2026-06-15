"use client";

import NotificationSettings from "./NotificationSettings";
import AccountPreferences from "./AccountPreferences";

export default function SettingsPageContent() {
  return (
    <div className="space-y-6">
      <NotificationSettings />

      <AccountPreferences />
    </div>
  );
}