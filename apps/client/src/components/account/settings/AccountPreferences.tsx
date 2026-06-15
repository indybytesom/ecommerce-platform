"use client";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { selectAccountSettings } from "@/features/accountSettings/accountSettingsSelectors";
import { updateSettings } from "@/features/accountSettings/accountSettingsSlice";
import Switch from "@/components/ui/Switch";

export default function AccountPreferences() {
  const dispatch = useAppDispatch();

  const settings = useAppSelector(selectAccountSettings);

  return (
    <div className="rounded-3xl border border-gray-200 bg-white p-6">
      <h2 className="text-xl font-semibold">Preferences</h2>

      <div className="mt-6">
        <label className="flex items-center justify-between">
          <span>Dark Mode</span>

          <Switch
            checked={settings.darkMode}
            onChange={() =>
              dispatch(
                updateSettings({
                  darkMode: !settings.darkMode,
                }),
              )
            }
          />
        </label>
      </div>
    </div>
  );
}
