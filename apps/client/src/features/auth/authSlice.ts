import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState, User } from "./authTypes";
import { loadAuthState } from "@/store/persistence";
import { toast } from "sonner";

const persistedAuth = loadAuthState();

const initialState: AuthState =
  persistedAuth || {
    user: null,
    isAuthenticated: false,
    isLoading: false,
    isHydrated: true,
    accessToken: null,
  };

const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {
    login: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      toast.success("Logged in successfully");
    },

    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      toast.success("Logged out successfully");
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;