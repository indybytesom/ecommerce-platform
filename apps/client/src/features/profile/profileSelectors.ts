import { RootState } from "@/store/store";

export const selectProfile = (state: RootState) => state.profile;

export const selectFullName = (state: RootState) =>
  `${state.profile.firstName} ${state.profile.lastName}`.trim();
