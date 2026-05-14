// import { RootState } from "@/store/store";

// export const selectUser = (
//   state: RootState
// ) => state.auth.user;

// export const selectIsAuthenticated = (
//   state: RootState
// ) => state.auth.isAuthenticated;

import { RootState } from "@/store/store";

export const selectUser = (state: RootState) => state.auth.user;

export const selectIsAuthenticated = (state: RootState) =>
  state.auth.isAuthenticated;

export const selectAuthLoading = (state: RootState) => state.auth.isLoading;

export const selectAuthHydrated = (state: RootState) => state.auth.isHydrated;
