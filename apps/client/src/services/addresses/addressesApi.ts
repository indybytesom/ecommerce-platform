import { baseApi } from "../api/baseApi";
import { Address } from "@/features/addresses/addressesTypes";

type CreateAddressRequest = Omit<Address, "id">;

export const addressesApi = baseApi.injectEndpoints({
  overrideExisting: false,

  endpoints: (builder) => ({
    getAddresses: builder.query<Address[], void>({
      query: () => "/addresses",
      providesTags: ["Addresses"],
    }),

    addAddress: builder.mutation<Address, CreateAddressRequest>({
      query: (body) => ({
        url: "/addresses",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Addresses"],
    }),

    updateAddress: builder.mutation<
      Address,
      { id: string; data: Partial<Address> }
    >({
      query: ({ id, data }) => ({
        url: `/addresses/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Addresses"],
    }),

    deleteAddress: builder.mutation<void, string>({
      query: (id) => ({
        url: `/addresses/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Addresses"],
    }),

    setDefaultAddress: builder.mutation<void, string>({
      query: (id) => ({
        url: `/addresses/${id}/default`,
        method: "PATCH",
      }),
      invalidatesTags: ["Addresses"],
    }),
  }),
});

export const {
  useGetAddressesQuery,
  useAddAddressMutation,
  useUpdateAddressMutation,
  useDeleteAddressMutation,
  useSetDefaultAddressMutation,
} = addressesApi;
