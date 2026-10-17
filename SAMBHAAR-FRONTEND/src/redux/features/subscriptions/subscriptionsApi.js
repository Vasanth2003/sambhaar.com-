import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getBaseUrl } from "../../../util/baseURL";

const subscriptionApi = createApi({
  reducerPath: "subscriptionApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${getBaseUrl()}/api/subscriptions`,
    credentials: "include",
  }),
  tagTypes: ["Subscription"],
  endpoints: (builder) => ({
    // 🆕 Create COD subscription
    createSubscriptionCOD: builder.mutation({
      query: (data) => ({
        url: "/create-cod-subscription",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Subscription"],
    }),

    // 🆕 Create online checkout subscription
    createSubscriptionOnline: builder.mutation({
      query: (data) => ({
        url: "/create-checkout-session",
        method: "POST",
        body: data,
      }),
    }),

    // 🔍 Get all subscriptions
    getAllSubscriptions: builder.query({
      query: () => `/`,
      providesTags: ["Subscription"],
    }),

    // 🔍 Get subscription by ID
    getSubscriptionById: builder.query({
      query: (id) => `/${id}`,
      providesTags: (result, error, id) => [{ type: "Subscription", id }],
    }),

    // 🛠️ Update subscription
    updateSubscription: builder.mutation({
      query: ({ id, data }) => ({
        url: `/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Subscription", id }],
    }),

    // ❌ Delete subscription
    deleteSubscription: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [{ type: "Subscription", id }],
    }),
  }),
});

export const {
  useCreateSubscriptionCODMutation,
  useCreateSubscriptionOnlineMutation,
  useGetAllSubscriptionsQuery,
  useGetSubscriptionByIdQuery,
  useUpdateSubscriptionMutation,
  useDeleteSubscriptionMutation,
} = subscriptionApi;

export default subscriptionApi;
