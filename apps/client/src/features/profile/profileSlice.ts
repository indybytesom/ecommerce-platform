import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProfileState } from "./profileTypes";
import { loadProfileState } from "@/store/persistence";

const persistedProfile = loadProfileState();

const initialState: ProfileState = persistedProfile || {
  firstName: "",
  lastName: "",
  phone: "",
  avatar: "",
};

const profileSlice = createSlice({
  name: "profile",

  initialState,

  reducers: {
    updateProfile: (
      state,
      action: PayloadAction<{
        firstName: string;
        lastName: string;
        phone: string;
        avatar?: string;
      }>,
    ) => {
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.phone = action.payload.phone;
      state.avatar = action.payload.avatar || "";
    },

    clearProfile: (state) => {
      state.firstName = "";
      state.lastName = "";
      state.phone = "";
      state.avatar = "";
    },
  },
});

export const { updateProfile, clearProfile } = profileSlice.actions;

export default profileSlice.reducer;
