import { RootState } from "@/store/store";

export const selectUser = (
  state: RootState
) => state.auth.user;

export const selectIsAuthenticated = (
  state: RootState
) => state.auth.isAuthenticated;