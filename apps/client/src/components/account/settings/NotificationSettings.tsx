"use client";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { selectAccountSettings } from "@/features/accountSettings/accountSettingsSelectors";
import { updateSettings } from "@/features/accountSettings/accountSettingsSlice";
import Switch from "@/components/ui/Switch";

export default function NotificationSettings() {
  const dispatch = useAppDispatch();

  const settings = useAppSelector(selectAccountSettings);

  const handleToggle = (
    key: "emailNotifications" | "orderNotifications" | "marketingEmails",
  ) => {
    dispatch(
      updateSettings({
        [key]: !settings[key],
      }),
    );
  };

  return (
    <div className="rounded-3xl border border-gray-200 bg-white p-6">
      <h2 className="text-xl font-semibold">Notifications</h2>

      <div className="mt-6 space-y-4">
        <label className="flex cursor-pointer items-center justify-between">
          <span>Email Notifications</span>

          <Switch
            checked={settings.emailNotifications}
            onChange={() => handleToggle("emailNotifications")}
          />
        </label>

        <label className="flex items-center justify-between">
          <span>Order Updates</span>

          <Switch
            checked={settings.orderNotifications}
            onChange={() => handleToggle("orderNotifications")}
          />
        </label>

        <label className="flex items-center justify-between">
          <span>Marketing Emails</span>

          <Switch
            checked={settings.marketingEmails}
            onChange={() => handleToggle("marketingEmails")}
          />
        </label>
      </div>
    </div>
  );
}
