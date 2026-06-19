import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Address, AddressesState } from "./addressesTypes";
import { loadAddressesState } from "@/store/persistence";

const persistedAddresses = loadAddressesState();
const initialState: AddressesState = persistedAddresses || {
  addresses: [],
};

const addressesSlice = createSlice({
  name: "addresses",

  initialState,

  reducers: {
    addAddress: (state, action: PayloadAction<Address>) => {
      state.addresses.push(action.payload);
    },

    removeAddress: (state, action: PayloadAction<string>) => {
      const deletedAddress = state.addresses.find(
        (address) => address.id === action.payload,
      );

      state.addresses = state.addresses.filter(
        (address) => address.id !== action.payload,
      );

      if (deletedAddress?.isDefault && state.addresses.length > 0) {
        state.addresses[0].isDefault = true;
      }
    },

    setDefaultAddress: (state, action: PayloadAction<string>) => {
      state.addresses.forEach((address) => {
        address.isDefault = address.id === action.payload;
      });
    },
  },
});

export const { addAddress, removeAddress, setDefaultAddress } =
  addressesSlice.actions;

export default addressesSlice.reducer;
