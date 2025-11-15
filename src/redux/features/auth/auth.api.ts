import { baseApi } from "@/redux/base.api";
import type { IOtpVerify, IResponse, ISendOTP } from "@/types/auth.types";


const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (userInfo) => ({
        url: "/user/register",
        method: "POST",
        data: userInfo,
      }),
    }),

    login: builder.mutation({
      query: (loginInfo) => ({
        url: "/auth/login",
        method: "POST",
        data: loginInfo,
      }),
    }),

    otp: builder.mutation<IResponse<null>, ISendOTP>({
      query: (otpInfo) => ({
        url: "/otp/send",
        method: "POST",
        data: otpInfo,
      }),
    }),

    verifyOTP: builder.mutation<IResponse<null>, IOtpVerify>({
      query: (veriyInfo) => ({
        url: "/otp/verify",
        method: "POST",
        data: veriyInfo,
      }),
    }),


  }),
});

export const { 
  useRegisterMutation, 
  useLoginMutation, 
  useOtpMutation,
   useVerifyOTPMutation
} = authApi;