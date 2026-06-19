import { RootState } from "@/store/store";

export const selectAddresses = (state: RootState) => state.addresses.addresses;
