import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getBaseUrl } from "../../../util/baseURL";

const authApi = createApi({
  reducerPath: "authApi",
  // baseQuery: fetchBaseQuery({
  //   baseUrl: `${getBaseUrl()}/api/auth`,
  //   credentials: "include",
  // }),
  baseQuery: fetchBaseQuery({
  baseUrl: `${getBaseUrl()}/api/auth`,
  credentials: "include",
  prepareHeaders: (headers) => {
    const token = localStorage.getItem("token");
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
}),
  tagTypes: ["users"],
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (newUser) => ({
        url: "/register",
        method: "POST",
        body: newUser,
      }),
    }),
    loginUser: builder.mutation({
      query: (credentials) => ({
        url: "/login",
        method: "POST",
        body: credentials,
      }),
    }),
    logoutUser: builder.mutation({
      query: () => ({
        url: "/logout",
        method: "POST",
      }),
    }),
    getMe: builder.query({
  query: () => ({
    url: "/me",
    method: "GET",
  }),
}),
    sendSmsOtp: builder.mutation({
      query:(number)=>({
        url:"/sendsms-otp",
        method: "POST",
        body:number
      })
    }),
    verifySmsOtp: builder.mutation({
      query:(credentials)=>({
        url:"/verifysms-otp",
        method: "POST",
        body:credentials
      })
    }),
    completeProfile: builder.mutation({
      query:()=>({
        url:"/sendsms-otp",
        method: "POST"
      })
    }),
  
    getUser: builder.query({
      query: () => ({
        url: "/users",
        method: "GET",
      }),
      refetchOnMount: true,
      provideTags: ["users"],
    }),
    deleteUser: builder.mutation({
      query: (userId) => ({
        url: `/users/${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),
    updateUserRole: builder.mutation({
      query: ({ userId, role }) => ({
        url: `/users/${userId}`,
        method: "PUT",
        body: { role },
      }),
      refetchOnMount: true,
      invalidatesTags: ["users"],
    }),
    editProfile: builder.mutation({
      query: (profileData) => ({
        url: "/edit-profile",
        method: "PATCH",
        body: profileData,
      }),
    }),
    verifyOtp: builder.mutation({
      query: ({ email, otp }) => ({
        url: "/verify-otp",
        method: "POST",
        body: { email, otp },
      }),
    }),
    resendOtp: builder.mutation({
      query: ({ email, otp }) => ({
        url: "/resend-otp",
        method: "POST",
        body: { email, otp },
      }),
    }),
    requestPasswordReset: builder.mutation({
      query: ({ email }) => ({
        url: "/request-password-reset",
        method: "POST",
        body: { email },
      }),
    }),
    resetPassword: builder.mutation({
      query: ({ token, newPassword }) => ({
        url: "/reset-password",
        method: "POST",
        body: { token, newPassword },
      }),
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useLogoutUserMutation,
  useGetUserQuery,
  useDeleteUserMutation,
  useUpdateUserRoleMutation,
   useSendSmsOtpMutation,
  useVerifySmsOtpMutation,
  useCompleteProfileMutation,
  useEditProfileMutation,
  useVerifyOtpMutation,
  useResendOtpMutation,
    useGetMeQuery,
  useRequestPasswordResetMutation, 
  useResetPasswordMutation, 
} = authApi;

export default authApi;
