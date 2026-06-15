import { RootState } from "@/store/store";

export const selectAccountSettings = (state: RootState) =>
  state.accountSettings;
