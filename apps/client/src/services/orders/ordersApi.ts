import { baseApi } from "../api/baseApi";
import { Order } from "@/features/orders/orderTypes";

export const ordersApi = baseApi.injectEndpoints({
  overrideExisting: false,

  endpoints: (builder) => ({
    getOrders: builder.query<Order[], void>({
      query: () => "/orders",
      providesTags: ["Orders"],
    }),

    getOrderById: builder.query<Order, string>({
      query: (orderId) => `/orders/${orderId}`,
      providesTags: ["Orders"],
    }),

    reorder: builder.mutation<void, string>({
      query: (orderId) => ({
        url: `/orders/${orderId}/reorder`,
        method: "POST",
      }),
      invalidatesTags: ["Orders"],
    }),

    cancelOrder: builder.mutation<void, string>({
      query: (orderId) => ({
        url: `/orders/${orderId}/cancel`,
        method: "POST",
      }),
      invalidatesTags: ["Orders"],
    }),
  }),
});

export const {
  useGetOrdersQuery,
  useGetOrderByIdQuery,
  useReorderMutation,
  useCancelOrderMutation,
} = ordersApi;
