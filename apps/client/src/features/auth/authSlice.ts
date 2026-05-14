import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState, User } from "./authTypes";
import {
  getUserFromStorage,
  removeUserFromStorage,
  saveUserToStorage,
} from "./authUtils";

const storedUser = typeof window !== "undefined" ? getUserFromStorage() : null;

const initialState: AuthState = {
  user: storedUser,
  isAuthenticated: !!storedUser,
  isLoading: false,
  isHydrated: true,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      saveUserToStorage(action.payload);
    },

    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      removeUserFromStorage();
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
