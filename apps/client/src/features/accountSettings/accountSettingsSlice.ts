import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AccountSettingsState } from "./accountSettingsTypes";
import { loadAccountSettingsState } from "@/store/persistence";

const persistedSettings = loadAccountSettingsState();
const initialState: AccountSettingsState = persistedSettings || {
  emailNotifications: true,
  orderNotifications: true,
  marketingEmails: false,
  darkMode: false,
};

const accountSettingsSlice = createSlice({
  name: "accountSettings",

  initialState,

  reducers: {
    updateSettings: (
      state,
      action: PayloadAction<Partial<AccountSettingsState>>,
    ) => {
      Object.assign(state, action.payload);
    },

    resetSettings: () => initialState,
  },
});

export const { updateSettings, resetSettings } = accountSettingsSlice.actions;

export default accountSettingsSlice.reducer;
